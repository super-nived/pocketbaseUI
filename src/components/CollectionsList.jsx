import React, { useState, useEffect, useContext } from 'react';
import { authenticate, getAllCollections, getAllRecords } from '../lib/pocketbaseService';
import './CollectionsList.css';
import { IoFolderSharp } from "react-icons/io5";
import { SelectedCollectionContext } from '../store/SelectedCollectionContext';


export default function CollectionsList() {
  const [collections, setCollections] = useState([]);
  const [records, setRecords] = useState([]);
  const [tableHeaders, setTableHeaders] = useState([]);
  const { selectedCollection, setSelectedCollection } = useContext(SelectedCollectionContext);

  useEffect(() => {
    async function fetchData() {
      try {
        // Authenticate if needed
        // await authenticate('nivedchandran7@gmail.com', '0987654321');

        // Get all collections
        const allCollections = await getAllCollections('-created');
        setCollections(allCollections);
        console.log("this is allCollection", allCollections);
      } catch (error) {
        console.error('Error fetching collections:', error);
      }
    }
    fetchData();
  }, []);

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

  return (
    <div className="collection_container">
      <div className="sidebar">
        {/* <div className="sidebar-header">
          <h1>INDUSTRYAPPS</h1>
        </div> */}
        <div className="sidebar-content">
          <div className="search-box-container">
            <div className="search-box">
              <input type="text" placeholder="Search collections..." />
            </div>
          </div>
          <ul className="menu">
            {collections.map((collection) => (
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
          <button className="new-collection-button">
            + New collection
          </button>
        </div>
      </div>

    </div>
  );
}
