import React from 'react'

function layout({children}) {
  return (
    <div className='flex justify-center items-center min-h-screen flex-col '>
        {children}
    </div>
  )
}

export default layout;