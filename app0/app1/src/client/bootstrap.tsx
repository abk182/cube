import React from "react";
import { hydrateRoot, createRoot } from "react-dom/client";
import { Ui, rootDomNodeId } from "../ui";

if (document.getElementById("app0.app0")) {
  console.log("hello from app0.app1");
  const rootDomNode = document.createElement("div");
  rootDomNode.id = "app0.app1";
  document.body.append(rootDomNode);
  const root = createRoot(rootDomNode);
  root.render(<Ui />);
} else {
  const rootDomNode = document.getElementById(rootDomNodeId);
  if (rootDomNode) {
    hydrateRoot(rootDomNode, <Ui />);
  } else {
    console.error('rootDomNode is undefined')
  }
}
