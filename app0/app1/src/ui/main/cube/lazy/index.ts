import React from "react";
import { sleep } from "../../../../utils/sleep";

export const Cube = React.lazy(() =>
  sleep().then(() => import("../component"))
);
