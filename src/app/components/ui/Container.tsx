import React from 'react'

function Container({children}:{children:React.ReactNode}) {
  return (
    <>
    <div className='w-11/12'>
    {children}
    </div>
    </>
  )
}

export default Container