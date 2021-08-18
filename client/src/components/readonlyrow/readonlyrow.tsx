import { Component } from "react";
import { wordObject } from "../../interfaces";
import  "./readonlyrow.css";
import axios from "axios";


export interface ReadonlyrowProps {
    fieldsData : wordObject ;
    headers : any[] ;
    color : string ;
    editHandler : any ;
}

export default function Readonlyrow( { fieldsData , headers , color , editHandler } : ReadonlyrowProps){


            //console.log(fieldsData)

            const deleteHandler = async (event)=>{

                event.preventDefault()
                await axios.delete(`http://localhost:5000/API/V1/mots/${fieldsData[headers[0]]}`)


            }

          return( <tr  color = {color} >   
                <td>{fieldsData[headers[0]]}</td>
                <td>{fieldsData[headers[1]]}</td>
                <td>{fieldsData[headers[2]]}</td>
                <td>{fieldsData[headers[3]]}</td>
                <td>{fieldsData[headers[4]]}</td>
                <td><button  onClick = { e=> editHandler(e,fieldsData)}>edit</button><button onClick = {e => deleteHandler(e)} >delete</button></td>
                </tr>
            )
}