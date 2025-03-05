import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import path from "path";
import { Ui, rootDomNodeId } from "../ui";
import cors from 'cors';

const startServer = () => {
  const assetsFolderName = "";
  const assetsPath = `/${assetsFolderName}`;
  const port = 8081;
  const app = express();

  app.use(cors());

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
