import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const [reload,setReload]=useState(Math.random());

  const navitage=useNavigate();
  const [token,setToken]=useState(localStorage.getItem("token"));


  const logout=()=>{
    localStorage.setItem("token","")
    setToken("")
    navitage("/login")
  }
  const getback=()=>{
    navitage("/login")
  }

  return (
    <div>
{
  token?
  <div className="container">
     <h3>HOME PAGE</h3>
     <br />
    <button className='btn btn-danger' onClick={logout}>LOGOUT</button>
  </div>:
  <div className="container">
<h2>Token Missing can't access data , pls login again !!!!</h2>
<br />
<button className='btn btn-danger' onClick={getback}>LOGIN !!!</button>

  </div>
}

      

    </div>
    
  )
}

export default Home