import React, { Suspense, lazy, useState } from "react";

import styles from "./index.module.css";

// @ts-ignore
const RemoteUi = lazy(() => import("remote/Ui"));

export const FederatedModuleInjector  = ({ className }: { className?: string }) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };
  
  return (
    <>
      <button
        className={className ? `${className} ${styles.button}` : styles.button}
        onClick={handleClick}
      >
        Inject federated module
      </button>
      {visible && (
        <Suspense fallback={"loading..."}>
          <RemoteUi />
        </Suspense>
      )}
    </>
  );
};
