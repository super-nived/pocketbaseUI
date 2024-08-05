import React, { useEffect, useState, useContext } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faLink } from '@fortawesome/free-solid-svg-icons';
import './RecordList.css';
import { SelectedCollectionContext } from '../store/SelectedCollectionContext';
import { getAllRecords, filterRecords } from '../lib/pocketbaseService';
import { IoSettingsOutline } from "react-icons/io5";
import { RiRefreshLine } from "react-icons/ri";
import { IoSearchOutline } from "react-icons/io5";

const RecordList = () => {
    const { selectedCollection } = useContext(SelectedCollectionContext);
    const [records, setRecords] = useState([]);
    const [headers, setHeaders] = useState([]);
    const [filterCriteria, setFilterCriteria] = useState('');

    const fetchRecords = async (criteria = '') => {
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
    };

    useEffect(() => {
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
                        onChange={(e) => setFilterCriteria(e.target.value)}
                    />
                    <button className="search-button" onClick={() => fetchRecords(filterCriteria)}>Search</button>
                </div>
            </div>
            <div className="table-container">
                {records.length === 0 ? (
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
                )}
            </div>
            <div className="total_count"><span>total count: {records.length}</span></div>
        </div>
    );
};

export default RecordList;
