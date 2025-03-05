import React, { useEffect } from "react";

export default (src) => {
  useEffect(() => {
    const loadScript = () => {
      const element = document.createElement("script");
      element.type = "text/javascript";
      element.async = false;
      element.src = src;

      document.body.appendChild(element);
    };
    loadScript();
  }, []);
};
