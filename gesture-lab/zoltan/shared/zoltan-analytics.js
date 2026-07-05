(function () {
  const storageKey = 'rubik-sota-zoltan-analytics';
  const events = [];

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(events.slice(-120)));
    } catch (err) {}
  }

  function track(eventName, payload) {
    const entry = {
      eventName,
      payload: window.ZoltanCore ? window.ZoltanCore.formatEventPayload(payload) : (payload || {}),
      timestamp: Date.now()
    };
    events.push(entry);
    persist();
    return entry;
  }

  function list() {
    return events.slice();
  }

  function clear() {
    events.length = 0;
    persist();
  }

  window.ZoltanAnalytics = { track, list, clear };
})();
