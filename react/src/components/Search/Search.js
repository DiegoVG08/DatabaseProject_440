import React from 'react';
import './Search.css';
import { useState } from 'react';

const Search = () => {

    const [entry, setEntry] = useState('');          // This is the current input value.

    const search = () => {
        console.log('searching for: ' + entry);
    }
    return (
        <div className='search'>

            <div className="input-div">

                <input
                    className='input-field'  // Use "className" instead of "class" in JSX.
                    type="text"
                    placeholder="Search for a category"
                    onChange={e => setEntry(e.target.value)}
                />
                <label className='search-label' onClick={search}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </label>

            </div>

            <div className="result-window">
                <label>Searching For: {entry}</label>  {/* Display the searchedEntry here */}
            </div>

        </div>
    )
}

export default Search;
