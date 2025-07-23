import React from "react";
import useScriptLoader from "./script-loader";

import styles from "./index.module.css";

import "./index.global.css";

export const Ui = () => {
  useScriptLoader("http://localhost:8081/client.js");
  return <div className={`ui ${styles.app0}`}>APP0 - shell</div>;
};
