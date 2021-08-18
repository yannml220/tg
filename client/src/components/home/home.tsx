import { Component } from "react";

import { useState , useEffect } from 'react';
import axios from 'axios'
import Wordstable from "../wordstable/wordstable";
import { object, string } from 'joi';
import { wordObject } from '../../interfaces'
import Addform from "../addform/addform";
import Registrationform from "../registrationform/registrationform";
import Loginform from "../loginform/loginform";


export  interface HomeProps{
  token : any
  setToken : any
  userInfos : any
  
}

const getAllWords = () => {
 /* var headersConfig = {

        
    headers : {
    "Authorization" : `Bearer ${user && user.accessToken}`},
    'Accept' : 'application/json',
    'Content-Type': 'application/json'
    }*/

  return axios.get('http://localhost:5000/API/V1/mots/')
   .then( response => {
   const { data } = response.data
     console.log(data)
     return data
     
   }).catch((error)=>{
       console.log(console.error)
       
   })
 }



  export default function Home({ token, setToken , userInfos }:HomeProps) {
  

  
  const [ words , setWords ] = useState([])
  const [filter , setFilter] = useState('')

  const [ isLoggedIn , setIsLoggedIn ] = useState(false)
  
  
  


  

    useEffect( ()=>{
       getAllWords().then((apiWorlds:wordObject[])  =>{
         setWords(apiWorlds)
         
       })
      
    } , [] )


  

    const filterRows = (words: wordObject[]) =>{
        return words.filter( word => word.libelle.toLowerCase().indexOf( filter.toLowerCase() ) > -1  || 
        word.traduction.toLowerCase().indexOf( filter.toLowerCase() ) > -1
        )
    }

    console.log(userInfos)


    const disconnectionHandler = (event)=> {
        event.preventDefault()
        token && setToken(null)
    }
   
  return (


    <div className="App">
     <h1>home</h1>
    <button  onClick = {e =>disconnectionHandler(e)} >Logout</button>
      <div>
        <input type = 'text' value = {filter} name = "filter"  onChange= { (e)=> setFilter( e.target.value ) } />
      </div>
      
      <Wordstable data = {filterRows(words)} ></Wordstable>
     

      
    
      <Addform listeId = {userInfos && userInfos.listeId} token = {userInfos && userInfos.accessToken} ></Addform>
    </div>
  );
}
