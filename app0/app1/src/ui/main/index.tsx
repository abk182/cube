import React from "react";
import css from "./index.css";
import { Cube } from "./cube/lazy";
import Form from "./form";

export const Main = () => {
  return (
    <div className={css.main}>
      <Form />
      <React.Suspense fallback={"loading cube..."}>
        <Cube />
      </React.Suspense>
    </div>
  );
};

export default Main;
