import { createContext } from 'react';

interface AuthContextInterface {
  isLoggedIn: boolean;
  login: () => void;
  logout: () => void;
  user: UserInfo | undefined;
  setUser: (newUser: UserInfo) => void;
}

type UserInfo = {
  name: string;
  email: string;
  picture: string;
};

const AuthContext = createContext<AuthContextInterface | null>(null);

export { AuthContext };
export type { UserInfo, AuthContextInterface };
