import { Shield, ShieldOff, Clock } from "lucide-react";
import { Card } from "./ui/card";
import { cn } from "@/lib/utils";

interface BlockingStatusProps {
  isActive: boolean;
  remainingTime?: number;
  blockedCount: number;
}

export const BlockingStatus = ({ isActive, remainingTime, blockedCount }: BlockingStatusProps) => {
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  return (
    <Card className={cn(
      "p-4 transition-all",
      isActive ? "bg-green-600/10 border-green-600" : "bg-muted/50"
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "p-2 rounded-full",
          isActive ? "bg-green-600 text-success-foreground" : "bg-muted text-muted-foreground"
        )}>
          {isActive ? <Shield className="h-5 w-5 text-white" /> : <ShieldOff className="h-5 w-5" />}
        </div>
        <div className="flex-1">
          <p className="font-semibold text-sm">
            {isActive ? "Blocking Active" : "Blocking Inactive"}
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
            {isActive && remainingTime !== undefined && (
              <>
                <Clock className="h-3 w-3" />
                <span>{formatTime(remainingTime)} remaining</span>
              </>
            )}
            {!isActive && blockedCount > 0 && (
              <span>{blockedCount} sites ready to block</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
};