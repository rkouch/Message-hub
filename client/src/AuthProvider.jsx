import React, { useState, createContext, useEffect } from 'react';
import { getAccessToken, setAccessToken } from './accessToken';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    fetch("/api/v1/auth/refresh-token", {
      method:"POST",
      credentials: "include"
    }).then(async x => {
      const data = await x.json();
      if (x.ok) {
        setAccessToken(data);
        console.log("access token:" + getAccessToken());
      }
      if (getAccessToken().length !== 0) {
        setLoggedIn(true);
      }
    }).catch(e => {
      console.log(e);
    })
  }, [])

  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};