import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

import { FaChevronLeft } from "react-icons/fa";

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';
import toast from 'react-hot-toast';

interface NewHaircutProps{
  subscriptions: boolean,
  count: number,
};

export default function NewHaircut({ subscriptions, count }: NewHaircutProps){
  const { mobileScreen } = useContext(AuthContext);

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');

  async function handleNewHaircut(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(name === '' || price === ''){
      toast.error('Preencha todos os campos!');
      return;
    };

    try{
      const apiClient = setupAPIClient();

      await apiClient.post('/haircut', {
        name,
        price: Number(price),
      });

      setName('');
      setPrice('');
      toast.success('Cadastrado com sucesso!');

    }catch(err){
      console.log(err);
      toast.error('Ocorreu um erro.');
    };
  };

  return(
    <>
      <Head>
        <title>BarberPRO - Novo modelo de corte</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <div className='p-5 w-full max-w-[50em]' >
          <section className='flex items-center gap-4' >
            <Link href='/haircuts'>
              <button 
                className='h-6 text-white text-sm font-bold bg-btnColor px-3 rounded flex items-center gap-1' 
              >
                <FaChevronLeft size={14} color='#FFF' />
                Voltar
              </button>
            </Link>

            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Modelos de cortes</h1>
          </section>

          <main className='w-full bg-primary p-3 rounded mt-8 flex flex-col items-center' >
            <h2 className='text-white font-bold text-3xl' >Cadastrar modelo</h2>

            <form 
              className='w-full mt-6' 
              onSubmit={ handleNewHaircut }
            >
              <input
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray'
                type='text'
                name='name'
                placeholder='Nome do corte'
                value={ name }
                onChange={ (event) => setName(event.target.value) }
              />
              <input
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray'
                type='text'
                name='price'
                placeholder='Preço exemplo: 45.90'
                value={ price }
                onChange={ (event) => setPrice(event.target.value) }
              />

              <button 
                className='w-full rounded h-11 text-bg font-extrabold bg-secondary' 
                style={{ 
                  opacity: !subscriptions && count >= 3 ? '0.4' : '1', 
                  cursor: !subscriptions && count >= 3 ? 'not-allowed' : 'pointer' 
                }}
                type='submit'
                disabled={ !subscriptions && count >= 3 }
              >
                Cadastrar
              </button>
            </form>

            {!subscriptions && count >= 3 && (
              <Link href='/plans' 
                className='text-xs mt-5 text-white sm:text-sm'
              >
                Você atingiu seu limite de cortes. <span className='text-green font-bold' >Seja premium</span>.
              </Link>
            )}
          </main>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{
    const apiClient = setupAPIClient(ctx);

    const checkResponse = await apiClient.get('/haircut/check');
    const countResponse = await apiClient.get('/haircut/count');

    return{
      props:{
        subscriptions: checkResponse.data?.subscriptions?.status === 'active' ? true : false,
        count: countResponse.data, 
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