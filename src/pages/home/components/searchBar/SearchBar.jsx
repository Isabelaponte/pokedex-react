import React from "react";
import * as FaIcons from "react-icons/fa";
import css from "./SearchBar.module.scss";

export default function SearchBar({ getSearch }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    getSearch(e.target.search.value);
  };

  return (
    <form className={css.search} onSubmit={handleSubmit}>
      <input placeholder="Search..." type="text" name="search" id="search" />
      <button type="submit">
        <FaIcons.FaSearch className={css.icon_search} />
      </button>
    </form>
  );
}
