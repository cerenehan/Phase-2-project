import React from "react";

function Search({onSearchChange, inputStyles}) {
    const handleSearchChange = (e) => {
        onSearchChange(e.target.value)
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
