import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';
import toast from 'react-hot-toast';
import Link from 'next/link';

interface UserProps{
  id: string,
  name: string,
  email: string,
  endereco: string | null,
};

interface ProfileProps{
  user: UserProps,
  premium: boolean,
};

export default function Profile({ user, premium }: ProfileProps){
  const { mobileScreen, signOutUser } = useContext(AuthContext);

  const [name, setName] = useState(user && user?.name);
  const [address, setAddress] = useState(user?.endereco ? user?.endereco : '');

  async function handleLogout(){
    await signOutUser();
  };

  async function handleUpdateUser(){
    if(name === ''){
      toast.error('O nome é obrigatório');
      return;
    };

    try{
      const apiClient = setupAPIClient();

      await apiClient.put('/users', {
        name,
        endereco: address,
      });

      toast.success('Dados alterados com sucesso!');

    }catch(err){
      console.log(err);
      toast.error('Ocorreu um erro');
    };
  };

  return(
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <main className='p-5 w-full max-w-[50em]' >
          <h1 className='text-3xl text-secondary font-bold' >Minha Conta</h1>

          <section className='w-full mt-6 bg-primary p-4 rounded' >
            <form className='w-full' >
              <label className='text-white font-bold' >Nome da barbearia:</label>
              <input
                className='w-full h-10 mt-3 rounded mb-5 font-semibold text-white bg-bg px-3 border border-gray' 
                type='text'
                placeholder='Nome da sua barbearia'
                value={ name }
                onChange={ (event) => setName(event.target.value) }
              />
              <label className='text-white font-bold' >Endereço:</label>
              <input
                className='w-full h-10 mt-3 rounded mb-5 font-semibold text-white bg-bg px-3 border border-gray' 
                type='text'
                placeholder='Endereço da barbearia'
                value={ address }
                onChange={ (event) => setAddress(event.target.value) }
              />
            </form>

            <div>
              <label className='text-white font-bold' >Seu plano:</label>
              <div className='w-full flex px-3 py-2 justify-between items-center h-10 border mt-3 border-gray rounded' >
                <p 
                  className='font-bold' 
                  style={{ color: premium ? '#FBA931' : '#4DFFB4' }}
                >
                  { premium ? 'Plano Premium' : 'Plano Grátis' }
                </p>

                <Link href='/plans' >
                  <button className='bg-green text-white text-sm font-bold px-2 py-1 rounded' >
                    Mudar Plano
                  </button>
                </Link>
              </div>

              <div className='flex flex-col gap-4 w-full mt-4' >
                <button 
                  className='w-full rounded h-11 text-bg font-extrabold bg-secondary'
                  onClick={ handleUpdateUser } 
                >
                  Salvar
                </button>

                <button 
                  className='w-full rounded h-11 border border-red text-red' 
                  onClick={ handleLogout }
                >
                  Sair da conta
                </button>
              </div>
            </div>
          </section>
        </main>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get('/me');

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
    };

    return{
      props:{
        user,
        premium: response.data?.subscriptions?.status === 'active' ? true : false,
      },
    };

  }catch(err){
    return{
      redirect:{
        destination: '/dashboard',
        permanent: false,
      },
    };
  };
});