import { IoPerson } from 'react-icons/io5';

interface ScheduleProps{
  customer: string,
  haircut: string,
  price: number | string,
};

export function ScheduleItem({ customer, haircut, price }: ScheduleProps){
  return(
    <section className='w-full flex flex-col gap-3 rounded p-3 items-start bg-primary lg:flex-row lg:items-center lg:justify-between' >
      <div className='flex items-center gap-3' >
        <IoPerson size={33} color='#FBB231' />
        <p className='text-white font-semibold' >{ customer }</p>
      </div>

      <p className='text-white font-semibold' >{ haircut }</p>
      <p className='text-white font-semibold' >{ `R$ ${Number(price).toFixed(2)}` }</p>
    </section>
  );
};