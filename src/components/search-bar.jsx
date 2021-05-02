import React from "react";
import PropTypes from "prop-types";
import CloseIcon from "../icons/close-icon.jsx";

const SearchBar = ({ searchText, handleClear, handleSearch }) => {
  return (
    <div className="bg-white flex items-center rounded-full shadow-md">
      <input
        onChange={handleSearch}
        value={searchText}
        className="rounded-l-full w-full text-gray-700 px-5 leading-tight focus:outline-none"
        id="search"
        type="text"
        placeholder="Search"
      />

      <div className="p-4">
        <button
          onClick={handleClear}
          className="bg-blue-500 text-white rounded-full  hover:bg-blue-400 focus:outline-none w-5 h-5 flex items-center justify-center"
        >
          <CloseIcon />
        </button>
      </div>
    </div>
  );
};

export default SearchBar;

SearchBar.propTypes = {
  handleClear: PropTypes.func,
  handleSearch: PropTypes.func,
  searchText: PropTypes.string,
};
