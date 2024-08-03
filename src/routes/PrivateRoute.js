import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import pb from '../lib/pocketbase';
// Assuming this is where your PocketBase instance is

const PrivateRoute = () => {
  return pb.authStore.isValid ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
