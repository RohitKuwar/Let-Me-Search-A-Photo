import React from "react";
import styles from './searchbox.module.css'

const SearchBox = ({ search, setSearch }) => {
  return (
    <div className = {styles.searchContainer}>
      <input
        type="text"
        value={search}
        placeholder="Search for photo"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  );
};

export default SearchBox;
