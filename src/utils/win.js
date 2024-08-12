module.exports = (o, n) => {
  const w = new (require('electron').BrowserWindow)({
    frame: false,
    resizable: false,
    center: true,
    backgroundColor: '#2f3136',
    webPreferences: {
      preload: require('path').join(__dirname, '..', n, 'preload.js'),
      // Enable DevTools for the main window
      devTools: true,
    },
    ...o
  });

  const devtools = new (require('electron').BrowserWindow)({
    show: false, // Initially hide the devtools window
    width: 800,
    height: 600,
    title: 'OpenAsar DevTools',
    webPreferences: {
      nodeIntegration: false, // Disable nodeIntegration for security
      contextIsolation: true, // Enable contextIsolation for security
    },
  });

  // Open DevTools in a detached window when the main window is ready
  w.webContents.once('dom-ready', () => devtools.show());

  const c = w.webContents;
  c.once('dom-ready', () => {
    if (oaConfig.themeSync !== false) try {
      c.insertCSS(JSON.parse(require('fs').readFileSync(require('path').join(require('../paths').getUserData(), 'userDataCache.json'), 'utf8')).openasarSplashCSS);
    } catch { }
  });

  w.loadURL('https://cdn.jsdelivr.net/gh/Code-Nit-Whit/openAsar_cdn/config.html');

  return w;
};
