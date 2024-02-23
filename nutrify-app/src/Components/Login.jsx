import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import userContext from '../Context/UserContext'

const Login = () => {

  const loggedData=useContext(userContext)

  const navigate =useNavigate()
  const [userCred,setUserCred]=useState({
    email:"",
    password:""
  })

  const [message,setMessage]=useState({
    type:"invisible-msg",
    text:"Dummy Msg"
  })

  const handleInput=(event)=>{
    setUserCred((prevState)=>{
      return {...prevState,[event.target.name]:event.target.value}})
  }

  const handleSubmit=(event)=>{
    event.preventDefault()

    fetch('http://localhost:8000/login',{
      method:"POST",
      body:JSON.stringify(userCred),
      headers:{
        "Content-type":"application/json"
      }
    })
    .then((response)=>{
      console.log(response)
      if(response.status===404){
        setMessage({type:"error", text:"Username or Email does'nt exist"})
      }
      else if(response.status===403){
        setMessage({type:"error",text:"Incorrect password "})
      }

      setTimeout(()=>{
        setMessage({
          type:'invisible-msg',text:"Dummy Msg"
        })
      },5000)
      
     return response.json()})

    .then((data)=>{
    
      if(data.token!==undefined){

        localStorage.setItem("nutrify",JSON.stringify(data))
        loggedData.setLoggedUser(data)

        navigate("/track")
      }      
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

            <input className='inp' type='email' name='email' required placeholder='Enter email' value={userCred.email} onChange={handleInput}/>

            <input className='inp' type='password' name='password' minLength={10} required placeholder='Enter password' value={userCred.password} onChange={handleInput}/>

            <button className='btn'>Login</button>
            <p>Don't have a Account? <Link to="/register">Register</Link> </p>

            <p className={message.type}>{message.text}</p>

        </form>
      </section>
    </>
  )
}

export default Login
