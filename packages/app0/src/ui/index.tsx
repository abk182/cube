import React from "react";
import { AppInjector } from "./app-injector";
import { FederatedModuleInjector } from "./federated-module-injector";

import styles from "./index.module.css";

import "./index.global.css";

export const Ui = () => {
  return (
    <div className={`ui ${styles.app0}`}>
      <main className={`main ${styles.main}`}>
        <AppInjector className="button" />
        <FederatedModuleInjector className="button" />
      </main>
    </div>
  );
};
