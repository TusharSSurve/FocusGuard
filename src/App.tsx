import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Button } from "./components/ui/button";
import { Pause, Play, Settings } from "lucide-react";
import { BlockingStatus } from "./components/BlockingStatus";
import { BlockedSitesList } from "./components/BlockedSitesList";
import { AddWebsiteForm } from "./components/AddWebsiteForm";
import { Separator } from "@radix-ui/react-separator";
import { TimerControl } from "./components/TimerControl";

interface BlockedSite {
  id: string;
  url: string;
}

function App() {
  const [sites, setSites] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [blockedSites, setBlockedSites] = useState<BlockedSite[]>([
    { id: "1", url: "youtube.com" },
    { id: "2", url: "facebook.com" },
    { id: "3", url: "twitter.com" },
  ]);
  const [isBlocking, setIsBlocking] = useState(false);
  const [duration, setDuration] = useState(30);
  const [remainingTime, setRemainingTime] = useState<number | undefined>();

  useEffect(() => {
    chrome?.storage?.local.get('blocklist').then(({ blocklist }) => {
      if (blocklist) setSites(blocklist);
    })
  }, [])

  const addSite = async () => {
    const updated = [...sites, input];
    await chrome?.storage?.local.set({ blockList: updated });
    setSites(updated);
    setInput('');
    chrome.runtime.sendMessage({ action: 'updateRules', sites: updated });
  };

  const removeSite = async (siteToRemove: string) => {
    const updated = sites.filter(site => site !== siteToRemove);
    await chrome?.storage?.local.set({ blockList: updated });
    setSites(updated);
    chrome.runtime.sendMessage({ action: 'updateRules', sites: updated });
  };

  return (
    <div>
      <h2>Blocklist</h2>
      <input value={input} onChange={(e) => setInput(e.target.value)} />
      <button onClick={addSite}>Add</button>
      <ul>
        {sites.map(site => (
          <li key={site}>
            {site}
            <button onClick={() => removeSite(site)}>Remove</button>
          </li>
        ))}
      </ul>
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl font-bold">Focus Guard</CardTitle>
            <Button variant="ghost" size="icon">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
          <CardDescription>
            Block distracting websites and stay focused
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <BlockingStatus
            isActive={isBlocking}
            remainingTime={remainingTime}
            blockedCount={blockedSites.length}
          />
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold mb-3">Blocked Websites</h3>
              <BlockedSitesList sites={blockedSites} onRemove={() => { }} />
            </div>

            <AddWebsiteForm onAdd={() => { }} />
          </div>
          <Separator />
          <TimerControl
            selectedDuration={duration}
            onDurationChange={setDuration}
          />
          <Button
            onClick={() => { }}
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

          <p className="text-xs text-center text-muted-foreground">
            This is a demo interface. Integrate with Chrome Extension API for full functionality.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default App
