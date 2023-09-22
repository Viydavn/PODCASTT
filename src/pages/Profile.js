import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import {auth,db} from "../firebase"
import Header from '../components/common/Header';
import Button from '../components/common/Button';
import { toast } from 'react-toastify';
import { signOut } from 'firebase/auth';

function Profile() {
  const user = useSelector((state)=>state.user.user);
  console.log("My User", user);

  function handleLogout(){
  if(!user){
return <p>Loading...</p>;
  }
  signOut(auth).then(()=>{
    toast.success("User Logged Out!");
})
.catch((error)=>{
    toast.error(error.message);
});
};
    return (
    <div>
        <Header />
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
        <Button text = {"Logout"} onClick={handleLogout}/>
    </div>
  )
}

export default Profile;