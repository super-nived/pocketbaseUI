import React, { useContext, useEffect } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDatabase, faUniversity, faAddressCard, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import CollectionsList from '../components/CollectionsList';
import RecordList from '../components/RecordList';
import pb from '../lib/pocketbase';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../store/SelectedCollectionContext';

function Home() {

  const isLogin = pb.authStore.isValid;
  const { isAuth, setIsAuth } = useContext(AuthContext);

  // useEffect(() => {

  //   isAuth && <Navigate to="/" />
  // }, [isLogin]);

console.log(isAuth,"LLLLLL");



  return (
    <div className="container">
      <CollectionsList></CollectionsList>
      <RecordList></RecordList>
    </div>
  );
}

export default Home;
