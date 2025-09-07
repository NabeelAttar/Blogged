// designing a common button component for the blog application

import React from 'react'

function Button({children, type='button', bgColor='bg-gradient-to-r from-brand-gold2 via-brand-gold to-brand-gold2', textColor='text-black', className='', ...props}) {
  return (
    <button className={`px-4 py-2 rounded-md shadow-sm hover:shadow-md active:scale-[.98] transition focus:outline-none focus:ring-2 focus:ring-brand-gold/60 font-semibold ${bgColor} ${textColor} ${className}`} {...props}>
        {children}
    </button>
  )
}

export default Button