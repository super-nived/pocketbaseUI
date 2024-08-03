import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import './RecordList.css'
import { SelectedCollectionContext } from '../store/SelectedCollectionContext';
import { getAllRecords } from '../lib/pocketbaseService';
import { IoSettingsOutline } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";


const RecordList = () => {
    const { selectedCollection } = useContext(SelectedCollectionContext);
    const [records, setRecords] = useState([]);
    const [headers, setHeaders] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            try {
                const records = await getAllRecords(selectedCollection);
                setRecords(records);

                if (records.length > 0) {
                    setHeaders(Object.keys(records[0]));
                }
            } catch (error) {
                console.error('Error fetching records:', error);
            }
        };

        fetchRecords();
    }, [selectedCollection]);

    return (
        <div className="main-content">
            <div className="header">
                <div className="header_left">
                    <h2>Collections /<span className='collection_title'>{selectedCollection}</span></h2>
                    <span><IoSettingsOutline /></span>
                    <span><RiRefreshLine /></span>
                </div>
                <div className="header_right"><button className="new-record-button">
                    + New record
                </button>
                </div>
            </div>
           <div className="search_box_container">
         <div className="search-term-box">
       <span className='search_icon'><IoSearchOutline /></span> <input type="text" placeholder="Search term or filter like created > '2022-01-01'..." />
      </div> 
      </div> 
       <div className="table-container">
        <table className="data-table">
          <thead>
            <tr>
              <th></th>
              {headers.map((header) => (
                <th key={header}>{header}</th>
              ))}
              <th></th>
            </tr>
          </thead>
          <tbody>
            {records.map((record) => (
              <tr key={record.id}>
                <td><input type="checkbox" /></td>
                {headers.map((header) => (
                  <td key={header}>{record[header]}</td>
                ))}
                <td><a href="#"><FontAwesomeIcon icon={faChevronRight} /></a></td>
              </tr>
            ))}
          </tbody>
        </table>
        {/* <div className="total-found">Total found: {records.length}</div> */}
      </div>
    </div>
    );
};



export default RecordList;
