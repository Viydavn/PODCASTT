import React, {useState} from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';

function SignupForm() {
    
const [fullName,setFullName] = useState("");
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");
const [confirmPassword,setConfirmPassword] = useState("");

const handleSignup = () =>{
    console.log("Handling Signup");
};

  return (
    <>
    <InputComponent
  state = {fullName}
  setState = {setFullName}
  placeholder = "Full Name"
  type = "text"   
 />
 <InputComponent
  state = {email}
  setState = {setEmail}
  placeholder = "Email"
  type = "email"   
 />
 <InputComponent
  state = {password}
  setState = {setPassword}
  placeholder = "Password"
  type = "password"   
 />
 <InputComponent
  state = {confirmPassword}
  setState = {setConfirmPassword}
  placeholder = "Confirm Password"
  type = "password"   
 />

 <Button text = {"Signup"} onClick={handleSignup}></Button>
    
    </>
  )
}

export default SignupForm;