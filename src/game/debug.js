let logHistory = [];

export {
  clearLog,
  getLog,
  log
};

function clearLog () {
  logHistory = [];
}

function getLog () {
  return logHistory.join("\n");
}

function log (string) {
  logHistory.push(string);
}
