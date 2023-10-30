import React from 'react';
import './Search.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

import Table from '../Tables/Tables';

const Search = () => {

    const [entry, setEntry] = useState('');
    const [data, setData] = useState([]);
    const [selectedRow, setSelectedRow] = useState(null);

    const init_db = async () => {

        console.log('Initializing database...');
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

    const handleTableRowSelect = (selectedData) => {

        setSelectedRow(selectedData);
    };

    useEffect(() => {
        console.log('Updated selected row:', selectedRow);
    }, [selectedRow]);

    const comment = async () => {

        
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
                {/* <label className='search-label' onClick={search}>
                    <i className="fa fa-arrow-right" aria-hidden="true"></i>
                </label> */}

            </div>

            <div className="result-window">
                <Table data={data} onRowSelect={handleTableRowSelect}/>
            </div>
                
            <div className='button-div'>
                <button className='init_database_bttn' onClick={init_db}>Initialize Database</button>
                <button className='create_review' onClick={comment}>Comment</button>
            </div>

        </div>
    )
}

export default Search;
