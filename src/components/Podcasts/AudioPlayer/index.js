import React, { useState } from 'react'
import { useRef } from 'react';
import "./style.css"
import {FaPlay,FaPause,FaVolumeUp,FaVolumeDown, FaVolumeMute} from "react-icons/fa";

function AudioPlayer({audiosrc, image}) {
    const [duration,setDuration] = useState("");
    const[isPlaying, setIsPlaying] = useState(true);
    const[isMute, setIsMute] = useState(false);
    const[volume,setVolume] = useState(1);
    const [currentTime,setcurrentTime] = useState()
    const audioRef = useRef();

    const handleDuration = (e) =>{
        setDuration(e.target.value);
    }
    const handleVolume = (e) =>{
        setVolume(e.target.value);
    }

    const togglePlay=()=>{
        if(isPlaying){
            setIsPlaying(false);
        }
        else{
            setIsPlaying(true);
        }
    }

    const toggleMute=()=>{
        if(isMute){
            setIsMute(false);
        }
        else{
            setIsMute(true);
        }
    }

  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player'/>
        <audio ref={audioRef} src = {audiosrc}/>
        <p onClick={togglePlay}>{isPlaying?<FaPause />:<FaPlay />}</p>
        <div className='duration-flex'>
            <p>0.00</p>
            <input type="range" onChange={handleDuration} className='duration-range' />
            <p>-21.00</p>
            
        </div>
        <div className='volume-flex'>
        <p onClick={toggleMute}>{!isMute?<FaVolumeUp />:<FaVolumeMute />}</p>
        <input type="range" onChange={handleVolume} className='volume-range' />
        </div>

    </div>
  )
}

export default AudioPlayer