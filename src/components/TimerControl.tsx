import { Button } from "./ui/button";
import { cn } from "@/lib/utils";

interface TimerControlProps {
  selectedDuration: number;
  onDurationChange: (duration: number) => void;
}

const DURATION_OPTIONS = [
  { label: "15 mins", value: 15 },
  { label: "30 mins", value: 30 },
  { label: "1 hour", value: 60 },
  { label: "2 hours", value: 120 },
];

export const TimerControl = ({ selectedDuration, onDurationChange }: TimerControlProps) => {
  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">Block Duration</label>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {DURATION_OPTIONS.map((option) => (
          <Button
            key={option.value}
            variant={selectedDuration === option.value ? "default" : "outline"}
            onClick={() => onDurationChange(option.value)}
            className={cn(
              "transition-all",
              selectedDuration === option.value && "ring-2 ring-primary ring-offset-2"
            )}
          >
            {option.label}
          </Button>
        ))}
      </div>
    </div>
  );
};
