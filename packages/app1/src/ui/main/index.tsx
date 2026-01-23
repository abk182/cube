import React from "react";
import css from "./index.css";
import Cube from "./cube/lazy";

export const Main = () => {
  return (
    <div className={css.main}>
      <Cube />
    </div>
  );
};

export default Main;
