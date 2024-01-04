import { IoMdClose } from 'react-icons/io';
import { IoPerson, IoCash  } from 'react-icons/io5';
import { FiScissors } from 'react-icons/fi';

interface HaircutProps{
  id: string,
  name: string,
  price: number | string,
  status: boolean,
  user_id: string,
};

export interface ScheduleItem{
  id: string,
  customer: string,
  haircut: HaircutProps,
};

interface ModalProps{
  closeModal: () => void,
  schedule: ScheduleItem,
};

export function Modal({ closeModal, schedule }: ModalProps){
  return(
    <div className="absolute top-0 left-0 w-full min-h-screen flex justify-center items-center bg-bgModal" >
      <section className="w-[90%] max-w-[31.87em] p-4 rounded bg-primary" >
        <header className="w-full flex justify-between items-center" >
          <h1 className='text-white font-bold' >Próximo</h1>
          <button
            onClick={ closeModal }
          >
            <IoMdClose size={22} color='#FFF' />
          </button>
        </header>

        <section className='flex flex-col gap-2' >
          <div className='mt-5 flex items-center gap-3' >
            <IoPerson size={23} color='#FBB231' />
            <p className='text-lg text-white font-bold' >{ schedule?.customer }</p>
          </div>
          <div className='mt-5 flex items-center gap-3' >
            <FiScissors size={23} color='#FFF' />
            <p className='text-white font-semibold' >{ schedule?.haircut?.name }</p>
          </div>
          <div className='mt-5 flex items-center gap-3' >
            <IoCash  size={23} color='#46EF75' />
            <p className='text-white font-semibold' >{ `R$ ${Number(schedule?.haircut?.price).toFixed(2)}` }</p>
          </div>
        </section>

        <div className='w-full flex justify-end mt-16' >
          <button className='bg-secondary rounded py-1 px-2 text-primary font-bold' >
            Finalizar serviço
          </button>
        </div>
      </section>
    </div>
  );
};