import { useState } from "react";
import { WaterBackground } from "@/components/WaterBackground";
import { Header } from "@/components/Header";
import { PredictionForm, PredictionResult } from "@/components/PredictionForm";
import { ResultsDisplay } from "@/components/ResultsDisplay";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { 
  Activity, 
  Beaker, 
  Brain, 
  Database, 
  Droplets,
  TrendingUp,
  Shield,
  Zap
} from "lucide-react";

const Index = () => {
  const [predictionResult, setPredictionResult] = useState<PredictionResult | null>(null);

  const handlePrediction = (result: PredictionResult) => {
    setPredictionResult(result);
    // Smooth scroll to results
    setTimeout(() => {
      const resultsElement = document.getElementById('results-section');
      if (resultsElement) {
        resultsElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  return (
    <div className="min-h-screen relative">
      {/* Animated background */}
      <WaterBackground />
      
      {/* Main content */}
      <div className="relative z-10">
        {/* Header */}
        <Header />
        
        {/* Stats Cards */}
        <div className="container mx-auto px-4 mb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatsCard
              title="Model Accuracy"
              value="93.2%"
              description="XGBoost classification performance"
              icon={Brain}
              color="text-primary"
            />
            <StatsCard
              title="Parameters"
              value="7"
              description="Water quality indicators analyzed"
              icon={Beaker}
              color="text-accent"
            />
            <StatsCard
              title="Response Time"
              value="<2s"
              description="Real-time prediction speed"
              icon={Zap}
              color="text-primary"
            />
            <StatsCard
              title="Reliability"
              value="99.9%"
              description="System uptime and availability"
              icon={Shield}
              color="text-accent"
            />
          </div>
        </div>

        {/* Main prediction interface */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Left: Prediction Form */}
            <div>
              <PredictionForm onPrediction={handlePrediction} />
            </div>
            
            {/* Right: Model Info Card */}
            <Card className="water-card bg-white/95 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-2xl">
                  <Database className="h-6 w-6 text-primary" />
                  Model Information
                </CardTitle>
                <CardDescription>
                  Advanced XGBoost ensemble learning for water quality prediction
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Activity className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold">Real-time Analysis</h4>
                      <p className="text-sm text-muted-foreground">
                        Instant water quality assessment using 7 key parameters
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <TrendingUp className="h-5 w-5 text-primary mt-1" />
                    <div>
                      <h4 className="font-semibold">Dual Predictions</h4>
                      <p className="text-sm text-muted-foreground">
                        Both numerical WQI scores and categorical classifications
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3">
                    <Droplets className="h-5 w-5 text-accent mt-1" />
                    <div>
                      <h4 className="font-semibold">Comprehensive Coverage</h4>
                      <p className="text-sm text-muted-foreground">
                        Analyzes physical, chemical, and biological indicators
                      </p>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Parameter Weights</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Dissolved Oxygen</span>
                      <span className="font-medium">28%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>BOD</span>
                      <span className="font-medium">23%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Fecal Coliform</span>
                      <span className="font-medium">18%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>pH Level</span>
                      <span className="font-medium">12%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Nitrate</span>
                      <span className="font-medium">10%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Conductivity</span>
                      <span className="font-medium">9%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Results Section */}
          <div id="results-section">
            {predictionResult && (
              <ResultsDisplay 
                result={predictionResult} 
                isVisible={!!predictionResult} 
              />
            )}
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-10 bg-white/80 backdrop-blur-sm border-t border-primary/10 mt-20">
          <div className="container mx-auto px-4 py-8">
            <div className="text-center space-y-4">
              <div className="flex items-center justify-center gap-2">
                <Droplets className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">AquaPredict AI</span>
              </div>
              <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                Powered by advanced machine learning algorithms to ensure reliable water quality management. 
                Built with XGBoost for accurate predictions and comprehensive water safety analysis.
              </p>
              <div className="text-xs text-muted-foreground">
                © 2024 AquaPredict AI - Advanced Water Quality Forecasting System
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
