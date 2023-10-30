import React from 'react';
import './Search.css';
import { useState } from 'react';
import axios from 'axios';

import DataTable from 'react-data-table-component';

const Search = () => {

    const [entry, setEntry] = useState('');
    const [data, setData] = useState([]);

    const search = () => {
        console.log('searching for: ' + entry);
    }

    const columns = [
        {
            name: 'Username',
            selector: row => row.username,
            sortable: true,
        },
        {
            name: 'Title',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Description',
            selector: row => row.description,
            sortable: true,
        },
        {
            name: 'Category',
            selector: row => row.categories.join(', '),  // Join the array of categories into a string
            sortable: true,
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
        },
    ];

    const init_db = async () => {

        console.log('Initializing database...');
        console.log("entry: " + entry)
        try {
            const response = await axios.get('http://127.0.0.1:8000/get-items/', {
                params: { entry: entry },
            });

            if (response.status === 200) {
                console.log('Database initialized!');
                console.log(response.data);
                setData(response.data);
                
            }
        } catch (error) {
            console.log('Error during database initialization!', error);
        }
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
                <DataTable
                    data={data}
                    columns={columns}
                    pagination
                />
            </div>

            <button className='init_database_bttn' onClick={init_db}>Initialize Database</button>

        </div>
    )
}

export default Search;
