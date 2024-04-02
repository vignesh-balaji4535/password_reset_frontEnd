import React, { useState } from 'react';
import { Formik } from 'formik';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios"


const Register = () =>{ 
  const [sipnner,setSpinner]=useState(false)
  const [err,setErr]=useState('')
    const navigate=useNavigate();
    // const [userinput,setUserinput]=useState({ })

    
    return (
    
      <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
    
   <h3>REGISTRATION</h3>
    <Formik
      initialValues={{ username:'', email: '', password: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={async (values, { setSubmitting }) => {
        setSpinner(true);
        setSubmitting(false);

          try {
            let response =await axios.post("https://password-reset-flow-47hu.onrender.com/Api/user/register",values)
            localStorage.getItem("token")
          navigate("/login");

          } catch (error) {
            setSpinner(false)
            setErr(error.response.data)
          }
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
        /* and other goodies */
      }) => (
        <form onSubmit={handleSubmit}>
           <input
            type="username"
            name="username"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.username}
            autoComplete='username'
            placeholder='Enter your Name'
          />
          <br />
          <br />
          <input
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete='email'
            placeholder='Enter you E-mail'
          />
          <br />
          {errors.email && touched.email && errors.email}
          {err?<p style={{color:"red",fontSize:"12px",marginBottom:"0"}}>{err}</p>:""}

         <br />
         <br />
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete='current-password'
            placeholder='Password'
          />
          {errors.password && touched.password && errors.password}

          <br />
          <br />
          <button className='btn btn-success' type="submit" disabled={isSubmitting}>
            Register {sipnner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
  <span className="visually-hidden">Loading...</span>
</div>}
          </button>
        </form>
      )}
    </Formik>
    <p>or</p>
    <dir>
    If already registered ? <Link to='/login' style={{textDecoration:"none"}}>Log in </Link>
    </dir>
  </div>
  </div>
)};

export default Register;