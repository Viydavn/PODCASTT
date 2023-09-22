import React from "react";
import "./style.css";

function InputComponent({type, value, state,setState,placeholder,required}){
return (
    <input 
    type = {type} 
    value = {value}
    onChange = {(e) => setState(e.target.value)}
    placeHolder ={placeholder}
    required = {required}
    className = "custom-input"
    />
);
}
export default InputComponent;