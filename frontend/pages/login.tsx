import React from "react";
import { GoogleLogin } from '@react-oauth/google';
import { useContext } from "react";
import { AuthContext } from "./_app";

const Login = () => {
    const auth = useContext(AuthContext);

    const onSuccess = (res) => {
        console.log("Login Passed")
        auth.login();
    }

    const onError = () => {
        console.log('Login Failed');
    }

    return (
        <GoogleLogin
            onSuccess={onSuccess}
            onError={onError}
        />
    )
}

export default Login