// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const {ipcRenderer, contextBridge} = require('electron');

contextBridge.exposeInMainWorld('backApi', {
  send: (channel, args) => ipcRenderer.send('submitForm', {}),
  on: (channel, handler) => ipcRenderer.on(channel, handler)
  // TODO: methods
});

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    window.backApi.send('submitForm', {})
  })
})

window.backApi.on('submitForm', (event, data) => {
  console.log(data);
});