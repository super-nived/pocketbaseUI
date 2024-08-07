import React, { useState, useEffect, useContext } from 'react';
import { authenticate, getAllCollections, getAllRecords } from '../lib/pocketbaseService';
import './CollectionsList.css';
import { IoFolderSharp } from "react-icons/io5";
import { SelectedCollectionContext } from '../store/SelectedCollectionContext';
import LogoutButton from './LogoutButton';
import Spinner from './Spinner';

export default function CollectionsList() {
  const [collections, setCollections] = useState([]);
  const [filteredCollections, setFilteredCollections] = useState([]);
  const [records, setRecords] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const { selectedCollection, setSelectedCollection } = useContext(SelectedCollectionContext);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    async function fetchData() {
      try {
        // Authenticate if needed
        // await authenticate('nivedchandran7@gmail.com', '0987654321');

        // Get all collections
        const allCollections = await getAllCollections('-created');
        setCollections(allCollections);
        setFilteredCollections(allCollections); // Initialize filtered collections

        if (allCollections.length > 0) {
          setSelectedCollection(allCollections[0]?.name); // Set the first collection as the selected collection
        }
        setLoading(false); // Set loading to false after fetching data
        console.log("this is allCollection", allCollections);
      } catch (error) {
        console.error('Error fetching collections:', error);
        setLoading(false); // Set loading to false in case of an error
      }
    }
    fetchData();
  }, [setSelectedCollection]);

  useEffect(() => {
    async function fetchRecords() {
      if (selectedCollection) {
        try {
          // Get all records for the selected collection
          const allRecords = await getAllRecords(selectedCollection);
          setRecords(allRecords); // Assume that allRecords contains an 'items' field with the records
          console.log("this is allRecords", allRecords);

          // Determine unique keys for table headers
          const headers = new Set();
          allRecords?.forEach(record => {
            Object.keys(record).forEach(key => headers.add(key));
          });
          setTableHeaders([...headers]);
        } catch (error) {
          console.error('Error fetching records:', error);
        }
      }
    }
    fetchRecords();
  }, [selectedCollection]);

  const handleCollectionClick = (collectionName) => {
    setSelectedCollection(collectionName);
  };

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);

    const filtered = collections.filter(collection =>
      collection.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCollections(filtered);
  };

  return (
    <div className="collection_container">
      <div className="sidebar">
        <div className="sidebar-header">
          <img src="https://industryapps.net/images/industryapps_logo.png" alt="PocketBase Logo" />
        </div>
        <div className="sidebar-content">
          <div className="search-box-container">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search collections..."
                value={searchText}
                onChange={handleSearchChange}
              />
            </div>
          </div>
          {loading ? (
            <Spinner />
          ) : (
            <ul className="menu">
              {filteredCollections.map((collection) => (
                <li
                  key={collection.name}
                  onClick={() => handleCollectionClick(collection.name)}
                  className={selectedCollection === collection.name ? 'active' : ''}
                >
                  <IoFolderSharp />
                  <span>{collection.name}</span>
                </li>
              ))}
            </ul>
          )}
          {/* <button className="new-collection-button">
            + New collection
          </button> */}
        </div>
        {/* <LogoutButton /> */}
      </div>
    </div>
  );
}
