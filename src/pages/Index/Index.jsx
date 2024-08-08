import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Index() {
  const navigate = useNavigate();

  return (
    <div className='customBg flex flex-col items-center justify-center h-screen'>
      <h1 className='mt-5 text-green-300 text-[20px]'>If you are not sign up yet , click on signUp button</h1>

      <div className='mt-7 flex items-center gap-6 [&>*]:p-3 [&>*]:bg-green-200 [&>*]:rounded-md [&>*]:text-green-800'>
        <button onClick={() => navigate('/register')}>sign up</button>
        <button onClick={() => navigate('/dashboard')}>dashboard</button>
      </div>
    </div>
  )
}
