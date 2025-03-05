import React from "react";
import useScriptLoader from "./script-loader";

export const rootDomNodeId = "app0.app0";
import styles from "./index.css";

import "./index.global.css";

export const Ui = () => {
  useScriptLoader("http://localhost:8081/client.js");
  return <div className={`ui ${styles.app0}`}>APP0 - shell</div>;
};
