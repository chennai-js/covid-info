import React from 'react';
import { Card } from "./card.jsx";

const SearchBar = ({searchText,handleClear, handleSearch}) => {
    return (
        <Card>

            <div class="bg-white flex items-center rounded-full shadow-md">
                <input onChange={handleSearch} value={searchText} class="rounded-l-full w-full text-gray-700 px-5 leading-tight focus:outline-none" id="search" type="text" placeholder="Search" />

                <div class="p-4">
                    <button onClick={handleClear} class="bg-blue-500 text-white rounded-full  hover:bg-blue-400 focus:outline-none w-5 h-5 flex items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </button>
                </div>
            </div>


        </Card >
    )
}

export { SearchBar }