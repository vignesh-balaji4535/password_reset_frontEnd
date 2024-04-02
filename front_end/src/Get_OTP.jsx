import axios from 'axios';
import React, { useState } from 'react';
import OtpInput from 'react-otp-input';
import { useNavigate } from 'react-router-dom';

export default function Get_OTP({otp,setOtp,setEmail}) {
  const [pinotp,setPinotp]=useState("")
  const [spinner,setSpinner]=useState(false);
  const navigate = useNavigate();
  const [errpass,setErrpass]=useState('')




  const verify=async()=>{
    // console.log(otp)
    try {
      const response = await axios.post(`https://password-reset-flow-47hu.onrender.com/Api/user/forgot/${otp}`,{otp:pinotp})

      if(response){
     setEmail(response.data.email)

     navigate("/newpass");
      }

     
      
    } catch (error) {
      console.log(error)

      if(error.response.status===400){
        setErrpass(error.response.data)
       }
    }

  }
  return (
    <div className="container d-flex justify-content-center align-items-center" style={{height:"100vh"}}>
    <div className=' rounded-5 p-2' style={{backgroundColor:"rgb(190, 189, 189)",width:"25rem",boxShadow:"25px 25px 25px black"}}>
  
    <h3>OTP Verification</h3>
    <br />
    <br />
    <div>
    <OtpInput
      inputStyle={{width:"40px",height:"40px"}}
      value={pinotp}
      onChange={setPinotp}
      numInputs={4}
      renderSeparator={<span>-</span>}
      renderInput={(props) => <input {...props} />}
    />
    
          <p style={{color:"red",fontSize:"12px",marginBottom:0}}>{errpass}</p>
    
    </div>

    <br />
    <br />

    <button className='btn btn-primary' onClick={verify}  >
    Verify OTP {spinner&&<div className="spinner-border text-light mx-2 " role="status"  style={{width:"20px",height:"20px"}}>
<span className="visually-hidden">Loading...</span>
</div>}
      </button>
      </div>
      </div>
  );

}