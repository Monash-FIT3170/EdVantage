import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export { type AuthContextInterface, AuthContext };
