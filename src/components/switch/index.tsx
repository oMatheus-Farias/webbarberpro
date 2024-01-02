import { ChangeEvent } from "react";

type SwitchProps = {
  isChecked: boolean,
  handleCheckboxChange: (event: ChangeEvent<HTMLInputElement>) => void,
};

export function Switch({ isChecked, handleCheckboxChange }: SwitchProps){
  return(
    <label className='cursor-pointer' >
      <div>
        <input 
          type='checkbox' checked={ isChecked } onChange={ handleCheckboxChange } 
          className='hidden'
        />
        <div 
          className='w-11 h-6 rounded-3xl flex items-center' 
          style={{ backgroundColor: isChecked ? '#3FBE5B' : '#FF6868' }}
        >
          <button 
            className='w-6 h-6 bg-white rounded-full pointer-events-none transition-all' 
            style={{ transform: isChecked ? 'translateX(20px)' : 'translateX(-1px)' }}
          >  
          </button>
        </div>
      </div>
    </label>
  );
};