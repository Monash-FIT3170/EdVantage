import { useContext } from 'react';
import { type CredentialResponse } from '@react-oauth/google';
import { AuthContext } from '@/utils/auth';
import Login from '@/components/Login/Login';

const LoginPage = () => {
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

  return <Login />;
};

export default LoginPage;
