import { ReactNode, createContext, useState } from 'react';

interface AuthContextData{
  user: UserProps,
  isAuthenticated: boolean, 
};

interface UserProps{
  id: string,
  name: string,
  email: string,
  endereco: string | null,
  subscriptions: SubdcriptionsProps | null,
};

interface SubdcriptionsProps{
  id: string,
  status: string,
};

type ContextChildren = {
  children: ReactNode,
};

export const AuthContext = createContext({} as AuthContextData );

export default function AuthProvider({ children }: ContextChildren){
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  return(
    <AuthContext.Provider value={{ user, isAuthenticated }} >
      { children }
    </AuthContext.Provider>
  );
};