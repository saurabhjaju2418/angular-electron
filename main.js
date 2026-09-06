const { app, BrowserWindow, shell } = require('electron');
const path = require('node:path');

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 720,
    height: 760,
    minWidth: 420,
    minHeight: 640,
    backgroundColor: '#0b1020',
    icon: path.join(__dirname, 'dist/angular-electron/browser/assets/logo.png'),
    webPreferences: {contextIsolation: true, nodeIntegration: false, sandbox: true}
  });

  mainWindow.removeMenu();
  mainWindow.loadFile(path.join(__dirname, 'dist/angular-electron/browser/index.html'));
  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://')) void shell.openExternal(url);
    return {action: 'deny'};
  });
  mainWindow.webContents.on('will-navigate', (event) => event.preventDefault());
  mainWindow.on('closed', () => { mainWindow = undefined; });
}

app.whenReady().then(() => {
  createWindow();
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
