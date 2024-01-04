import { useContext, useState } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';

import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';
import { ScheduleItem } from '@/components/scheduleItem';

import { canSSRAuth } from '@/utils/canSSRAuth';
import { setupAPIClient } from '@/service/api';

interface HaircutProps{
  id: string,
  name: string,
  price: number | string,
  status: boolean,
  user_id: string,
};

interface ScheduleItem{
  id: string,
  customer: string,
  haircut: HaircutProps,
};

interface DashboardProps{
  schedules: ScheduleItem[],
};

export default function Dashboard({ schedules }: DashboardProps){
  const { mobileScreen } = useContext(AuthContext);

  const [list, setList] = useState(schedules.length > 0 ? schedules : []);

  return(
    <>
      <Head>
        <title>BarberPRO - minha barbearia</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <div className='p-5 w-full max-w-[50em]' >
          <header className='flex items-center gap-3' >
            <h1 className='text-xl text-secondary font-bold lg:text-3xl' >Agenda</h1>

            <Link href='/new'>
              <button className='h-9 text-white font-bold bg-btnColor px-3 rounded' >
                Registrar
              </button>
            </Link>
          </header>

          <main className='w-full flex flex-col gap-4 mt-6' >
            {list.map(item => {
              return(
                <button key={ item?.id } >
                  <ScheduleItem 
                    customer={ item?.customer } 
                    haircut={ item?.haircut?.name }  
                    price={ item?.haircut?.price } 
                  />
                </button>
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
    const response = await apiClient.get('/schedule');

    return{
      props:{
        schedules: response.data,
      },
    };

  }catch(err){
    console.log(err);
    return{
      props:{
        schedules: [],
      },
    };
  };
});