import Head from 'next/head';
import { canSSRAuth } from '@/utils/canSSRAuth';

export default function Dashboard(){
  return(
    <>
      <Head>
        <title>BarberPRO - minha barbearia</title>
      </Head>
      <h1 className='text-white' >Pagina Dashboard</h1>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});