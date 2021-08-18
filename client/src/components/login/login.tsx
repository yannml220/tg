import { Component } from "react";
import { useState } from "react";
import axios from "axios" ;
import { userInfo } from "os";
import './login.css'
import { AnyARecord } from "dns";




export interface LoginProps {
    setUserInfos : any
    setToken : any
}

export default function Login({setUserInfos , setToken }:LoginProps){

    const [ loginFields , setLoginFields ] = useState( {
        username : ''  ,
        password : ''  ,

    } )



    const inputChangeHandler = (event)=>{
        event.preventDefault()
        let fieldName = event.target.name  
        let fieldValue = event.target.value 
        var newFieldsData = { ...loginFields }
        newFieldsData[fieldName] = fieldValue
        setLoginFields(newFieldsData)
        console.log(loginFields)

    }



    const submitHandler =  async (event) => {
        event.preventDefault()
        const user = await loginUser(loginFields)
        const {data } = user 
        const { userInfo}  = data
        console.log(userInfo)
        setUserInfos(userInfo)
        setToken({token : userInfo.accessToken })

    }
    


    const loginUser = async ( credentials:any)=>{

        let User = {
            username : credentials.username,
            password : credentials.password ,
        
        }

     
        
       return  axios.post("http://localhost:5000/API/V1/user/login",  User

       )

    }

    return (
        <div className ="login-wrapper">
            
            <form>
            <label>
            <h1>Username</h1>
            <input type= "text" name ="username"  onChange = { e => inputChangeHandler(e)}  />
            </label>

            <label>
            <h1>Password</h1>
            <input type= "text" name ="password"  onChange = { e => inputChangeHandler(e)}   />
            </label>
            <label>
            <button type ="submit"  onClick = { e=>submitHandler(e)} >sign up</button>
            </label>
            </form>


        </div>
    )
}