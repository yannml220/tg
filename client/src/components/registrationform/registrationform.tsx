import { Component } from "react";
import { useState } from "react";
import axios from "axios" ;

export default function Registrationform(){

    const [ registrationFields , setRegistrationFields ] = useState( {
        username : ''  ,
        password : ''  ,
        email : ''
    } )



    const inputChangeHandler = (event)=>{
        event.preventDefault()
        let fieldName = event.target.name  
        let fieldValue = event.target.value 
        var newFieldsData = { ...registrationFields }
        newFieldsData[fieldName] = fieldValue
        setRegistrationFields(newFieldsData)
        console.log(registrationFields)

    }



    const submitHandler =  (event) => {
        event.preventDefault()
       
        const newUser = {
            username : registrationFields.username,
            password : registrationFields.password ,
            email : registrationFields.email ,
        }

     
        
        axios.post("http://localhost:5000/API/V1/user/register",  newUser

         ).then( (result) => {
             console.log(result)
         } )


    }
    




    return (
        <div>
            <form>
            <input type= "text" name ="username"  onChange = { e => inputChangeHandler(e)}  />
            <input type= "text" name ="password"  onChange = { e => inputChangeHandler(e)}   />
            <input type= "text" name ="email"  onChange = { e => inputChangeHandler(e)}   />
            <button type ="submit"  onClick = { e=>submitHandler(e)} >sign up</button>

            </form>


        </div>
    )
}