import React, {useState} from 'react'
import InputComponent from '../../common/Input';
import Button from '../../common/Button';
import {auth, db,storage} from "../../../firebase";
import {signInWithEmailAndPassword,} from "firebase/auth";
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import { doc, setDoc,getDoc } from 'firebase/firestore';
import { setUser } from "../../../slices/userSlice";
import { toast } from 'react-toastify';


function LoginForm() {
    
const [email,setEmail] = useState("");
const [password,setPassword] = useState("");

const [loading,setLoading] = useState(false);
const dispatch = useDispatch();
const navigate = useNavigate();

const handleLogin = async () =>{
  console.log("Handling Login");
  setLoading(true);
  if(password && password){
  try{
    // login users account
    const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );
      const user = userCredential.user;
      console.log("user",user);

    // saving users details
    const userDoc = await getDoc (doc(db,"users",user.uid));
    const userData = userDoc.data();
   
    // Save data in the redux, call the redux action
    dispatch(
      setUser({
      name: userData.name,
      email: userData.email,
      uid: user.uid,
    })
    );
  //  success message
    toast.success("User Login Successful!");
    setLoading(false);
        navigate("/profile");
    }
  catch(e){
    console.log("error",e);
    setLoading(false);
    toast.error("Please enter correct credentials");
  
}}
else{
  toast.error("Make sure to enter email and password");
  setLoading(false);
}
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