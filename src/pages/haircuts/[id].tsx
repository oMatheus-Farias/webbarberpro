import { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';
import { Switch } from '@/components/switch';

import Head from 'next/head';
import Link from 'next/link';

import { FaChevronLeft } from "react-icons/fa";

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';
import toast from 'react-hot-toast';

interface HaircutDetailProps{
  id: string,
  name: string,
  price: number | string,
  status: boolean,
  user_id: string,
};

interface EditHaircutProps{
  subscriptions: boolean,
  haircutDetail: HaircutDetailProps,
};

export default function EditHaircut({ subscriptions, haircutDetail }: EditHaircutProps){
  const { mobileScreen } = useContext(AuthContext);

  const [name, setName] = useState(haircutDetail && haircutDetail?.name);
  const [price, setPrice] = useState(haircutDetail && haircutDetail?.price);
  const [status, setStatus] = useState(haircutDetail && haircutDetail?.status);

  const [isChecked, setIsChecked] = useState(status === true ? false : true);

  async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    setIsChecked(event.target.checked);
  };

  async function handleEditHaircut(){
    if(name === '' || price === ''){
      toast.error('Preencha todos os campos!');
      return;
    };

    try{
      const apiClient = setupAPIClient();

      await apiClient.put('/haircut', {
        haircut_id: haircutDetail?.id,
        name,
        price: Number(price),
        status: isChecked === true ? false : true,
      });

      toast.success('Editado com sucesso!');

    }catch(err){
      console.log(err);
      toast.error('Ocorreu um erro');
    };
  };

  return(
    <>
      <Head>
        <title>Editando modelo de cortes - BarberPRO</title>
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

            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Editar corte</h1>
          </section>

          <main className='w-full bg-primary p-3 rounded mt-8 flex flex-col items-center' >
            <h2 className='text-white font-bold text-3xl' >Editar modelo</h2>

            <form 
              className='w-full mt-6' 
              onSubmit={ () => {} }
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
            </form>

            <div className='w-full flex flex-col' >
              <div className='mb-4 flex items-center gap-3' >
                <p className='text-white font-bold' >Desativar corte</p>

                <Switch isChecked={ isChecked }  handleCheckboxChange={ handleCheckboxChange } />
              </div>

              <button 
                onClick={ handleEditHaircut }
                className='w-full rounded h-11 text-bg font-extrabold bg-secondary' 
                style={{ 
                  opacity: !subscriptions ? '0.4' : '1', 
                  cursor: !subscriptions ? 'not-allowed' : 'pointer' 
                }}
                disabled={ !subscriptions }
              >
                Salvar
              </button>

              {!subscriptions && (
                <Link href='/plans' 
                  className='text-xs text-center mt-5 text-green font-bold sm:text-sm'
                >
                  Seja premium<span className='text-white font-normal' > e tenha acessos liberados</span>.
                </Link>
              )}
            </div>
          </main>
        </div>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try{
    const apiClient = setupAPIClient(ctx);
    const { id } = ctx.params;

    const response = await apiClient.get('/haircut/check');
    const responseDetailHaircut = await apiClient.get('/haircut/detail', {
      params:{
        haircut_id: id,
      },
    });

    return{
      props:{
        subscriptions: response.data?.subscriptions?.status === 'active' ? true : false,
        haircutDetail: responseDetailHaircut.data,
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