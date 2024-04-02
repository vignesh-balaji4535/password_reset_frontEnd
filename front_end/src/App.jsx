import { useState } from "react";
import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Home from "./Home";
import { Forgot_Pass } from "./Forgot_Pas";
import Get_OTP from "./Get_OTP";
import New_pass from "./New_pass";

function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [otp,setOtp]=useState(localStorage.getItem("otp"));
  const [mail,setMail]=useState("");
  const [email,setEmail]=useState("")
 
  return (
    <>
     
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home token={token} setToken={setToken}/>} />
          <Route path="/forgot" element={<Forgot_Pass setOtp={setOtp} setMail={setMail}/>} />
          <Route path="/otp" element={<Get_OTP otp={otp} setOtp={setOtp} setEmail={setEmail}/>} />
          <Route path="/newpass" element={<New_pass  otp={otp} mail={mail} email={email} setEmail={setEmail}/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
