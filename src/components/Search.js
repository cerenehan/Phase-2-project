import React from "react";
import { useShopContext } from "../context/shop-context";

function Search({inputStyles}) {
    let searchedProducts
    const {products, setSearchResults} = useShopContext()

    const handleSearchChange = (e) => {
        const searchedProducts = products.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase()) || p.category.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResults(searchedProducts)
    }

    return (
        <div className="ui large fluid icon input">
        <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
            style={inputStyles}
        />
        <i className="circular search link icon"></i>
    </div>
);
}

export default Search;
