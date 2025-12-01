interface BlockedSite {
  id: string;
  url: string;
}

chrome.runtime.onInstalled.addListener(async () => {
  const { blocklist = [] } = await chrome.storage.local.get("blocklist");
  updateBlockingRules(blocklist);
});

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "blockingTimer") {
    chrome.storage.local.set({
      isBlocking: false,
      blockingEndsAt: null,
    });

    chrome.declarativeNetRequest.getDynamicRules().then((rules) => {
      const ids = rules.map((r) => r.id);
      if (ids.length > 0) {
        chrome.declarativeNetRequest.updateDynamicRules({
          removeRuleIds: ids,
          addRules: []
        });
      }
    });
  }
});

chrome.runtime.onMessage.addListener((message, _, sendResponse) => {
  if (message.action === "updateRules") {
    updateBlockingRules(message.sites || []);
  }

  if (message.action === "clearRules") {
    chrome.declarativeNetRequest.getDynamicRules().then((rules) => {
      const ids = rules.map((r) => r.id);
      chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ids,
        addRules: [],
      });
    });
  }

  sendResponse();
});

async function updateBlockingRules(sites: BlockedSite[]) {
  const oldRules = await chrome.declarativeNetRequest.getDynamicRules();
  const ruleIds = oldRules.map((r) => r.id);

  const rules: chrome.declarativeNetRequest.Rule[] = sites.map((site, i) => ({
    id: i + 1,
    priority: 1,
    action: { type: "block" },
    condition: {
      urlFilter: `||${site.url}/*`,
      resourceTypes: ["main_frame"],
    },
  }));

  await chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ruleIds,
    addRules: rules,
  });
}
