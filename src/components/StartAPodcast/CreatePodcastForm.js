import React, {useState} from 'react'
import InputComponent from '../common/Input'
import Button from '../common/Button';
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import FileInput from '../common/Input/FileInput';


function CreatePodcastForm() {

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [displayImage, setDisplayImage] = useState("");
    const [bannerImage, setBannerImage] = useState("");
    
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = ()=>{
        if(title && desc && displayImage && bannerImage){
                //1. Upload files. Get downloaded links.
                // 2. create a new doc in a new collection call podcast.
                // 3 save this new podcast episodes state in our podcast.
        }else{
            toast.error("Please Enter All Values");
        }
    }
 
    const displayImageHandle = (file)=>{
        setDisplayImage(file);
    }

    const bannerImageHandle = (file)=>{
        setBannerImage(file);
    }

  return (
    <div>
        <>
      <InputComponent
        state={title}
        setState={setTitle}
        placeholder="Title"
        type="text"
        required={true}
      />
     
     <InputComponent
        state={desc}
        setState={setDesc}
        placeholder="Description"
        type="text"
        required={true}
      />
      <br />
      <FileInput 
        accept={"image/*"}
        id="display-image-input"
        fileHandleFnc={displayImageHandle}
        text = "Display Image Upload"
    />
<br />
    <FileInput
        accept={"image/*"}
        id="banner-image-input"
        fileHandleFnc={bannerImageHandle}
        text = "Banner Image Upload"
    />
<br />
{/* THis file uploding is OK but lets make custom below this */}
       {/* <InputComponent
        state={bannerImage}
        setState={setBannerImage}
        placeholder="Banner Image"
        type="file"
        required={true}
      />   */}

      
    
      <Button
        text={loading ? "Loading . ." : "Create Podcast"}
        disable={loading}
        onClick={handleSubmit}
      ></Button>
    </>
    </div>
  )
}

export default CreatePodcastForm