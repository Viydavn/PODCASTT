import React, { useRef,useEffect, useState } from 'react'
import "./style.css"
import {FaPlay,FaPause,FaVolumeUp,FaVolumeDown, FaVolumeMute} from "react-icons/fa";

function AudioPlayer({audioSrc, image}) {
    const [duration,setDuration] = useState("");
    const[isPlaying, setIsPlaying] = useState(true);
    const[isMute, setIsMute] = useState(false);
    const[volume,setVolume] = useState(1);
    const [currentTime,setcurrentTime] = useState(0);

    const audioRef = useRef();

    const handleDuration = (e) =>{
        setcurrentTime(e.target.value);
        audioRef.current.currentTime = e.target.value;
    }

    const formatTime = (time)=>{
        const minutes = Math.floor(time/60);
        const seconds = Math.floor(time%60);
        return `${minutes}:${seconds<10?"0":""}${seconds}`;
    };


  useEffect(()=>{
    const audio =audioRef.current;
    audio.addEventListener("loadedmetadata",handleLoadedMetaData);
    audio.addEventListener("timeupdate",handleTimeUpdate);
    audio.addEventListener("ended",handleEnded);

    return ()=>{
        audio.removeEventListener("loadedmetadata",handleLoadedMetaData);
        audio.removeEventListener("timeupdate",handleTimeUpdate);
        audio.removeEventListener("ended",handleEnded);
    
    }
  },[]);

    const handleTimeUpdate = ()=>{
        setcurrentTime(audioRef.current.currentTime);
    }


    const handleLoadedMetaData = ()=>{
        setDuration(audioRef.current.duration);
    }
    
    const handleEnded = ()=>{
        setIsPlaying(audioRef.current.duration);
    }

    const handleVolume = (e) =>{
        setVolume(e.target.value);
        audioRef.current.volume =e.target.value;
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
     useEffect(()=>{
        if(isPlaying){
            audioRef.current.play();
        }
        else{
            audioRef.current.pause();
        }
     },[isPlaying,audioSrc]);

     useEffect(()=>{
            if(!isMute)
            {audioRef.current.volume =volume}
            else{
            audioRef.current.volume=0};
     },[isMute]);

  return (
    <div className='custom-audio-player'>
        <img src={image} className='display-image-player'/>
        <audio ref={audioRef} src = {audioSrc}/>
        <p className="audio-btn" onClick={togglePlay}>{isPlaying?<FaPause />:<FaPlay />}</p>
        <div className='duration-flex'>
            <p>{formatTime(currentTime)}</p>
            <input type="range" value = {currentTime} min ={0.00} max = {duration} step={0.01} onChange={handleDuration} className='duration-range' />
            <p>{formatTime(duration-currentTime)}</p>
        </div>
        <div className='volume-flex'>
        <p onClick={toggleMute}>{!isMute?(<FaVolumeUp />):(<FaVolumeMute />)}</p>
        <input type="range" value ={volume} min ={0} max={1}  step = {0.01} onChange={handleVolume} className='volume-range' />
        </div>
    </div>  
  )
}
export default AudioPlayer;