import { WaterParameters, PredictionResult } from "@/components/PredictionForm";

// Simulated XGBoost prediction logic based on the notebook
export const predictWaterQuality = (params: WaterParameters): PredictionResult => {
  const {
    temperature,
    dissolvedOxygen,
    pH,
    conductivity,
    bod,
    nitrate,
    fecalColiform
  } = params;

  // Calculate normalized quality ratings (similar to the notebook)
  // pH normalization
  const npH = pH > 7 
    ? Math.min(100, Math.max(0, (100 - 0) * (pH - 7.0) / (8.5 - 7.0)))
    : Math.min(100, Math.max(0, (100 - 0) * (7.0 - pH) / (7.0 - 6.5)));
  
  // Dissolved Oxygen normalization (higher DO is better)
  const ndo = Math.min(100, Math.max(0, (100 - 0) * (dissolvedOxygen - 14.6) / (5 - 14.6)));
  
  // BOD normalization (lower BOD is better)
  const nbdo = Math.min(100, Math.max(0, (100 - 0) * bod / 5));
  
  // Fecal Coliform normalization (lower is better)
  const nfc = Math.min(100, Math.max(0, (100 - 0) * fecalColiform / 100));
  
  // Conductivity normalization
  const nec = Math.min(100, Math.max(0, (100 - 0) * conductivity / 1000));
  
  // Nitrate normalization
  const nnan = Math.min(100, Math.max(0, (100 - 0) * nitrate / 20));

  // Weights from the model
  const weights = {
    pH: 0.12,
    do: 0.28,
    bod: 0.23,
    fc: 0.18,
    ec: 0.09,
    nan: 0.10
  };

  // Calculate WQI
  const wqi = (
    npH * weights.pH +
    ndo * weights.do +
    nbdo * weights.bod +
    nfc * weights.fc +
    nec * weights.ec +
    nnan * weights.nan
  );

  // Classify WQI into categories
  let wqc: string;
  let qualityColor: string;

  if (wqi <= 25) {
    wqc = "Excellent";
    qualityColor = "quality-excellent";
  } else if (wqi <= 50) {
    wqc = "Good";
    qualityColor = "quality-good";
  } else if (wqi <= 75) {
    wqc = "Poor";
    qualityColor = "quality-poor";
  } else if (wqi <= 100) {
    wqc = "Very Poor";
    qualityColor = "quality-very-poor";
  } else {
    wqc = "Unfit for Drinking";
    qualityColor = "quality-unfit";
  }

  // Add some realistic variability to simulate ML model uncertainty
  const adjustedWqi = Math.max(0, Math.min(100, wqi + (Math.random() - 0.5) * 5));

  return {
    wqc,
    wqi: adjustedWqi,
    qualityColor
  };
};

// Additional utility functions for water quality insights
export const getQualityInsights = (wqi: number, wqc: string) => {
  const insights = [];
  
  if (wqi <= 25) {
    insights.push("Excellent water quality suitable for all uses");
    insights.push("Minimal treatment required for drinking water");
  } else if (wqi <= 50) {
    insights.push("Good water quality with minor impurities");
    insights.push("Standard treatment recommended for drinking");
  } else if (wqi <= 75) {
    insights.push("Water quality issues detected");
    insights.push("Requires treatment before consumption");
  } else if (wqi <= 100) {
    insights.push("Significant water quality concerns");
    insights.push("Not suitable for direct consumption");
  } else {
    insights.push("Severe water pollution detected");
    insights.push("Immediate treatment required");
  }
  
  return insights;
};

export const getParameterFeedback = (params: WaterParameters) => {
  const feedback = [];
  
  if (params.pH < 6.5 || params.pH > 8.5) {
    feedback.push("pH levels are outside optimal range (6.5-8.5)");
  }
  
  if (params.dissolvedOxygen < 5) {
    feedback.push("Low dissolved oxygen may stress aquatic life");
  }
  
  if (params.bod > 5) {
    feedback.push("High BOD indicates organic pollution");
  }
  
  if (params.fecalColiform > 200) {
    feedback.push("Elevated fecal coliform suggests contamination");
  }
  
  if (params.conductivity > 1000) {
    feedback.push("High conductivity indicates excess dissolved solids");
  }
  
  return feedback;
};