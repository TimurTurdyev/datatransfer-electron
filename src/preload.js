// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('api', {
  send: ipcRenderer.send,
  on: ipcRenderer.on,
  invoke: ipcRenderer.invoke
  // TODO: methods
});