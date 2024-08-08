import React from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Auth from './Auth';
import CollectionsList from './components/CollectionsList';
import PrivateRoute from './routes/PrivateRoute';
import Home from './pages/Home';


function App() {
  return (
    <Router>
      <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
