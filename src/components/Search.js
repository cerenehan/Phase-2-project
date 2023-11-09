import React, {useState} from "react";
import { useShopContext } from "../context/shop-context";
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';

function Search() {
    let searchedProducts
    const {products, setSearchResults} = useShopContext()

    const handleSearchChange = (e) => {
        const searchedProducts = products.filter(p => p.title.toLowerCase().includes(e.target.value.toLowerCase()) || p.category.toLowerCase().includes(e.target.value.toLowerCase()))
        setSearchResults(searchedProducts)
    }

    return (
    <div className = "searchContainer">
        <div className = "searchText">
            <input
                type="text"
                placeholder="Search"
                onChange={handleSearchChange}
            />
        </div>
    </div>
);
}

export default Search;
