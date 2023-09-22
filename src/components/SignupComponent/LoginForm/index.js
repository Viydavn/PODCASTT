import React, {useState} from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';

function LoginForm() {
    
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const handleLogin = () =>{
    console.log("Handling Login");
};

  return (
    <>
    
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
 <Button text = {"Login"} onClick={handleLogin}></Button>
    
    </>
  )
}

export default LoginForm;