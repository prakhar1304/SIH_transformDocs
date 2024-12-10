import React, {createContext, useContext, useState, ReactNode} from 'react';

interface AuthType {
  //   usertoken: any;
  login: () => void;
  logout: () => void; // Change 'string' to string (remove quotes)
}

export const AuthContext = createContext<AuthType | null>(null);

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [test, setTest] = useState('Test value');
  const [isLoading, SetIsLoading] = useState(false);
  const [usertoken, SetUserToken] = useState<string | null>(null);

  const login = () => {
    SetUserToken('fhfm');
    SetIsLoading(false);
  };
  const logout = () => {
    SetUserToken(null);
    SetIsLoading(false);
  };

  return (
    <AuthContext.Provider value={{logout, login}}>
      {children}
    </AuthContext.Provider>
  );
};
