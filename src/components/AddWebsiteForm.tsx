import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface AddWebsiteFormProps {
  onAdd: (url: string) => void;
}

export const AddWebsiteForm = ({ onAdd }: AddWebsiteFormProps) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!url.trim()) {
      return;
    }

    // Basic URL validation
    const urlPattern = /^[a-zA-Z0-9-_.]+\.[a-zA-Z]{2,}$/;
    if (!urlPattern.test(url.trim())) {
      return;
    }

    onAdd(url.trim());
    setUrl("");
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2">
      <Input
        type="text"
        placeholder="e.g., youtube.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="flex-1"
      />
      <Button type="submit" size="icon" className="shrink-0">
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
};
