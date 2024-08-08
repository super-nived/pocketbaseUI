import React, { useContext, useEffect } from 'react';
import './Home.css';
import CollectionsList from '../components/CollectionsList';
import RecordList from '../components/RecordList';
import pb from '../lib/pocketbase';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../store/SelectedCollectionContext';
import useLogin from '../hooks/useLogin';
import useLogout from '../hooks/useLogout';
import ErrorMessage from '../components/ErrorMessage';

function Home() {
  const { isAuth, setIsAuth } = useContext(AuthContext);
  const navigate = useNavigate();
  const logout = useLogout();
  const { mutate: login } = useLogin();

  useEffect(() => {
    login({ email: "abhi-s@industryapps.net", password: "Linux@1994" });
    if (isAuth) {
      console.log("user is authenticated");
    } else {
      console.log("is not authenticated .........");
    }
  }, [isAuth, login]);

  return (
    <>
      {isAuth ? (
        <div className="container">
          <CollectionsList />
          <RecordList />
        </div>
      ) : (
        <ErrorMessage></ErrorMessage>
      )}
    </>
  );
}

export default Home;
