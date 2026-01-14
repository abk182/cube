import React, { useEffect, useState } from "react";
import { useWasm } from "../../../../wasm/use-wasm";
import { Image } from "./image";
import styles from "./style.css";

export const Cube = () => {
  const wasm = useWasm();
  const [width, setWidth] = useState(400);
  const [height, setHeight] = useState(400);
  const [x, setX] = useState(10);
  const [y, setY] = useState(10);
  const [z, setZ] = useState(10);
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    let interval;

    if (animated && wasm) {
      interval = setInterval(() => {
        setY((y) => y + 1);
        setX((x) => x + 2);
        setZ((z) => z + 3);
      }, 20);
    }

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [wasm, animated]);

  return (
    <div className={styles.cube}>
      <div className={styles.inputs}>
        <input
          type="number"
          placeholder="width"
          value={width}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setWidth(+e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="height"
          value={height}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setHeight(+e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="width"
          value={x}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setX(+e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="width"
          value={y}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setY(+e.target.value);
          }}
        />
        <input
          type="number"
          placeholder="height"
          value={z}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setZ(+e.target.value);
          }}
        />
        <button
          onClick={() => {
            setAnimated(!animated);
          }}
        >
          {animated ? "Stop" : "Start"}
        </button>
      </div>
      {wasm && height > 0 && width > 0 ? (
        <Image
          width={width}
          height={height}
          data={wasm.draw_cube(width, height, x, y, z)}
        />
      ) : (
        "loading wasm module..."
      )}
    </div>
  );
};

export default Cube;