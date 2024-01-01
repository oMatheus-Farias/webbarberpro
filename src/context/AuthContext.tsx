import { ReactNode, createContext, useState } from 'react';
import { destroyCookie, setCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../service/apiClient';

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

export function signOut(){
  try{
    destroyCookie(null, '@barber.token', { path: '/' });
    Router.push('/login');
  }catch(err){
    console.log('Error logOut');
  };
};

export default function AuthProvider({ children }: ContextChildren){
  const [user, setUser] = useState<UserProps>();
  const isAuthenticated = !!user;

  async function signIn({ email, password }: SignInProps){
    try{
      if(email === '' || password === ''){
        alert('Email/senha inválidos!');
        return;
      };

      const response = await api.post('/session', {
        email,
        password,
      });

      const { id, name, endereco, subscriptions, token } = response.data;

      setCookie(undefined, '@barber.token', token, {
        maxAge: 60 * 60 * 24 * 30,
        path: '/',
      });

      setUser({
        id,
        name,
        email,
        endereco,
        subscriptions,
      });

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

      Router.push('/dashboard');

    }catch(error){
      console.log('Erro ao fazer login');
    };
  };

  return(
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }} >
      { children }
    </AuthContext.Provider>
  );
};