import React from "react";
import { renderToString } from "react-dom/server";
import { Express } from "express";
import fs from "fs";
import { Ui } from "../../ui";
import {
  rootDomNodeId,
} from "../../../config";

export const initIndexRoute = (app: Express) => {
  app.get("/", async (req, res) => {
    let rawManifest = await fs.promises.readFile("manifest.json", "utf-8");
    let manifest: {
      entries: { index: { initial: { js: string[]; css: string[] } } };
    } = JSON.parse(rawManifest);

    let scripts = manifest.entries.index.initial.js
      .map(
        (src) => `<script type="text/javascript" src="${src}" defer></script>`
      )
      .join("\n");
    let styles = manifest.entries.index.initial.css
      .map(
        (href) =>
          `<link rel="stylesheet" type="text/css" href="${href}" as="style">`
      )
      .join("\n");

    res.end(
      `<!DOCTYPE html>
        <html>
            <head>
                ${scripts}
                ${styles}
            </head>
            <body>
                <div id=${rootDomNodeId}>${renderToString(<Ui />)}</div>
            </body>
        </html>`
    );
  });
};
