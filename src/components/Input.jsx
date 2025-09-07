// we are designning our own html input component, this Input should behave same as input DOM element thats why we use forwardRef, we also designed Button ans Select in the same way
import React, {useId} from 'react'

// forwardRef makes this Input behave just like a normal <input>, but with extra goodies (label, styling, flexibility).
// Agar tumhe parent se direct control chahiye (focus, reset, select, integration with libraries) → forwardRef must hai.
const Input = React.forwardRef( function Input({
    label,
    type = 'text',
    className = '',
    ...props
}, ref){
    const id = useId()
    return (
        <div className='w-full'> 
            {label && <label className='inline-block mb-1 pl-1' htmlFor={id}>
                {label}
            </label>}
            <input 
            type={type}
            id={id}
            ref={ref}
            className={`px-3 py-2 rounded-lg bg-white/5 text-white placeholder-white/40 outline-none focus:bg-white/10 duration-200 border border-white/10 focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/30 w-full ${className}`}  
            {...props}
            />
        </div>
    )
})

export default Input