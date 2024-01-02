import { useState, FormEvent, useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

import { CanSSRGuest } from '@/utils/canSSRGuest';

export default function Register(){
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleRegister(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    await signUp({
      name,
      email,
      password,
    });
  };

  return(
    <>
      <Head>
        <title>Crie sua conta no BarberPRO</title>
      </Head>
      <div className='w-full min-h-screen flex flex-col justify-center items-center px-4' >
        <Image
          src={ logo }
          alt='Logo BarberPRO'
          priority
          className='mb-10'
        />

        <form
          onSubmit={ handleRegister } 
          className='w-full flex flex-col gap-3 max-w-[31.25em]' 
        >
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='text'
            name='name'
            placeholder='Nome da barbearia'
            value={ name }
            onChange={ (event) => setName(event.target.value) }
          />
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
            Cadastrar
          </button>
        </form>

        <Link 
          href='/login'
          className='mt-4' 
        >
          <p className='text-sm text-white font-bold' >Já tenho conta. 
            <span className='font-normal' > Faça login.</span>
          </p>
        </Link>
      </div>
    </>
  );
};

export const getServerSideProps = CanSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});