import React, { Suspense, lazy, useState } from "react";

import styles from "./index.module.css";

const RemoteUi = lazy(() => import("remote/Ui"));

export const FederatedModuleInjector = ({
  className,
}: {
  className?: string;
}) => {
  const [visible, setVisible] = useState(false);

  const handleClick = () => {
    setVisible(!visible);
  };

  return (
    <>
      <button
        className={`${styles.button} ${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
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
