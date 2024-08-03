import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import './Auth.css';
import pb from './lib/pocketbase';
import useLogout from './hooks/useLogout';
import useLogin from './hooks/useLogin';

export default function Auth() {
  const { register, handleSubmit } = useForm();
  const logout = useLogout();
  const { mutate: login, isLoading, error, isError } = useLogin();
  const isLogin = pb.authStore.isValid;

  useEffect(() => {
    if (error) {
      console.error('Login Error:', error);
    }
  }, [error]);

  async function onSubmit(data) {
    login({ email: data.email, password: data.password });
  }

  return (
    <div className="login-container">
      <div className="login-box">
        {isError && <small>Error: {error.message}</small>}
        {isLoading ? (
          <div className="spinner">Loading....</div>
        ) : (
          isLogin ? (
            <>
              <div className="image-box mb-6">
                <img src="https://industryapps.net/images/industryapps_logo.png" alt="PocketBase Logo" className="logo" />
                <h1 className="title">PocketBase</h1>
              </div>
              <button className="logout-button" onClick={logout}>Logout</button>
            </>
          ) : (
            <>
              <div className="image-box mb-6">
                <img src="https://industryapps.net/images/industryapps_logo.png" alt="PocketBase Logo" className="logo" />
                <h1 className="title">PocketBase</h1>
              </div>
              <h2 className="subtitle">Admin sign in</h2>
              <form className="form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                  <label htmlFor="email" className="form-label">Email <span className="required">*</span></label>
                  <input
                    className="form-input"
                    type="email"
                    id="email"
                    {...register('email', { required: true })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password" className="form-label">Password <span className="required">*</span></label>
                  <input
                    className="form-input"
                    type="password"
                    id="password"
                    {...register('password', { required: true })}
                  />
                </div>
                <div className="forgot-password-container ">
                  <a href="#" className="forgot-password">Forgotten password?</a>
                </div>
                <button className="login-button" type="submit">
                  <span className="mr-2">Login</span><i className="fas fa-arrow-right"></i>
                </button>
              </form>
            </>
          )
        )}
      </div>
    </div>
  );
}
