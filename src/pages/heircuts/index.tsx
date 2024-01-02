import { useContext, useState, ChangeEvent } from 'react';
import { AuthContext } from '@/context/AuthContext';

import Head from 'next/head';
import { HeaderMobile } from '@/components/headerMobile';
import { SidebarDasktop } from '@/components/sidebarDasktop';
import { Container } from '@/components/container';
import { Switch } from '@/components/switch';

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

          <button className='h-9 text-white font-bold bg-btnColor px-3 rounded mt-4' >
            Cadastrar novo
          </button>
        </div>
      </Container>
    </>
  );
};