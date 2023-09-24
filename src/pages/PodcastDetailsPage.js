import React, { useEffect ,useState} from 'react'
import Header from '../components/common/Header';
import { useNavigate, useParams } from 'react-router-dom';
import {db,auth} from "./../firebase";
import { doc, getDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import Button from '../components/common/Button';



function PodcastDetailsPage() {
  const { id } = useParams();
  const [podcast,setPodcast] = useState({});
  const navigate = useNavigate();
  console.log("ID", id);

  useEffect(()=>{
    if(id){
        getdata();
    }

  },[id]);
  const getdata = async() => { 
    try{
      const docRef = doc(db, "podcasts",id);
      const docSnap = await getDoc (docRef);
  
      if (docSnap.exists()){
        console.log("Document data:",docSnap.data());
        setPodcast({id:id, ...docSnap.data()});
        toast.success("Poadcast Found");
    
      }else{
        //docSnap.data() will be undefined in this case;
        console.log("No such document!");
        toast.error("No such document!");
        navigate("/podcasts");
      }
    
    }
    catch(e){
      toast.error(e.message);
    }
  };

return (
  <div>
    <Header />
    <div className="input-wrapper" style={{marginTop : "0rem"}}>
      {podcast.id &&(
         <> <div style={{
          display:"flex", justifyContent:"space-between",alignItems:"center", width:"100%"
         }}>
          <h1 className="podcast-title-heading">{podcast.title}</h1> 
         {podcast.createdBy === auth.currentUser.uid &&  <Button text={"Create Episode"} onClick={()=>{navigate(`/podcast/${id}/create-episode`)}} width="200px"/>}
          </div> 
          <div className='banner-wrapper'><img src = {podcast.bannerImage}></img></div>
          <div className='podcast-description'>{podcast.desc}</div>
          <h1 className='podcast-title-heading'>Episodes</h1>
          </>
    ) } 
          </div>
 
      </div>
);
}

export default PodcastDetailsPage;