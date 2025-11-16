import { X } from "lucide-react";
import { Button } from "./ui/button";
import { ScrollArea } from "./ui/scroll-area";

interface BlockedSite {
  id: string;
  url: string;
}

interface BlockedSitesListProps {
  sites: BlockedSite[];
  onRemove: (id: string) => void;
  isActive: boolean;
}

export const BlockedSitesList = ({ sites, onRemove, isActive }: BlockedSitesListProps) => {
  if (sites.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        <p className="text-sm">No blocked sites yet</p>
        <p className="text-xs mt-1">Add websites to start blocking distractions</p>
      </div>
    );
  }

  return (
    <ScrollArea className="h-[200px] w-full pr-4">
      <div className="space-y-2">
        {sites.map((site) => (
          <div
            key={site.id}
            className="flex items-center justify-between p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors group"
          >
            <span className="text-sm font-medium truncate flex-1">{site.url}</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onRemove(site.id)}
              className="h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
              disabled={isActive}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};