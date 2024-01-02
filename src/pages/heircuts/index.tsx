import { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import Link from 'next/link';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';
import { Switch } from '@/components/switch';
import { IoPricetag } from "react-icons/io5";

export default function Heircuts(){
  const { mobileScreen } = useContext(AuthContext);

  const [isChecked, setIsChecked] = useState(true);

  function handleCheckboxChange(event: ChangeEvent<HTMLInputElement>){
    setIsChecked(event.target.checked);
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

          <Link href='/heircuts/new'>
            <button className='h-9 text-white font-bold bg-btnColor px-3 rounded mt-4' >
              Cadastrar novo
            </button>
          </Link>

          <main className='w-full flex flex-col' >
            <section className='w-full mt-4 bg-primary p-3 flex items-center justify-between rounded' >
              <div className='flex items-center gap-3' >
                <IoPricetag size={34} color='#FBB231' />

                <p className='text-white font-bold' >Corte normal</p>
              </div>

              <div>
                <p className='text-white font-bold' >R$45.00</p>
              </div>
            </section>
            <section className='w-full mt-4 bg-primary p-3 flex items-center justify-between rounded' >
              <div className='flex items-center gap-3' >
                <IoPricetag size={34} color='#FBB231' />

                <p className='text-white font-bold' >Corte e barba</p>
              </div>

              <div>
                <p className='text-white font-bold' >R$70.00</p>
              </div>
            </section>
          </main>
        </div>
      </Container>
    </>
  );
};