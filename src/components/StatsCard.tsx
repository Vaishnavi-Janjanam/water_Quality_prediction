import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string;
  description: string;
  icon: LucideIcon;
  color?: string;
}

export const StatsCard = ({ title, value, description, icon: Icon, color = "text-primary" }: StatsCardProps) => {
  return (
    <Card className="water-card bg-white/90 backdrop-blur-sm">
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="text-3xl font-bold text-gradient">{value}</div>
            <p className="text-xs text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <Icon className={`h-12 w-12 ${color} opacity-80`} />
        </div>
      </CardContent>
    </Card>
  );
};