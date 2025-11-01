import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { PredictionResult } from "./PredictionForm";
import { AlertCircle, CheckCircle, XCircle, AlertTriangle, Skull } from "lucide-react";
import { getQualityInsights } from "@/lib/prediction";

interface ResultsDisplayProps {
  result: PredictionResult;
  isVisible: boolean;
}

export const ResultsDisplay = ({ result, isVisible }: ResultsDisplayProps) => {
  if (!isVisible) return null;

  const insights = getQualityInsights(result.wqi, result.wqc);

  const getQualityIcon = (wqc: string) => {
    switch (wqc) {
      case "Excellent":
        return <CheckCircle className="h-8 w-8 text-green-600" />;
      case "Good":
        return <CheckCircle className="h-8 w-8 text-green-500" />;
      case "Poor":
        return <AlertTriangle className="h-8 w-8 text-yellow-500" />;
      case "Very Poor":
        return <AlertCircle className="h-8 w-8 text-orange-500" />;
      case "Unfit for Drinking":
        return <Skull className="h-8 w-8 text-red-500" />;
      default:
        return <XCircle className="h-8 w-8 text-gray-500" />;
    }
  };

  const getProgressColor = (wqi: number) => {
    if (wqi <= 25) return "bg-green-500";
    if (wqi <= 50) return "bg-green-400";
    if (wqi <= 75) return "bg-yellow-500";
    if (wqi <= 100) return "bg-orange-500";
    return "bg-red-500";
  };

  return (
    <div className="space-y-6">
      {/* Main Results Card */}
      <Card className="water-card bg-white/95 backdrop-blur-sm overflow-hidden">
        <CardHeader className="text-center bg-gradient-to-r from-primary/5 to-accent/5">
          <div className="flex items-center justify-center gap-3 mb-2">
            {getQualityIcon(result.wqc)}
            <CardTitle className="text-3xl text-gradient">
              Water Quality Analysis
            </CardTitle>
          </div>
          <CardDescription>
            AI-powered prediction results based on XGBoost model
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6 p-8">
          {/* WQC Classification */}
          <div className="text-center space-y-4">
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Water Quality Classification
              </p>
              <Badge 
                variant="secondary" 
                className={`${result.qualityColor} text-xl px-6 py-2 font-bold shadow-lg`}
              >
                {result.wqc}
              </Badge>
            </div>
            
            {/* WQI Score */}
            <div className="space-y-2">
              <p className="text-sm font-medium text-muted-foreground">
                Water Quality Index (WQI)
              </p>
              <div className="text-4xl font-bold text-gradient">
                {result.wqi.toFixed(1)}
              </div>
              <div className="w-full max-w-md mx-auto">
                <Progress 
                  value={Math.min(result.wqi, 100)} 
                  className="h-3"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>0 (Best)</span>
                  <span>100+ (Worst)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quality Scale */}
          <div className="bg-muted/50 rounded-lg p-4">
            <h4 className="font-semibold mb-3 text-center">Quality Scale Reference</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  Excellent
                </span>
                <span className="text-muted-foreground">0-25</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-400"></div>
                  Good
                </span>
                <span className="text-muted-foreground">26-50</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  Poor
                </span>
                <span className="text-muted-foreground">51-75</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                  Very Poor
                </span>
                <span className="text-muted-foreground">76-100</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  Unfit
                </span>
                <span className="text-muted-foreground">100+</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Insights Card */}
      <Card className="water-card bg-white/95 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <AlertCircle className="h-5 w-5 text-accent" />
            Quality Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.map((insight, index) => (
              <div key={index} className="flex items-start gap-3 p-3 rounded-lg bg-muted/50">
                <div className="w-2 h-2 rounded-full bg-accent mt-2 flex-shrink-0"></div>
                <p className="text-sm leading-relaxed">{insight}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};