import React, { useState } from 'react'

export default function Register() {
    const [registerForm , setRegisterForm] = useState({
        fullName : '',
        email : '',
        password : ''
    });

  return (
    <div className='container px-5 sm:px-0'>
        <form>
            <input type="text" value={registerForm.fullName} placeholder="FullName"/>
        </form>
    </div>
  )
}
