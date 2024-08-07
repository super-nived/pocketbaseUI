import React, { useContext, useEffect } from 'react';
import './Home.css';
import CollectionsList from '../components/CollectionsList';
import RecordList from '../components/RecordList';
import pb from '../lib/pocketbase';
import {useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/SelectedCollectionContext';
import useLogin from '../hooks/useLogin';

function Home() {

  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate()
  const { mutate: login} = useLogin();

  useEffect(() => {
    login({ email:"abhi-s@industryapps.net", password:"Linux@1994" });
    if(isAuth){
      navigate('/')
    }
    else{
      navigate('/login')
    }

  }, [isAuth]);

  return (
    <div className="container">
      <CollectionsList></CollectionsList>
      <RecordList></RecordList>
    </div>
  );
}

export default Home;
