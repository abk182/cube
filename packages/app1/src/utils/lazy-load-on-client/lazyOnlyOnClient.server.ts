import React from "react";

export function lazyOnlyOnClient<T extends React.ComponentType<any>>(
  _loader: () => Promise<{ default: T }>
): React.ComponentType<React.ComponentProps<T>> {
  const Fallback: React.FC<any> = () => null;
  return Fallback as T;
}