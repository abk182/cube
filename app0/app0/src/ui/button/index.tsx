import React from "react";

import styles from "./index.module.css";

export const Button = ({ className }: { className?: string }) => {
  const handleClick = () => {
    const loadScript = () => {
      const element = document.createElement("script");
      element.type = "text/javascript";
      element.async = false;
      element.src = "http://localhost:8081/client.js";

      document.body.appendChild(element);
    };
    loadScript();
  };
  return (
    <button
      className={className ? `${className} ${styles.button}` : styles.button}
      onClick={handleClick}
    >
      GO!
    </button>
  );
};
