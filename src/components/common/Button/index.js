import React from "react";
import "./style.css";


function Button ({text,onClick,disabled,width}){
    return <div onClick={onClick} className="custom-btn" style = {{width}} disabled={disabled} >
        {text}</div>;
}

export default Button;