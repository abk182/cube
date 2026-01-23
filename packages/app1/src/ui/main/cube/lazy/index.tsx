'use client'
import React, { useEffect, useState } from "react";
import { sleep } from "../../../../utils/sleep";

export const LazyCube = React.lazy(() =>
  sleep().then(() => import("../component")),
);

export const Cube = () => {
  const [shouldRender, setShouldRender] = useState(false);

  useEffect(() => {
    // do nothing on server
    if (typeof window !== "undefined") {
      setShouldRender(true);
    }
  }, []);

  if (shouldRender) {
    return (
      <React.Suspense fallback={"loading"}>
        <LazyCube />
      </React.Suspense>
    );
  }

  return null;
};

export default Cube;
