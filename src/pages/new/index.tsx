import { useContext, useState, FormEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

import { FaChevronLeft } from "react-icons/fa";

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';
import toast from 'react-hot-toast';

interface HaircutsItem{
  id: string,
  name: string,
  price: number | string,
  status: boolean,
  user_id: string,
};

interface HaircutsProps{
  haircuts: HaircutsItem[],
};

export default function NewService({ haircuts }: HaircutsProps){
  const { mobileScreen } = useContext(AuthContext);
  const router = useRouter();

  const [customer, setCustomer] = useState('');
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  function handleChangeSelect(id: string){
    const haircuteItem = haircuts.find(item => item.id === id);

    setHaircutSelected(haircuteItem);
  };

  async function handleRegisterService(event: FormEvent<HTMLFormElement>){
    event.preventDefault();

    if(customer === ''){
      toast.error('O nome é obrigatório!');
      return;
    };

    try{
      const apiClient = setupAPIClient();

      await apiClient.post('/schedule', {
        haircut_id: haircutSelected.id,
        customer,
      });

      toast.success('Serviço registrado com sucesso!');
      router.push('/dashboard');

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
            <Link href='/dashboard'>
              <button 
                className='h-6 text-white text-sm font-bold bg-btnColor px-3 rounded flex items-center gap-1' 
              >
                <FaChevronLeft size={14} color='#FFF' />
                Voltar
              </button>
            </Link>

            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Novo serviço</h1>
          </section>

          <main className='w-full bg-primary p-5 rounded mt-8 flex flex-col items-center' >
            <form 
              onSubmit={ handleRegisterService }
              className='w-full' 
            >
              <input
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray'
                type='text'
                name='name'
                placeholder='Digite o nome do cliente'
                value={ customer }
                onChange={ (event) => setCustomer(event.target.value) }
              />
              <select 
                onChange={ (event) => handleChangeSelect(event.target.value) }
                className='w-full h-10 rounded mb-4 font-semibold text-white bg-bg px-3 border border-gray' 
              >
                {haircuts?.map(item => {
                  return(
                    <option
                      key={ item?.id }
                      value={ item?.id }
                    >
                      { item?.name }
                    </option>
                  )
                })}
              </select>

              <button 
                type='submit'
                className='w-full rounded h-11 text-bg font-extrabold bg-secondary' 
              >
                Registrar
              </button>
            </form>
          </main>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{
    const apiClient = setupAPIClient(ctx);

    const response = await apiClient.get('/haircuts', {
      params:{
        status: true,
      },
    });

    if(response.data === null){
      return{
        redirect:{
          destination: '/dashboard',
          permanent: false,
        },
      };
    };

    return{
      props:{
        haircuts: response.data,
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