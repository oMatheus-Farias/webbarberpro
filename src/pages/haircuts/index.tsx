import { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';
import { Switch } from '@/components/switch';
import { HaircutItem } from '@/components/haircutItem';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';

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

export default function Haircuts({ haircuts }: HaircutsProps){
  const { mobileScreen } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(true);
  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(haircuts || []);

  async function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    setIsChecked(event.target.checked);

    const apiClient = setupAPIClient();

    if(event.target.checked === true){
      const response = await apiClient.get('/haircuts', {
        params:{
          status: true,
        },
      });

      setHaircutList(response.data);
    }else{
      const response = await apiClient.get('/haircuts', {
        params:{
          status: false,
        },
      });

      setHaircutList(response.data);
    };
  };

  return(
    <>
      <Head>
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}
        
        <div className='p-5 w-full max-w-[50em]' >
          <header>
            <div className='flex items-center justify-between' >
              <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Modelos de cortes</h1>

              <div className='flex gap-2 items-center' >
                <p 
                  className="text-white font-bold uppercase text-sm" >
                  { isChecked ? 'Ativos' : 'Inativos' }
                </p>

                <Switch isChecked={ isChecked } handleCheckboxChange={ handleCheckboxChange } />
              </div>
            </div>
          </header>

          <Link href='/haircuts/new'>
            <button className='h-9 text-white font-bold bg-btnColor px-3 rounded mt-4' >
              Cadastrar novo
            </button>
          </Link>

          <main className='w-full flex flex-col' >
            {haircutList.map((item) => {
              return(
                <Link key={ item.id } href={ `/haircut/${item.id}` } >
                  <HaircutItem name={ item.name } price={ item.price } />
                </Link>
              )
            })}
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