// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.

const ipcRenderer = require('electron').ipcRenderer;

window.addEventListener('DOMContentLoaded', () => {
  document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()

    ipcRenderer.send('submitForm', {})
  })
})

ipcRenderer.on('message', (event, data) => {
  console.log(data)
})

