import React from "react";

function Search({onSearchChange}) {
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value)
    }

    return (
        <div className="ui large fluid icon input">
        <input
            type="text"
            placeholder="Search"
            onChange={handleSearchChange}
        />
        <i className="circular search link icon"></i>
    </div>
);
}

export default Search;
