module.exports = (o, n) => {
  //For config window only
  const htmlContent = `
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://www.jsdelivr.net/gh/Code-Nit-Whit/openAsar_cdn/styles.css"/>
        <script src="https://www.jsdelivr.net/gh/Code-Nit-Whit/openAsar_cdn/oaPlus.js"></script>
        <title>OpenAsarPlus Config</title>
      </head>
      <body></body>
    </html>
    `;

  const w = new (require("electron").BrowserWindow)({
    frame: false,
    resizable: false,
    center: true,
    backgroundColor: "#2f3136",
    webPreferences: {
      preload: require("path").join(__dirname, "..", n, "preload.js"),
      devTools: true,
    },
    ...o,
  });

  const c = w.webContents;

  c.once("dom-ready", () => {
    if (n === "config") {
     try {
       c.executeJavascript(`
       document.write(\`${htmlContent}\`);
     `);
     } catch (error) {
      
     }
      c.openDevTools({ mode: "detach" });
    }
    if (oaConfig.themeSync !== false) {
      try {
        c.insertCSS(
          JSON.parse(
            require("fs").readFileSync(
              require("path").join(
                require("../paths").getUserData(),
                "userDataCache.json"
              ),
              "utf8"
            )
          ).openasarSplashCSS
        );
      } catch {}
    }
  });

  if (n === "splash") {
    w.loadURL(
      //"https://cdn.jsdelivr.net/gh/Code-Nit-Whit/openAsar_cdn/config.html"
      "https://cdn.openasar.dev/" + n + "?v=" + oaVersion
    );
  }

  return w;
};
