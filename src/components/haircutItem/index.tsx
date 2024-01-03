import { IoPricetag } from "react-icons/io5";

interface HaircutItemProps{
  name: string,
  price: number | string,
};

export function HaircutItem({ name, price }: HaircutItemProps){
  return(
    <section className='w-full mt-4 bg-primary p-3 flex items-center justify-between rounded' >
      <div className='flex items-center gap-3' >
        <IoPricetag size={34} color='#FBB231' />
        <p className='text-white font-bold' >{ name }</p>
      </div>
      <div>
        <p className='text-white font-bold' >{ Number(price).toFixed(2) }</p>
      </div>
    </section>
  );
};