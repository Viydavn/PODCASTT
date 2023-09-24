import React, { useState } from "react";
import Header from "../components/common/Header";
import { useNavigate, useParams } from "react-router";
import { useDispatch } from "react-redux";
import InputComponent from "../components/common/Input";
import FileInput from "../components/common/Input/FileInput";
import { toast } from "react-toastify";
import Button from "../components/common/Button";
import { storage } from "../firebase";
import { getDownloadURL, uploadBytes,ref } from "firebase/storage";
import { addDoc, collection } from "firebase/firestore";
import { db,auth } from "../firebase";

function CreateAnEpisodePage() {
  const { id } = useParams();

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [audioFile, setAudioFile] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const audiofileHandle = (file) => {
    setAudioFile(file);
  };

  const handleSubmit = async () => {
    setLoading(true);
    if ((title, desc, audioFile, id)) {
      try {
        const audioRef = ref(
          storage,
          `podcast-episodes/${auth.currentUser.uid}/${Date.now()}`
        );
        await uploadBytes(audioRef, audioFile);
        const audioURL = await getDownloadURL(audioRef);
        const episodeData = {
          title: title,
          description: desc,
          audioFile: audioURL,
        };

        await addDoc(
          collection(db, "podcasts", id, "episodes"),
          episodeData
        );
        console.log(audioURL);
        
        console.log(episodeData);
        
        console.log("Sucess");
        toast.success("Episode Created!!!");
        setLoading(false);
        navigate (`/podcast/${id}`);
        setTitle("");
        setDesc("");
        setAudioFile("");
      } catch (e) {
        toast.error(e.message);
        setLoading(false);
      }
    } else {
      toast.error("All Files Should Be There");
      setLoading(false);
    }
  };
  return (
    <div>
      <Header />
      <div className="input-wrapper">
        <h1>Create An Episode</h1>

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
          accept={"audio/*"}
          id="audio-file-input"
          fileHandleFnc={audiofileHandle}
          text="Upload Audio File"
        />

        <Button
          text={loading ? "Loading . ." : "Create Episode"}
          disable={loading}
          onClick={handleSubmit}
        ></Button>
      </div>
    </div>
  );
}

export default CreateAnEpisodePage;
