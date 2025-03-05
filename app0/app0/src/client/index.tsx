import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Ui, rootDomNodeId } from "../ui";

const node = document.getElementById(rootDomNodeId);

if (node) hydrateRoot(node, <Ui />);
