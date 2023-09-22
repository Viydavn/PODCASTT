import React,{useState} from "react";
import Header from "../components/common/Header";
import SignupForm from "../components/SignupComponent/SignupForm";
import LoginForm from "../components/SignupComponent/LoginForm";


function SignUpPage (){
const [flag,setFlag]=useState(false);


return (<div><Header />
 <div className="input-wrapper">
    {!flag ? <h1>Signup</h1> : <h1>Login</h1>}
    {!flag ? <SignupForm /> : <LoginForm />}
    {!flag ? <p style={{cursor:"pointer"}} onClick={()=>setFlag(!flag)}>Already have an Account. Click here to login.</p> : <p style={{cursor: "pointer"}} onClick={()=>setFlag(!flag)}>Don't have account. Click here to signup. </p>}
 </div>
 </div>)
}

export default SignUpPage;