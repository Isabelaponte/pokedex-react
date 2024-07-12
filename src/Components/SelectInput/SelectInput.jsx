import React from "react";
import css from "./SelectInput.module.scss";

export default function SelectInput({ options, themeWhite = false, getType }) {
  return (
    <select
      name="select_sortPokemon"
      id="select_sortPokemon"
      className={themeWhite ? css.themeWhite : ""}
      onChange={e => getType(e.target.value)}
    >
      <option value="all" defaultValue="all">
        - All -
      </option>

      {options.map((option, key) => {
        return (
          <option key={key} value={option}>
            {option}
          </option>
        );
      })}
    </select>
  );
}
