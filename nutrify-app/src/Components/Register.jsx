
import React, { useState } from 'react'
import { Link } from 'react-router-dom'


const Register = () => {

  const [userDetails,setUserDetails]=useState({
    name:"",
    email:"",
    password:"",
    age:""
  })

  const [message,setMessage]=useState({
    type:'invisible-msg',
    text:"Dummy Msg"
  })


  const handleInput = (event)=>{
    setUserDetails((prevState)=>{
      return {...prevState,[event.target.name]:event.target.value}})
    };

  const handleSubmit=(event)=>{
    event.preventDefault()

    fetch('http://localhost:8000/register',{
      method:"POST",
      body:JSON.stringify(userDetails),
      headers:{
        "Content-type":"application/json"
      }
    })
    .then((response)=>response.json())
    .then((data)=>{
      console.log(data)
      setMessage({type:'success',text:data.message});

      setUserDetails({
        name:"",
        email:"",
        password:"",
        age:""
      })

      setTimeout(()=>{
        setMessage({
          type:'invisible-msg',text:"Dummy Msg"
        })
      },5000)
    })
    .catch((err)=>{
      console.log(err)
    })

  }
  return (
    <>
      <section className='container'>
        <form className='form ' onSubmit={handleSubmit} >

            <h2>Start Your Fitness</h2>
            
            <input className='inp' type='text' name='name' required placeholder='Enter name' value={userDetails.name} onChange={handleInput}/>

            <input className='inp' type='email' name='email' required placeholder='Enter email' value={userDetails.email} onChange={handleInput}/>

            <input className='inp' type='password' name='password' minLength={10} required placeholder='Enter password' value={userDetails.password} onChange={handleInput}/>

            <input className='inp' type='number' name='age' min={1} required placeholder='Enter age' value={userDetails.age} onChange={handleInput}/>

            <button className='btn'>Register Now</button>
            <p>Already Registered? <Link to="/login">Login</Link></p>

            <p className={message.type}>{message.text}</p>



        </form>
      </section>
    </>
  )
}


export default Register;
