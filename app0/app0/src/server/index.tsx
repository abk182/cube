import React from "react";
import { renderToString } from "react-dom/server";
import express from "express";
import path from "path";
import { Ui } from "../ui";
import {
  clientBundleName,
  rootDomNodeId,
  staticFilesFolderName,
} from "../../config";

const startServer = () => {
  const staticFilesPath = `/${staticFilesFolderName}`;
  const port = 8080;
  const app = express();

  app.use(
    staticFilesPath,
    express.static(path.join(__dirname, staticFilesPath))
  );

  app.get("/", (req, res) => {
    res.end(
      `<!DOCTYPE html>
          <html>
            <body>
              <div id=${rootDomNodeId}>${renderToString(<Ui />)}</div>
              <script type="text/javascript" src="${staticFilesFolderName}/${clientBundleName}.js"></script>
              <link rel="stylesheet" type="text/css" href="${staticFilesFolderName}/${clientBundleName}.css" as="style">
            </body>
          </html>`
    );
  });

  app.listen(port, () => {
    console.log(`On port ${port}`);
  });
};

startServer();
