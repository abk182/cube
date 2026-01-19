declare module "lazyOnlyOnClient" {
  import * as React from "react";

  export function lazyOnlyOnClient<T extends React.ComponentType<any>>(
    loader: () => Promise<{ default: T }>
  ): React.LazyExoticComponent<T>;
}