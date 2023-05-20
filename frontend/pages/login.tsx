import React, { useContext } from 'react';
import { GoogleLogin, type CredentialResponse } from '@react-oauth/google';
import { AuthContext } from '@/utils/auth';

const Login = () => {
  const auth = useContext(AuthContext);

  const onSuccess = (res: CredentialResponse) => {
    console.log('Login Passed');
    try {
      auth?.login();
    } catch (err) {
      console.error(err);
    }
  };

  const onError = () => {
    console.error('Login Failed');
  };

  return <GoogleLogin onSuccess={onSuccess} onError={onError} />;
};

export default Login;
