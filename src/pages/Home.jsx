import React from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faUniversity, faAddressCard, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CollectionsList from '../components/CollectionsList';
import RecordList from '../components/RecordList';

function Home() {
  return (
    <div className="container">
      <CollectionsList></CollectionsList>
      <RecordList></RecordList>
    </div>
  );
}

export default Home;
