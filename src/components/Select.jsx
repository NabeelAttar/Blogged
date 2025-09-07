// our own select html element

import React, {useId} from 'react'

function Select({options, label, className='', ...props}, ref) {

    const id = useId()
  return (
    <div className='w-full'>
        {label && <label className='' htmlFor={id}></label>}
        <select 
        {...props}
        id={id}
        ref={ref}
        className={`px-3 py-2 rounded-lg bg-white/5 text-white outline-none focus:bg-white/10 duration-200 border border-white/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 w-full ${className}`}
        >
            {options?.map((option) => (
                <option key={option} value={option} className='bg-brand-dark text-white'>
                    {option}
                </option>
            ))}
        </select>
    </div>
  )
}

export default React.forwardRef(Select)

