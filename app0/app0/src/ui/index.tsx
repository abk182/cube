import React, { Suspense, lazy } from "react";
import { Button } from "./button";

import styles from "./index.module.css";

import "./index.global.css";

// @ts-ignore
const RemoteButton = lazy(() => import("remote/Button"));

export const Ui = () => {
  return (
    <div className={`ui ${styles.app0}`}>
      <main className={`main ${styles.main}`}>
        <Suspense fallback={"loading..."}>
          <RemoteButton />
        </Suspense>
        <Button className="button" />
      </main>
    </div>
  );
};
