import Head from 'next/head';
import logo from '../../../public/logo.png';
import Image from 'next/image';
import Link from 'next/link';

export default function Register(){
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

        <form className='w-full flex flex-col gap-3 max-w-[31.25em]' >
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='text'
            name='name'
            placeholder='Nome da barbearia'
          />
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='email'
            name='email'
            placeholder='Digite seu email...'
          />
          <input
            className='w-full rounded h-11 px-4 text-white bg-primary'
            type='password'
            name='password'
            placeholder='************'
          />

          <button className='w-full rounded h-11 bg-secondary font-bold text-bg' >
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