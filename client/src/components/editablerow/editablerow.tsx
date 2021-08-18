import { Component } from "react";
import { wordObject } from "../../interfaces";
import  "./editablerow.css";
import { useState } from "react";
import axios from "axios";
import { async } from "q";


export interface EditablerowProps{
    fieldsData : wordObject ;
    headers : any[] ;
    color : string ;
    cancelHandler : any ;
    prefilledFieldData : wordObject;
}

export default function Editablerow({ fieldsData , headers , color , cancelHandler , prefilledFieldData} : EditablerowProps){

        const   [ editableRowField , setEditableRowField ] = useState({
            libelle : prefilledFieldData.libelle ,
            traduction : prefilledFieldData.traduction ,
        }
            

        )



        const inputChangeHandler = (event) => {
            event.preventDefault()
            let fieldName = event.target.getAttribute('name')
            let fieldVal = event.target.value
            var newFieldData = {...editableRowField}
            newFieldData[fieldName] = fieldVal
            setEditableRowField(newFieldData)
            console.log(newFieldData)
        }



        const  saveHandler = async (event) => {
            event.preventDefault()
            const updatedWord = {
                 
                libelle : editableRowField.libelle,
                traduction : editableRowField.traduction ,
               
            }
        

           await axios.put(`http://localhost:5000/API/V1/mots/${fieldsData[headers[0]]}`,  updatedWord

         )
            
            var headersConfig = {
                headers : { "Content-Type" : "application/x-www-form-urlencoded" }
            }


            


            setEditableRowField({
                libelle : prefilledFieldData.libelle ,
                traduction : prefilledFieldData.traduction ,
               

            })

            
        }


        return( <tr  color = {color} >   
                <td>{fieldsData[headers[0]]}</td>
                <td><input size= {10}  id="input-libelle" type ="text" required = {true} name ="libelle" value={editableRowField.libelle} onChange = {e=>inputChangeHandler(e)} /></td>
                <td><input size={10} type ="text" required = {true} name ="traduction" value ={editableRowField.traduction} onChange = {e=>inputChangeHandler(e)} /></td>
                <td>{fieldsData[headers[3]]}</td>
                <td>{fieldsData[headers[4]]}</td>
                <td><button onClick = { e=> cancelHandler(e) }>cancel</button><button onClick = { (e)=> saveHandler(e) } >save</button></td>
                </tr>
            )
    
}