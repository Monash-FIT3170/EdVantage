import React, { createContext, useEffect, useState } from 'react';
import { UserRole } from '@/utils/types';
import { useRouter } from 'next/router';

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: UserInfo | undefined;
  setUser: (newUser: UserInfo) => void;
}

type UserInfo = {
  userId: string;
  name: string;
  email: string;
  picture: string;
  role: UserRole;
};

export const AuthContext = createContext<Partial<AuthContextInterface>>({});

export const AuthContextProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserState] = useState<UserInfo>();
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const setUser = (user: UserInfo) => {
    localStorage.setItem('user', JSON.stringify(user));
    setUserState(user);
  }

  useEffect(() => {
    if (!user) {
      const userString = localStorage.getItem('user');
      if (userString) {
        setUserState(JSON.parse(userString));
        setIsLoggedIn(true);
      }
    }

    setLoading(false)
  }, [user])

  useEffect(() => {
    if (process.env.NEXT_PUBLIC_ENVIRONMENT !== 'local') {
      if (!isLoggedIn && router.pathname !== '/login') {
        router.push('/login');
      }
    }
  }, [isLoggedIn, router]);

  const login = () => {
    setIsLoggedIn(true);
    router.push('/');
  };

  const logout = () => {
    setIsLoggedIn(false);
    router.push('/login');
  };

  const value: AuthContextInterface = { isLoggedIn, login, logout, user, setUser }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)

export type { UserInfo, AuthContextInterface };
