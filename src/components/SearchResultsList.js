import React from "react";
import { useShopContext } from "../context/shop-context";

function SearchResultsList({ theme }) { // Accept the theme prop
  const { searchResults } = useShopContext();

  return (
    <div className={`results-list ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      {searchResults.map((p) => {
        return <div key={p.id}>{p.title}</div>;
      })}
    </div>
  );
}

export default SearchResultsList;
