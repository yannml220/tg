import React, { Component } from "react";
import { useState } from "react";
import axios from "axios";


export interface AddformProps {
    listeId : string 
    token : string
}

export default function Addform({listeId , token}: AddformProps){

    const [ formData , setFormData ] = useState({
        libelle : '',
        traduction : '',
        listeId 
    })



    const inputChangeHandler = (event) => {
        event.preventDefault()
        let fieldName = event.target.getAttribute('name')
        let fieldVal = event.target.value
        var newFormData = {...formData}
        newFormData[fieldName] = fieldVal
        setFormData(newFormData)
        console.log(newFormData)
    }


    const submitHandler =  (event) => {
        event.preventDefault()
        console.log('bonjour')
        const newWord = {
            libelle : formData.libelle,
            traduction : formData.traduction ,
            listeId 
        }

        var headersConfig = {

        
            headers : {
            "Authorization" : `Bearer ${token}`},
            'Accept' : 'application/json',
            'Content-Type': 'application/json'
        }
        
        axios.post("http://localhost:5000/API/V1/mots/",  newWord , headersConfig

         )

         setFormData({
             libelle : '',
             traduction : '',
             listeId : null
         })


    }
    

    return (
        <div>
            <form>
                <input type = "text"  name = "libelle" onChange = { (e) => inputChangeHandler(e) } />
                <input type = "text"  name = "traduction" onChange = { (e) => inputChangeHandler(e) } />
                
                <button type = "submit"  name ="addButton" onClick = { (e) => submitHandler(e) } >ajouter</button>
            </form>
        </div>
    )
}