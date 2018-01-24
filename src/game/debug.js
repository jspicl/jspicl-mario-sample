let logHistory = [];
let renderQueue = [];

export function clearLog () {
  logHistory = [];
}

export function getLog () {
  return logHistory.join("\n");
}

export function log (string) {
  logHistory.push(string);
}

export function clearDebugRender () {
  renderQueue = [];
}

export function getDebugRender () {
  return renderQueue;
}

export function debugRender(callback) {
  renderQueue.push(callback);
}
