import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLink } from '@fortawesome/free-solid-svg-icons';
import './RecordList.css';
import { SelectedCollectionContext } from '../store/SelectedCollectionContext';
import { getAllRecords, filterRecords } from '../lib/pocketbaseService';
import { IoSettingsOutline } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";
import Spinner from './Spinner';  // Make sure to import the Spinner component

const RecordList = () => {
    const { selectedCollection } = useContext(SelectedCollectionContext);
    const [records, setRecords] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');
    const [showSearchButton, setShowSearchButton] = useState(false);
    const [loading, setLoading] = useState(false);  // Loading state

    const fetchRecords = async (criteria = '') => {
        setLoading(true);  // Set loading to true before fetching data
        try {
            let records;
            if (criteria) {
                records = await filterRecords(selectedCollection, criteria);
            } else {
                records = await getAllRecords(selectedCollection);
            }
            console.log('Fetched records:', records); // Log records for debugging
            setRecords(records);

            if (records.length > 0) {
                const allHeaders = Object.keys(records[0]).filter(header => header !== 'collectionId' && header !== 'collectionName');
                const orderedHeaders = [
                    'id',
                    ...allHeaders.filter(header => header !== 'id' && header !== 'created' && header !== 'updated'),
                    'created',
                    'updated'
                ];
                const prefixedHeaders = orderedHeaders.map(header => {
                    if (header === 'id' || header === 'created' || header === 'updated') {
                        return header;
                    }
                    if (header.includes('email')) {
                        return '' + header;
                    }
                    if (header.includes('link')) {
                        return '' + header;
                    }
                    return '' + header;
                });
                setHeaders(prefixedHeaders);
            } else {
                setHeaders([]);
            }
        } catch (error) {
            console.error('Error fetching records:', error);
        }
        setLoading(false);  // Set loading to false after fetching data
    };

    useEffect(() => {
        fetchRecords();
    }, [selectedCollection]);

    const handleInputChange = (e) => {
        const value = e.target.value;
        setFilterCriteria(value);
        setShowSearchButton(value.length > 0);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            fetchRecords(filterCriteria);
        }
    };

    return (
        <div className="main-content">
            <div className="record_list_top_container">
                <div className="header">
                    <div className="header_left">
                        <h2>Collections /<span className='collection_title'>{selectedCollection}</span></h2>
                        <span><IoSettingsOutline /></span>
                        <span><RiRefreshLine /></span>
                    </div>
                    <div className="header_right">
                        <button className="new-record-button">
                            + New record
                        </button>
                    </div>
                </div>
                <div className="search_box_container">
                    <div className="search-term-box">
                        <span className='search_icon'><IoSearchOutline /></span>
                        <input
                            type="text"
                            placeholder="Search term or filter like created > '2022-01-01'..."
                            value={filterCriteria}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyDown}
                        />
                        <button 
                            className={`search-button ${showSearchButton ? 'visible' : 'hidden'}`} 
                            onClick={() => fetchRecords(filterCriteria)}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="record_list_bottom_container">
                <div className="table_main_container">
                    <div className="table-container">
                        {loading ? (
                            <Spinner />  // Show spinner while loading
                        ) : (
                            records.length === 0 ? (
                                <div className="no-records-found"><p>No records found</p></div>
                            ) : (
                                <table className="data-table">
                                    <thead>
                                        <tr>
                                            <th><input className='fixed-checkbox' type="checkbox" /></th>
                                            {headers.map((header) => (
                                                <th key={header}>{header}</th>
                                            ))}
                                            <th></th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {records.map((record) => (
                                            <tr key={record.id}>
                                                <td><input className='fixed-checkbox' type="checkbox" /></td>
                                                {headers.map((header) => {
                                                    const originalHeader = header.replace(/^T-|^E-|^A-/, '');
                                                    let content = record[originalHeader] || 'N/A';
                                                    if (header.startsWith('E-')) {
                                                        return <td key={originalHeader}>{content}</td>;
                                                    }
                                                    if (header.startsWith('A-')) {
                                                        return (
                                                            <td key={originalHeader}>
                                                                <a href={content !== 'N/A' ? content : '#'}><FontAwesomeIcon icon={faLink} /></a>
                                                            </td>
                                                        );
                                                    }
                                                    return <td key={originalHeader}>{content}</td>;
                                                })}
                                                <td><a className='Arrow_icon' href="#"><FontAwesomeIcon icon={faChevronRight} /></a></td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            )
                        )}
                    </div>
                </div>
                <div className="total_count"><span>total count: {records.length}</span></div>
            </div>
        </div>
    );
};

export default RecordList;
