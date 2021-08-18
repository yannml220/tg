import { Component } from "react";
import { Link} from "react-router-dom"
import './navbar.css'
import {Translate , Home} from '@material-ui/icons';

export default function Navbar(){


    return (
        <div className ="navbar">
            <div className = "navbar-wrapper">
            <div className ="navbar-left">
            
            <ul>
                <li><Link to = "/"  style = {{color : "white" , textDecoration : "none"}}><Home/></Link></li>
                <li><Link to = "/translation" style = {{color : "white" , textDecoration : "none"}}><Translate/></Link></li>
                <li><Link to = "/search" style = {{color : "white" , textDecoration : "none"}}>profil</Link></li>
                <li><Link to = "/search" style = {{color : "white" , textDecoration : "none"}}>quizz</Link></li>
            </ul>
            </div>
            <div className="navbar-right">
            right
            </div>
            </div>
        </div>
    )
}