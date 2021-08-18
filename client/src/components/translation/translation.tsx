import { Component } from "react";
import { useState } from "react";
import axios from "axios"
import './translation.css'
import Matches from "../matches/matches";

export default function Translation(){

    const [field , setField] = useState('')
    const [translatedWord , setTranslatedWord] = useState(null)


    const inputChangeHandler = (event)=>{
        event.preventDefault()
      
        const fieldValue = event.target.value
        setField(fieldValue)
        console.log(field)
        
    }


    const submitHandler = (event)=>{
        event.preventDefault()
        axios
      .get(`http://localhost:5000/API/V1/translation/${field}`)
      .then(response => {
            setField('')
            const {word:{responseData}} = response.data
            setTranslatedWord(responseData)
            console.log(translatedWord)
      })
    }


    return(
        <div className ="main-container" style = {{backgroundColor : "#525252"}}>
                <div className= "input-container" style ={{backgroundColor:"#525252" }}>
                <input placeholder="Write your text there" name= "searchedWord"  value = {field}  onChange = {e => inputChangeHandler(e)} style={{  width: "80%", height : "70px" , fontSize :"1.5em"}}  />
                <button className= "translation-buttons" type ="submit" onClick = {e=>submitHandler(e)}  style={{  width: "10%"}} >translate</button>
                <button className= "translation-buttons" type="submit" style={{  width: "10%"}} ></button>
                </div>
                <Matches matchesList={[]}></Matches>
            <div className ="content-box">
                
            </div>


        </div>

    )
}