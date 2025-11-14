import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Pause, Play, Settings } from "lucide-react";
import { BlockingStatus } from "./components/BlockingStatus";
import { BlockedSitesList } from "./components/BlockedSitesList";
import { AddWebsiteForm } from "./components/AddWebsiteForm";
import { Separator } from "@radix-ui/react-separator";
import { TimerControl } from "./components/TimerControl";
import { v4 as uuidv4 } from 'uuid';

interface BlockedSite {
  id: string;
  url: string;
}

function App() {
  const [sites, setSites] = useState<BlockedSite[]>([]);
  const [isBlocking, setIsBlocking] = useState(false);
  const [duration, setDuration] = useState(30);
  const [remainingTime, setRemainingTime] = useState<number | undefined>();
  const [error, setError] = useState("");

  useEffect(() => {
    if (isBlocking && remainingTime !== undefined && remainingTime > 0) {
      const interval = setInterval(() => {
        setRemainingTime((prev) => {
          if (prev === undefined || prev <= 1) {
            setIsBlocking(false);
            return undefined;
          }
          return prev - 1;
        });
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [isBlocking, remainingTime]);

  useEffect(() => {
    chrome?.storage?.local.get('blocklist').then(({ blocklist }) => {
      if (blocklist) setSites(blocklist);
    })
  }, [])

  const addSite = async (input: string) => {
    const uniqueId = uuidv4();
    const existingSite = sites.find(site => site.url.includes(input));
    if (!existingSite) {
      const updated = [...sites, { id: uniqueId, url: input }];
      await chrome?.storage?.local.set({ blockList: updated });
      setSites(updated);
      chrome.runtime.sendMessage({ action: 'updateRules', sites: updated });
    } else setError("Website URL already exist");
  };

  const removeSite = async (siteToRemove: string) => {
    const updated = sites.filter(site => site.id !== siteToRemove);
    await chrome?.storage?.local.set({ blockList: updated });
    setSites(updated);
    chrome.runtime.sendMessage({ action: 'updateRules', sites: updated });
  };

  const handleToggleBlocking = () => {
    if (!isBlocking) {
      if (sites.length === 0) {
        return;
      }
      setRemainingTime(duration);
      setIsBlocking(true);
    } else {
      setIsBlocking(false);
      setRemainingTime(undefined);
    }
  };

  return (
    <Card className="w-full max-w-md shadow-lg">
      <CardHeader className="space-y-1">
        <div className="flex items-center justify-between">
          <CardTitle className="text-2xl font-bold">Focus Guard</CardTitle>
        </div>
        <CardDescription>
          Block distracting websites and stay focused
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <BlockingStatus
          isActive={isBlocking}
          remainingTime={remainingTime}
          blockedCount={sites.length}
        />
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-semibold mb-2">Blocked Websites</h3>
            <BlockedSitesList sites={sites} onRemove={removeSite} />
          </div>
          <AddWebsiteForm onAdd={addSite} onChange={() => setError("")} />
          {error && <p className="text-center text-red-500 text-sm">{error}</p>}
        </div>
        <Separator />
        <TimerControl
          selectedDuration={duration}
          onDurationChange={setDuration}
        />
        <Button
          onClick={handleToggleBlocking}
          className="w-full h-12 text-base font-semibold"
          size="lg"
        >
          {isBlocking ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              Pause Blocking
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              Start Blocking
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  );
}

export default App
