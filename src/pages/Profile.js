import React,{useEffect,useState} from 'react'
import { useSelector,useDispatch } from 'react-redux';
import { setUser } from '../slices/userSlice';
import {auth,db} from "../firebase"
import Header from '../components/common/Header';

function Profile() {
  const user = useSelector((state)=>state.user.user);
  console.log("My User", user);

//   if(user){
// return <p>Loading...</p>;
//   }
    return (
    <div>
        <Header />
        <h1>{user.name}</h1>
        <h1>{user.email}</h1>
        <h1>{user.uid}</h1>
    </div>
  )
}

export default Profile;