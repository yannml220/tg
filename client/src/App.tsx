import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter , Switch , Route , Link  } from  'react-router-dom'
import Home from './components/home/home';
import Login from './components/login/login';
import { useState  } from 'react';
import useToken from './components/useToken';
import { userInfo } from 'os';
import Navbar from './components/navbar/navbar';
import Translation from './components/translation/translation';


export default function App(){


  const { token , setToken } = useToken()
  const [userInfos , setUserInfos] = useState(null)
  const [isLoggedIn , setIsLoggedIn] = useState(false)

  console.log(token)


  if(!token){
    return( 
      <div>
      
      <Login setToken = {setToken} setUserInfos = {setUserInfos} ></Login>
      </div>
    )
  }


  
 

  return (
    
      <BrowserRouter>
      <Navbar/>
      <div>
      <Switch>
        <Route  path = "/" exact >
          <Home userInfos = {userInfos}  token = {token} setToken = {setToken} ></Home>
        </Route>
        <Route  path = "/login" exact >
          <Login setUserInfos = {setUserInfos} setToken = {setToken}></Login>
        </Route>

        <Route path = "/translation" exact>
          <Translation></Translation>
        </Route>

      </Switch>
      </div>
      </BrowserRouter>

    
  )
}
