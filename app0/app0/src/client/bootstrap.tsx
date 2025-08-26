import React from "react";
import { hydrateRoot } from "react-dom/client";
import { Ui } from "../ui";
import { rootDomNodeId } from "../../config";

const node = document.getElementById(rootDomNodeId);

if (node) hydrateRoot(node, <Ui />);
