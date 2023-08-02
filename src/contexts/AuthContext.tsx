import { createContext, useEffect, useState } from 'react';
import useAuth from '../hooks/useAuth';
import { handleGetRequest } from '../utils/api/axios';

interface AuthContextData {
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const accessToken = localStorage.getItem('token');

  useEffect(() => {
    verifyAccessToken();
  }, []);

  const verifyAccessToken = async () => {
    console.log('Verifying access token...');
    if (!accessToken) {
      setLoading(false);
      return;
    }

    try {
      const { data, status } = await handleGetRequest('/auth/refresh');
      if (status !== 200) {
        console.log(data.message);
        localStorage.setItem('token', data.accessToken);
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
      }
    } catch (error) {
      console.error('Error verifying access token:', error);
    }

    setLoading(false);
  };

  const value = {
    isAuthenticated,
    appUser: user,
  };
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>;
};

export { AuthContext, AuthProvider };
