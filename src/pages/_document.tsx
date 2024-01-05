import Document, { Html, Head, Main, NextScript } from 'next/document';
import { JSX } from 'react';

export default class MyDocument extends Document{
  render(): JSX.Element {
    return(
      <Html>
        <Head>
          <meta name='author' content='Matheus Farias' />
          <meta name='description' content='Descubra o BarberPRO, um projeto de desenvolvimento web que destaca habilidades inovadoras em NextJS, TypeScript, TailwindCSS, NodeJS, PostgreSQL e Prisma. Explore uma interface dinâmica, segura e personalizada, evidenciando eficiência na criação de sistemas. O BarberPRO oferece um dashboard interativo com uma abordagem inovadora para atender às necessidades específicas do usuário. Personalize sua experiência na seção "Minha Conta" e conheça as funcionalidades distintas entre contas gratuitas e premium. Navegue livremente por este projeto exemplar, refletindo comprometimento com a excelência em desenvolvimento web.' />
          <meta name='keyboards' content='Desenvolvimento web, BarberPRO, NextJS, TypeScript, TailwindCSS, NodeJS, PostgreSQL, Prisma, Interface dinâmica, Sistema eficiente, Segurança, Dashboard interativo, Sistema de cortes flexível, Personalização, Conta gratuita, Conta premium, Inovação, Excelência em desenvolvimento web.' />

          <link rel="icon" href="/favicon.ico" sizes="any" />
        </Head>
        <body>
          <Main />          
          <NextScript />
        </body>
      </Html>
    );
  };
};