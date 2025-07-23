import React from "react";
import { Button } from "./button";

import styles from "./index.module.css";

import "./index.global.css";

export const Ui = () => {
  return (
    <div className={`ui ${styles.app0}`}>
      <Button className="button" />
    </div>
  );
};
