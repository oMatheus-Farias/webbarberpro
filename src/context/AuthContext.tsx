import { ReactNode, createContext, useState, useEffect } from 'react';
import { destroyCookie, setCookie, parseCookies } from 'nookies';
import Router from 'next/router';
import { api } from '../service/apiClient';
import toast from 'react-hot-toast';

interface AuthContextData{
  user: UserProps,
  isAuthenticated: boolean,
  mobileScreen: boolean | null,
  signIn: (credencials: SignInProps) => Promise<void>, 
  signUp: (credencials: SignUpProps) => Promise<void>,
  signOutUser: () => Promise<void>,
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

interface SignUpProps{
  name: string,
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
  const [mobileScreen, setMobileScreen] = useState(null);

  useEffect(() => {
    window.addEventListener('resize', setScreenSize);
    setScreenSize();

    const { '@barber.token': token } = parseCookies();

    if(token){
      api.get('/me').then((response) => {
        const { id, name, email, endereco, subscriptions } = response.data;

        setUser({
          id,
          name,
          email,
          endereco,
          subscriptions,
        });
      })
      .catch(() => {
        signOut();
      });
    };
  }, []);

  function setScreenSize(){
    window.innerWidth >= 1024 ? setMobileScreen(false) : setMobileScreen(true);
  };

  async function signIn({ email, password }: SignInProps){
    try{
      if(email === '' || password === ''){
        toast.error('Email/senha inválidos!');
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
      toast.success('Bem-vindo(a)');

    }catch(error){
      console.log('Erro ao fazer login');
      toast.error('Ocorreu algum erro');
    };
  };

  async function signUp({ name, email, password }: SignUpProps){
    try{
      if(name === '' || email === '' || password === ''){
        toast.error('Preencha todos os campos.');
        return;
      };

      await api.post('/users', {
        name,
        email,
        password,
      });

      Router.push('/login');
      toast.success('Cadastro realizado com sucesso!');

    }catch(error){
      console.log('Erro ao fazer cadastro', error);
      toast.error('Ocorreu um erro');
    };
  };

  async function signOutUser(){
    try{
      destroyCookie(null, '@barber.token', { path: '/' });
      Router.push('/login');
      setUser(null);
      toast.success('Volte sempre!');
      
    }catch(error){
      console.log('Erro ao fazer logOut', error);
      toast.error('Ocorreu um erro.')
    };
  };

  return(
    <AuthContext.Provider 
      value={{ 
        user, 
        isAuthenticated,
        mobileScreen, 
        signIn, 
        signUp, 
        signOutUser 
      }} 
    >
      { children }
    </AuthContext.Provider>
  );
};