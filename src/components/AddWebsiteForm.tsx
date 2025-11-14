import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { validateAndGetHostname } from "@/lib/constants";

interface AddWebsiteFormProps {
  onAdd: (url: string) => void;
  onChange: () => void;
}

export const AddWebsiteForm = ({ onAdd, onChange }: AddWebsiteFormProps) => {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!url.trim()) {
      return;
    }
    const valid = validateAndGetHostname(url);
    if (valid)
      onAdd(valid);
    else
      setError("Please enter a valid domain");
    setUrl("");
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <Input
          type="text"
          placeholder="e.g., youtube.com"
          value={url}
          onChange={(e) => {
            setUrl(e.target.value)
            setError("")
            onChange();
          }}
          className="flex-1"
        />
        <Button type="submit" size="icon" className="shrink-0">
          <Plus className="h-4 w-4" />
        </Button>
      </form>
      {error && <p className="text-center text-red-500 text-sm">{error}</p>}
    </>
  );
};
