import React from "react"
import './Form.css'
import {useState, useEffect, useContext} from 'react'

export function Form(props){



    function handleChange(e){

    }


    return(
    <div className="page-form">
        <PageController title={props.title} handleSubmit={props.handleSubmit}>
            {props.children}
        </PageController>
    </div>)
}





function PageController(props){

    const [currentPageNumber, setCurrentPageNumber] = useState(0);

    const [endFlag, setEndFlag] = useState(false);

    function handleNextPage(){
        setCurrentPageNumber((prev)=>{
            if(prev != props.children.length - 1){

                if(prev + 1 === props.children.length - 1){
                    setEndFlag(true);
                }
                return prev + 1
            }else{
                
                return prev
            }
        });
    }

    function handlePreviousPage(){

        setEndFlag(false)
        setCurrentPageNumber((prev)=>{
            
            if(prev != 0){
                
                return prev - 1
            }else{
                return prev
            }
        
        })
    }


    return(
        <div className="page-controller">
            <div className="page-title">{props.title || ''}</div>
            <div className="page-container">
                {props.children[currentPageNumber]}
            </div>
            <div className="page-controller-controls">
                <button id='back-button' onClick={handlePreviousPage}>Back</button>
                {
                    endFlag?(<button onClick={()=>{props.handleSubmit()}}>Submit</button>):(

                        <button id='next-button' onClick={handleNextPage}>Next</button>
                    )

                }
                    
            </div>
        </div>
    )
}


export function Page(props){

    return(
    <div className="page">
        {props.children}
    </div>)
}


