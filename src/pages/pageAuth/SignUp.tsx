import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'


// URL
import { URL } from '../../utils/constants/url'

const SignUp = () => {
  const [user,setUser]= useState({
    role: 'user'
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setUser((user) => ({ ...user, [name]: value }))    
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
      const response = await axios.post(URL.USER_SIGNUP, user) 
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input 
          type='text'
          onChange={handleChange}
          placeholder='prenom'
          name='prenom'
        />
          <input 
          type='text'
          onChange={handleChange}
          placeholder='URL picture'
          name='picture'
        />
        <input 
          type='text'
          onChange={handleChange}
          placeholder='email'
          name='email'
        />
          <input 
          type='password'
          onChange={handleChange}
          name='password'
        />
        <button>Registration</button>
      </form>
      <Link to='/sign'>Already registered??</Link>
    </div>
  )
}

export default SignUp