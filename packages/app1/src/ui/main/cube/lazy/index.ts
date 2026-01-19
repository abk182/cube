import React from "react";
import { sleep } from "../../../../utils/sleep";
import { lazyOnlyOnClient } from "lazyOnlyOnClient";

export const Cube = lazyOnlyOnClient(() =>
  sleep().then(() => import("../component"))
);