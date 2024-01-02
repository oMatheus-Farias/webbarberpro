import { ReactNode } from 'react';

type ContainerProps = {
  children: ReactNode,
};

export function Container({ children }: ContainerProps){
  return(
    <div className='lg:flex' >
      { children }
    </div>
  );
};