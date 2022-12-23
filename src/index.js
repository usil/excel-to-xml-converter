const { app, BrowserWindow, Menu, ipcMain } = require("electron");

const url = require("url");
const path = require("path");

let mainWindow;

if (process.env.NODE_ENV === "development") {
  require("electron-reload")(__dirname, {
    electron: path.join(__dirname, "../node_modules", ".bin", "electron"),
  });
}

app.on("ready", () => {
  // The Main Window
  mainWindow = new BrowserWindow({ width: 720, height: 600 });

  mainWindow.loadURL(
    url.format({
      pathname: path.join(__dirname, "views/index.html"),
      protocol: "file",
      slashes: true,
    })
  );
  // If we close main Window the App quit
  mainWindow.on("closed", () => {
    app.quit();
  });
});
