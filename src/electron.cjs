const windowStateManager = require('electron-window-state');
const {app, BrowserWindow} = require('electron');
const {join} = require('path');
const contextMenu = require('electron-context-menu');
const serve = require('electron-serve');

// Trying to use electron-reloader
try {
    require('electron-reloader')(module);
} catch (e) {
    console.error(e.message, '\n', e.stack);
}

// Configure serve dep
const serveURL = serve({directory: '.'});
const port = process.env.PORT || 3000;
const dev = !app.isPackaged;

// Main window holder and initialize function
let mainWindow;
function createWindow() {
    const mainWindowState = windowStateManager({
        defaultWidth: 1280,
        defaultHeight: 720
    });

    // Creating window
    mainWindow = new BrowserWindow({
        backgroundColor: 'whitesmoke',
        autoHideMenuBar: true,
        minWidth: 900,
        minHeight: 700,
        icon: join(__dirname, 'static', 'icon.ico'),
        webPreferences: {
            preload: join(__dirname, 'preload.сjs'),
            enableRemoteModule: true,
            contextIsolation: true,
            nodeIntegration: true,
            spellcheck: false,
            devTools: dev,
            nativeWindowOpen: true
        },
        x: mainWindowState.x,
        y: mainWindowState.y,
        width: mainWindowState.width,
        height: mainWindowState.height
    });

    // Setting up window manager and event "ready-to-show"
    mainWindowState.manage(mainWindow);
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
        mainWindow.focus();
    });

    // Setting up window close event
    mainWindow.on('close', () => {
        mainWindowState.saveState(mainWindow);
        mainWindow = null;
    });

    if(dev) loadVite(port);
    else serveURL(mainWindow);
}

// Setting up the context menu
contextMenu({
    showLookUpSelection: false,
    showSearchWithGoogle: false,
    showCopyImage: false,
    showInspectElement: !app.isPackaged,
    prepend: (defActions, params, browserMenu) => [
        {
            label: 'Hello, World! 🙌'
        }
    ]
});

// Connect to Vite bundler
function loadVite(port) {
    mainWindow.loadURL(`http://localhost:${port}`).catch(e => {
        console.log(`Error loading URL, retrying...`, e);
        setTimeout(() => {
            loadVite(port);
        }, 1000);
    });
}

// App events
// > first - create window on app ready;
// > second - if app is active but window is not created, create it
// > third - if all windows is closed and platform is not Windows, exit from the app
app.once('ready', createWindow);
app.on('activate', () => !mainWindow ? createWindow() : null);
app.on('window-all-closed', () => process.platform !== 'darwin' ? app.quit() : null);