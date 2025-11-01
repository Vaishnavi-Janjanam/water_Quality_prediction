import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Info, Droplets, FlaskConical } from "lucide-react";
import { predictWaterQuality } from "@/lib/prediction";
import { toast } from "sonner";

export interface WaterParameters {
  temperature: number;
  dissolvedOxygen: number;
  pH: number;
  conductivity: number;
  bod: number;
  nitrate: number;
  fecalColiform: number;
}

export interface PredictionResult {
  wqc: string;
  wqi: number;
  qualityColor: string;
}

interface PredictionFormProps {
  onPrediction: (result: PredictionResult) => void;
}

const parameterInfo = {
  temperature: "Water temperature affects dissolved oxygen levels and biological activity (°C)",
  dissolvedOxygen: "Amount of oxygen dissolved in water, critical for aquatic life (mg/L)",
  pH: "Measure of water acidity/alkalinity. Optimal range: 6.5-8.5",
  conductivity: "Indicates dissolved salts and minerals in water (µS/cm)",
  bod: "Biochemical Oxygen Demand - organic pollution indicator (mg/L)",
  nitrate: "Nitrogen compounds from fertilizers and waste (mg/L)",
  fecalColiform: "Bacterial indicator of sewage contamination (MPN/100mL)"
};

export const PredictionForm = ({ onPrediction }: PredictionFormProps) => {
  const [parameters, setParameters] = useState<WaterParameters>({
    temperature: 25,
    dissolvedOxygen: 7,
    pH: 7.2,
    conductivity: 250,
    bod: 3,
    nitrate: 5,
    fecalColiform: 100
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof WaterParameters, value: string) => {
    const numValue = parseFloat(value) || 0;
    setParameters(prev => ({
      ...prev,
      [field]: numValue
    }));
  };

  const handlePredict = async () => {
    try {
      setIsLoading(true);
      
      // Validate inputs
      const requiredFields = Object.values(parameters);
      if (requiredFields.some(val => val <= 0)) {
        toast.error("Please enter valid values for all parameters");
        return;
      }

      // Simulate API delay for realism
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const result = predictWaterQuality(parameters);
      onPrediction(result);
      
      toast.success(`Prediction complete! Water quality: ${result.wqc}`);
    } catch (error) {
      toast.error("Prediction failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const inputFields = [
    { key: 'temperature', label: 'Temperature', unit: '°C' },
    { key: 'dissolvedOxygen', label: 'Dissolved Oxygen', unit: 'mg/L' },
    { key: 'pH', label: 'pH Level', unit: '' },
    { key: 'conductivity', label: 'Conductivity', unit: 'µS/cm' },
    { key: 'bod', label: 'BOD', unit: 'mg/L' },
    { key: 'nitrate', label: 'Nitrate', unit: 'mg/L' },
    { key: 'fecalColiform', label: 'Fecal Coliform', unit: 'MPN/100mL' }
  ];

  return (
    <Card className="water-card bg-white/95 backdrop-blur-sm">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Droplets className="h-6 w-6 text-primary" />
          <CardTitle className="text-2xl text-gradient">Water Quality Parameters</CardTitle>
          <FlaskConical className="h-6 w-6 text-accent" />
        </div>
        <CardDescription className="text-muted-foreground">
          Enter the water quality measurements for AI-powered analysis
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {inputFields.map(({ key, label, unit }) => (
            <div key={key} className="space-y-2">
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Label 
                      htmlFor={key} 
                      className="flex items-center gap-2 text-sm font-medium cursor-help"
                    >
                      {label} {unit && `(${unit})`}
                      <Info className="h-3 w-3 text-muted-foreground" />
                    </Label>
                  </TooltipTrigger>
                  <TooltipContent className="max-w-xs">
                    <p>{parameterInfo[key as keyof typeof parameterInfo]}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              
              <Input
                id={key}
                type="number"
                step="0.01"
                value={parameters[key as keyof WaterParameters]}
                onChange={(e) => handleInputChange(key as keyof WaterParameters, e.target.value)}
                className="param-input"
                placeholder={`Enter ${label.toLowerCase()}`}
              />
            </div>
          ))}
        </div>

        <Button 
          onClick={handlePredict}
          disabled={isLoading}
          className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-primary to-primary-light hover:from-primary-dark hover:to-primary transition-all duration-300"
        >
          {isLoading ? (
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Analyzing Water Quality...
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <FlaskConical className="h-5 w-5" />
              Predict Water Quality
            </div>
          )}
        </Button>
      </CardContent>
    </Card>
  );
};