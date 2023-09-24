import './App.css';
// import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import { BrowserRouter, Routes, Route, Form } from "react-router-dom";
import SignUpPage from './pages/SignUpPage';
import Profile from './pages/Profile';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import {auth, db} from "./firebase";
import { doc, onSnapshot } from "firebase/firestore";
import { setUser } from './slices/userSlice';
import { useDispatch } from 'react-redux';
import PrivateRoutes from './components/common/PrivateRoutes';
import CreateAPodcastPage from './pages/CreateAPodcastForm';
import PodcastsPage from './pages/Podcasts';


function App() {
  const dispatch = useDispatch();

  useEffect(()=>{
    const unsubscribeAuth = onAuthStateChanged(auth,(user)=>{
      if(user){
        const unsubscribeSnapshot = onSnapshot(
          doc(db,"users",user.uid),
          (userDoc)=>{
            if(userDoc.exists()){
              const userData = userDoc.data();
              dispatch(
                setUser({
                    name: userData.name,
                    email: userData.email,
                    uid: user.uid,
                    // profilePic: userData.profilePic,
                  })
              );
            }
          },
          (error)=>{
            console.error("Error fetching user data:",error);
          }
        );
    
    return ()=>{unsubscribeSnapshot();
  };
}
});
  return()=>{unsubscribeAuth();
  };
},[]);
  return (
    <div className = "App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<SignUpPage />} />
        <Route element ={<PrivateRoutes />}>
        <Route path="/profile" element={<Profile />} />
        <Route path="/create-a-podcast" element={<CreateAPodcastPage />}/>
        <Route path="/podcasts" element={<PodcastsPage />} />
        
        {/* 
         <Route 
        path="/podcast/:podcastId/create-episode" element={<CreateEpisode />} 
        /> */}
        </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
