import React from "react";

import styles from "./index.module.css";

export const AppInjector = ({ className }: { className?: string }) => {
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
      className={`${styles.button} ${className} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded`}
      onClick={handleClick}
    >
      {
        'Inject app by dowloading "/client.js" and inserting <script> tag into html'
      }
    </button>
  );
};
