import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import path from "path";
import { Ui, rootDomNodeId } from "../ui";

const startServer = () => {
  const assetsFolderName = "assets";
  const assetsPath = `/${assetsFolderName}`;
  const port = 8080;
  const app = express();

  app.use(assetsPath, express.static(path.join(__dirname, assetsPath)));

  app.get("/", (req, res) => {
    res.end(
      `<!DOCTYPE html>
          <html>
            <body>
              <div id=${rootDomNodeId}>${renderToString(<Ui />)}</div>
              <script type="text/javascript" src="${assetsFolderName}/client.js"></script>
            </body>
          </html>`
    );
  });

  app.listen(port, () => {
    console.log(`On port ${port}`);
  });
};

startServer();
