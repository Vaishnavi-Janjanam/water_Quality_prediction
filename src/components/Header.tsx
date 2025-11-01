import { Waves, Brain, Droplets, BarChart3 } from "lucide-react";

export const Header = () => {
  return (
    <header className="relative z-10 w-full py-8">
      <div className="container mx-auto px-4">
        <div className="text-center space-y-6">
          {/* Logo and Title */}
          <div className="flex items-center justify-center gap-4">
            <div className="relative">
              <Waves className="h-12 w-12 text-primary" />
              <Droplets className="absolute -top-1 -right-1 h-6 w-6 text-accent" />
            </div>
            <h1 className="text-5xl md:text-6xl font-bold text-gradient">
              AquaPredict AI
            </h1>
            <div className="relative">
              <Brain className="h-12 w-12 text-accent" />
              <BarChart3 className="absolute -top-1 -right-1 h-6 w-6 text-primary" />
            </div>
          </div>
          
          {/* Subtitle */}
          <div className="space-y-3">
            <h2 className="text-2xl md:text-3xl font-semibold text-foreground/90">
              AI-Driven Water Quality Forecasting System
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Advanced machine learning powered by <strong>XGBoost</strong> to predict Water Quality Index (WQI) 
              and Classification (WQC) for reliable water management and safety assessment.
            </p>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap items-center justify-center gap-3 mt-8">
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-sm">
              <span className="text-sm font-medium text-primary">XGBoost ML Model</span>
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-accent/20 shadow-sm">
              <span className="text-sm font-medium text-accent">Real-time Analysis</span>
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-primary/20 shadow-sm">
              <span className="text-sm font-medium text-primary">93% Accuracy</span>
            </div>
            <div className="px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full border border-accent/20 shadow-sm">
              <span className="text-sm font-medium text-accent">Comprehensive Insights</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};