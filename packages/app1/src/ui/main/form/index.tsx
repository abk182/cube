import React, { useState } from "react";
import { useWasm } from "../../../wasm/use-wasm";
import css from "./index.css";

export const Form = () => {
  const [currentIncome, setCurrentIncome] = useState(100);
  const [years, setYears] = useState(10);
  const [inflation, setInflation] = useState(5);
  const wasm = useWasm();

  return (
    <div className={css.main}>
      <div className={css.salary}>
        <input
          placeholder="currentIncome"
          value={currentIncome}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value))
              setCurrentIncome(+e.target.value);
          }}
        />
        <input
          placeholder="years"
          value={years}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setYears(+e.target.value);
          }}
        />
        <input
          placeholder="inflation"
          value={inflation}
          onChange={(e) => {
            if (!Number.isNaN(+e.target.value)) setInflation(+e.target.value);
          }}
        />
        <div className="text-3xl font-bold underline">
          {wasm
            ? wasm.calc(currentIncome, years, inflation)
            : "loading wasm module..."}
        </div>
      </div>
    </div>
  );
};

export default Form;
