import React, { useState } from 'react';
import { Formik } from 'formik';
import { useNavigate,Link } from 'react-router-dom';
import axios from "axios"


const Login = () => {
  const [sipnner,setSpinner]=useState(false)
  const [err,setErr]=useState('')
  const [errpass,setErrpass]=useState('')
    const navigate=useNavigate();
    const [reload,setReload]=useState(false);


 
    
    return (
    
      <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
      <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
    
    <h4>LOGIN PAGE</h4>
    <Formik
      initialValues={{ email: '', password: '' }}
      validate={values => {
        const errors = {};
        if(!values.password){
          errors.password="Required"
        }
        if (!values.email) {
          errors.email = 'Required';
        } else if (
          !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={ async(values, { setSubmitting }) => {
        setSpinner(true);
          setSubmitting(false);
      
       try {
        let response =await axios.post("https://password-reset-flow-47hu.onrender.com/Api/user/login",values)
        const token=response.data;
        localStorage.setItem('token',token);
        setReload(!reload)
        navigate("/home")

      } catch (error) {
        console.log(error.response.data)
        setSpinner(false);

        if(error.response.status===401){
          setErr(error.response.data)
        }else if(error.response.status===400){
          setErrpass(error.response.data)

        }

     
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
            type="email"
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.email}
            autoComplete='email'
            
          />
          <br />
          {errors.email && touched.email && errors.email}
          <p style={{color:"red",fontSize:"12px",marginBottom:0}}>{err}</p>
           <br />
           
          <input
            type="password"
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            value={values.password}
            autoComplete='current-password'

          />
          <br />
          {errors.password && touched.password && errors.password}
          <p style={{color:"red",fontSize:"12px",marginBottom:0}}>{errpass}</p>
          <br />
          <div>
   <Link to="/forgot"> Forgot password ?</Link>
          </div>

          <br />
          <br />
          <button className='btn btn-primary' type="submit" disabled={isSubmitting} >
            Login {sipnner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
  <span className="visually-hidden">Loading...</span>
</div>}
          </button>
        </form>
      )}
    </Formik>
    <p>or</p>
    <div>
    Don't have an account? <Link to="/"> Sign up</Link>
  </div>
  
  </div>
  </div>
  
)
}

export default Login