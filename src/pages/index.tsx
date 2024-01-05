import { useContext } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import { Container } from '@/components/container';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';

export default function Home() {
  const { mobileScreen } = useContext(AuthContext);

  return (
    <>
      <Head>
        <title>BarberPRO - Seu sistema completo</title>
      </Head>
      <Container>
        {mobileScreen !== null ? mobileScreen ? <HeaderMobile/> : <SidebarDasktop/> : ''}

        <div className='p-5 w-full max-w-[50em]' >
          <h1 className='text-3xl text-secondary font-bold' >Bem-vindo(a) ao <span className='text-white' >Barber</span>PRO</h1>

          <p className='text-white mt-4' >
            É um prazer recebê-lo no BarberPRO, um projeto que exemplifica minhas habilidades em desenvolvimento web e inovação tecnológica. 
          </p>
          <p className='text-white mt-4' >
            Projetado com tecnologias modernas, sendo o front end desenvolvido com NextJS, TypeScript, TailwindCSS e ContextAPI, e o back end com NodeJS, PostgreSQL e Prisma para construir a api,sendo utilizado boas práticas de segurança, como criptografia de senha.
            Explore a interface dinâmica e intuitiva que desenvolvi com base no curso da empresa Sujeito Programador, destacando minha competência na criação de sistemas eficientes e seguros.
          </p>
          <p className='text-white mt-4' >
            A página do dashboard, com sua agenda interativa e o sistema de cortes flexível, demonstra uma abordagem inovadora para atender às necessidades específicas do usuário. Ao explorar a seção "Minha Conta", perceberá a atenção aos detalhes e a personalização oferecida, refletindo minha habilidade em desenvolver soluções sob medida. 
          </p>
          <p className='text-white mt-4' >
            Este projeto conta com funcionalidades para distinguir contas com plano gratuito e plano premium, onde algumas opções serão limitadas ou bloqueadas para quem possui uma conta gratuita. Porém, como é um projeto para questões didáticas, a opção de assinar o premium foi desativada. No entanto, o projeto pode ser explorado normalmente. <br/>Sinta-se à vontade para navegar, experimentar e explorar as diversas funcionalidades que o BarberPRO oferece através do menu disponibilizado.
          </p>
        </div>
      </Container>
    </>
  );
};