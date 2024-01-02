import Head from 'next/head';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { HeaderMobile } from '@/components/headerMobile';

export default function Dashboard(){
  return(
    <>
      <Head>
        <title>BarberPRO - minha barbearia</title>
      </Head>
      <HeaderMobile/>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});