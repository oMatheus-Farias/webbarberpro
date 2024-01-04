import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import toast from 'react-hot-toast';

import Head from 'next/head';
import { Container } from '@/components/container';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';

interface PlansProps{
  premium: boolean,
};

export default function Plans({ premium }: PlansProps){
  const { mobileScreen } = useContext(AuthContext);

  function handlePlans(){
    toast.error('Indisponivel.');
  };

  return(
    <>
      <Head>
        <title>BarberPRO - Sua assinatura Premium</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}
        
        <div className='p-5 w-full max-w-[50em]'  >
          <h1 className='text-3xl text-secondary font-bold' >Planos</h1>

          <main className='w-full flex flex-col mt-6 gap-3 sm:flex-row' >
            <section className='bg-primary rounded p-4 min-h-[23.25em] max-w-[24.12em] w-full' >
              <h2 className='text-center text-2xl text-white font-semibold' >Plano Grátis</h2>

              <ul className='mt-4 flex flex-col gap-4 list-disc p-5' >
                <li className='text-white font-bold' >Registrar cortes</li>
                <li className='text-white font-bold' >Criar apenas 3 modelos</li>
                <li className='text-white font-bold' >Editar seu perfil</li>
              </ul>
            </section>

            <section className='bg-primary rounded p-4 max-w-[24.12em] w-full' >
              <h2 className='text-center text-2xl text-green font-semibold' >Premium</h2>

              <ul className='mt-4 flex flex-col gap-4 list-disc p-5' >
                <li className='text-white font-bold' >Registrar cortes ilimitados</li>
                <li className='text-white font-bold' >Criar modelos ilimitados</li>
                <li className='text-white font-bold' >Editar seu perfil</li>
                <li className='text-white font-bold' >Editar tipos de corte</li>
                <li className='text-white font-bold' >Recebe todas atualizações</li>
              </ul>

              {premium === true ? (
                <div className='flex flex-col gap-4' >
                  <div className='w-full px-3 py-2 rounded bg-bg text-gray font-bold uppercase text-center' >
                    Você já é premium
                  </div>
                  
                    <button 
                      onClick={handlePlans}
                      className='w-full px-3 py-2 rounded bg-white text-primary font-bold uppercase' >
                      Alterar assinatura
                    </button>
                </div>
              ): (
                  <button 
                    onClick={handlePlans}
                    className='w-full px-3 py-2 mt-5 rounded bg-secondary text-primary font-bold uppercase' >
                    Virar Premium
                  </button>
              )}
            </section>
          </main>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/haircut/check');

    console.log(response.data);

    return{
      props:{
        premium: response.data?.subscriptions?.status === 'active' ? true : false,
      },
    };

  }catch(err){
    console.log(err);
    return{
      redirect:{
        destination: '/dashboard',
        permanent: false,
      },
    };
  };
});