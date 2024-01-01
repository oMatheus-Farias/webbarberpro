import { ReactNode, createContext, useState } from 'react';

interface AuthContextData{
  user: UserProps,
  isAuthenticated: boolean,
  signIn: (credencials: SignInProps) => Promise<void>, 
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

interface SignInProps{
  email: string,
  password: string,
};

type ContextChildren = {
  children: ReactNode,
};

export const AuthContext = createContext({} as AuthContextData );

export default function AuthProvider({ children }: ContextChildren){
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    console.log(email);
    console.log(password);
  };

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }} >
      { children }
    </AuthContext.Provider>
  );
};