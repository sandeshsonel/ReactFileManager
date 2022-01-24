import React from "react";
import PropTypes from "prop-types";

import CloseIcon from "assets/icons/close-outline.svg";

const SearchFile = ({ name, value, handleChange, handleClear }) => {
   return (
      <div>
         <div className="group relative">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="w-5 absolute left-3 top-1/2 -mt-2.5 text-gray-400 pointer-events-none"
               viewBox="0 0 512 512"
            >
               <path
                  d="M221.09 64a157.09 157.09 0 10157.09 157.09A157.1 157.1 0 00221.09 64z"
                  fill="none"
                  stroke="currentColor"
                  strokeMiterlimit="10"
                  strokeWidth="32"
               />
               <path
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeMiterlimit="10"
                  strokeWidth="32"
                  d="M338.29 338.29L448 448"
               />
            </svg>
            <input
               name={name}
               value={value}
               onChange={handleChange}
               className="focus:ring-2 focus:ring-gray-400 focus:outline-none w-full text-sm leading-6 text-gray-900 placeholder-gray-400 rounded-md py-1 xl:py-2 pl-10 ring-1 ring-gray-200 shadow-sm"
               type="text"
               placeholder="Search a file"
            />
            {value.length > 0 && (
               <button
                  onClick={handleClear}
                  className="absolute right-3 top-1/2 -mt-3 hover:bg-gray-200 px-0 py-0"
               >
                  <img
                     className="w-6 h-6 text-gray-400"
                     src={CloseIcon}
                     alt=""
                  />
               </button>
            )}
         </div>
      </div>
   );
};

SearchFile.propTypes = {
   name: PropTypes.string,
   value: PropTypes.string,
   handleChange: PropTypes.func,
   handleClear: PropTypes.func,
};

export default SearchFile;
