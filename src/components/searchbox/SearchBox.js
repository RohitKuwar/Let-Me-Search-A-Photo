import React from "react";
import styles from './searchbox.module.css'

const SearchBox = ({ search, setSearch }) => {
  return (
      <input
        type="text"
        value={search}
        placeholder="Search photos"
        onChange={(e) => setSearch(e.target.value)}
        className={styles.searchContainer}
      />
  );
};

export default SearchBox;
