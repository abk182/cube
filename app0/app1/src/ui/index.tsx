import React from "react";
import Main from "./main";

export const rootDomNodeId = "app0.app1";

import "./index.global.css";
import Button from "./button";

export const Ui = () => {
  return (
    <div className={"ui"}>
      <Button />
      <Main />
    </div>
  );
};
