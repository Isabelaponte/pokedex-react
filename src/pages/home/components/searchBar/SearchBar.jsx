import React, { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import css from "./SearchBar.module.scss";
import { useDebounce } from "use-debounce";

export default function SearchBar({ getSearch }) {
  const [text, setText] = useState("");
  const [debouncedValue] = useDebounce(text, 300); 

  const handleSubmit = (e) => {
    setText(e.target.value);
  };

  useEffect(() => {
    getSearch(debouncedValue);
  }, [debouncedValue, getSearch]);

  return (
    <div className={css.search}>
      <input
        placeholder="Search..."
        type="text"
        name="search"
        id="search"
        value={text}
        onChange={handleSubmit}
      />
      <div className={css.icon_wrapper}>
        <FaIcons.FaSearch className={css.icon_search} />
      </div>
    </div>
  );
}
