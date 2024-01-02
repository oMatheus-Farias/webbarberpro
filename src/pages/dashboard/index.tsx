import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';
import Head from 'next/head';
import { canSSRAuth } from '@/utils/canSSRAuth';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';

export default function Dashboard(){
  const { mobileScreen } = useContext(AuthContext);

  return(
    <>
      <Head>
        <title>BarberPRO - minha barbearia</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <h1 className='text-white' >Página Dashboard</h1>
      </Container>
    </>
  );
};

export const getServerSideProps = canSSRAuth(async (ctx) => {
  return {
    props: {},
  };
});