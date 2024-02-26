import React from 'react';
import { GoogleOAuthProvider, GoogleLogin, useGoogleOneTapLogin, useGoogleLogin } from '@react-oauth/google';

const GoogleAuth = () => {
  return (
    <GoogleOAuthProvider clientId="293751780551-of3d2ekp1bce8eetspdaalvqosv0kgqs.apps.googleusercontent.com">
      <GoogleLogin
        onSuccess={credentialResponse => {
          console.log(credentialResponse);
        }}
        onError={() => {
          console.log('Login Failed');
        }}
      />
    </GoogleOAuthProvider>
  );
};

export default GoogleAuth;
