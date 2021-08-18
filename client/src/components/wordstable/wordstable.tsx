import { Component } from "react";
import  "./wordstable.css";
import { wordObject } from "../../interfaces";
import Readonlyrow from "../readonlyrow/readonlyrow";
import Editablerow from "../editablerow/editablerow";
import { Fragment } from "react";
import { useState } from "react";


export interface WordstableProps {
    headers? : any[];
    data : wordObject[];
}



export default function Wordstable( { data}: WordstableProps ){

    const  [ editWordId , setEditWordId] = useState(null)
    const  [ prefilledEditWordFields , SetPrefilledEditWordFields ]  = useState(null
      

    )

    const keys = data[0] && Object.keys(data[0])
    const headers  = [ "id" , "mot" , "traduction" , "date d'ajout", "id liste" , "actions" ]
    const white = "white"
    const grey = "grey"
   
    const editHandler = (event , wordEdited:wordObject )=>{
        event.preventDefault()
        setEditWordId(wordEdited.id)
        SetPrefilledEditWordFields(wordEdited)
    }


    const cancelHandler = ( event ) =>{
        event.preventDefault()
        setEditWordId(null)
    }
    console.log(prefilledEditWordFields)
    return (
        <div className="App">
      
      <div className = "table-container">
        <form>
        <table className = "fixed-table" cellPadding= {15} cellSpacing ={1}>
          <thead className = "thead" >
            <tr >
              { headers.map( (header , headerIdx) =>{
               return ( <th key= {headerIdx} >{header}</th> )
              } ) }
            </tr>
          </thead>

          <tbody >
            { 
            
            data.map( (element, headerIdx ) =>(
              <Fragment>{
                editWordId == element.id ?  <Editablerow  key = {headerIdx}  color = "" fieldsData = {element}  headers = {keys} cancelHandler = {cancelHandler} prefilledFieldData = {prefilledEditWordFields}></Editablerow>
                : <Readonlyrow  key = {headerIdx}  color = "" fieldsData = {element}  headers = {keys} editHandler = {editHandler} ></Readonlyrow>
                }
               
               
               </Fragment>
            )
            )  }  

          </tbody>
        </table>
        </form>
      </div>
      </div>
    );
}
