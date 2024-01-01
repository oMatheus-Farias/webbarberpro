import { useState, FormEvent, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Login(){
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    await signIn({
      email,
      password,
    });
  };

  return(
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar</title>
      </Head>
      <div className='w-full min-h-screen flex flex-col justify-center items-center px-4' >
        <Image
          src={ logo }
          alt='Logo BarberPRO'
          priority
          className='mb-10'
        />

        <form 
          onSubmit={ handleLogin }
          className='w-full flex flex-col gap-3 max-w-[31.25em]' 
        >
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='email'
            name='email'
            placeholder='Digite seu email...'
            value={ email }
            onChange={ (event) => setEmail(event.target.value) }
          />
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='password'
            name='password'
            placeholder='************'
            value={ password }
            onChange={ (event) => setPassword(event.target.value) }
          />

          <button 
            type='submit'
            className='w-full rounded h-11 bg-secondary font-bold text-bg' 
          >
            Acessar
          </button>
        </form>

        <Link 
          href='/register'
          className='mt-4' 
        >
          <p className='text-sm text-white font-bold' >Quero cadastrar minha barbearia, 
            <span className='font-normal' >Clique aqui.</span>
          </p>
        </Link>
      </div>
    </>
  );
};