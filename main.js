const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
  
const path = require('path');
const url = require('url');
const fs = require('fs');
const markdown = require('markdown').markdown;
const Menu = electron.Menu;
  
let mainWindow;
let filename = process.argv[2] || "README.md";

Menu.setApplicationMenu(Menu.buildFromTemplate([]));
  
function createWindow () {
  mainWindow = new BrowserWindow({width: 800, height: 600});

  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));
  //mainWindow.webContents.openDevTools();
  mainWindow.on('closed', function () {
    mainWindow = null;
  });
}
  
app.on('ready', createWindow);
  
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow();
  }
});

module.exports = {
	filename: filename,
	loadFile: function(filename, callback){
		fs.readFile(filename, "utf-8", function(err, data) {
			if (err) callback(null);
			else {
				callback(markdown.toHTML(data));	
			}
		});
	}
};
