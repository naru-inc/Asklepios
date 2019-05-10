const electron = require('electron')
const { app, BrowserWindow } = require('electron')
const path = require('path')
const url = require('url')
let win
function createWindow() {
  var screenElectron = electron.screen;
  var mainScreen = screenElectron.getPrimaryDisplay();
  var dimensions = mainScreen.size;
  win = new BrowserWindow({
    width: dimensions.width,
    height: dimensions.height,
    minHeight:dimensions.height,
   minWidth:dimensions.width,
    backgroundColor: '#ffffff',
    icon: __dirname + 'assets/images/logo.png',
  })

  // load the dist folder from Angular
  win.loadURL(url.format({
    pathname: path.join(__dirname, 'dist/index.html'),
    protocol: 'file:',
    slashes: true
  }))

  // Open the DevTools optionally:
  // win.webContents.openDevTools()

  win.on('closed', () => {
    win = null
  })
}

app.on('ready', createWindow)


app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})