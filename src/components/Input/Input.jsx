import './Input.css'
import { useState, useEffect, useLayoutEffect } from 'react';
function Input(props) {
    //generate random id for input and label

    const [value, setValue] = useState('' || props.value);


    useEffect(()=>{

        console.log(value)

        props.onChangeCallback(value);

    }, [value])

    useEffect(()=>{
        
        if(props.value != ''){
            let i = document.querySelector(`#${props.value}`);
            let label = i.parentNode.querySelector("label");
  
            label.classList.add("focused");
        
            i.classList.add("focused");
        }
    }, [])
  

    function isEmpty(e){
        let value = e.target.value

        props.onChangeCallback(value)

        if (value != ''){
      
            return false
        }else{
       
            return true            
        }


    }
  
    function handleBlur(e) {

        if(isEmpty(e)){
            let label = e.target.parentNode.querySelector("label");
  
            label.classList.remove("focused");
        
            e.target.classList.remove("focused");
        }

    }
  
    function handleFocus(e) {
        if(isEmpty(e)){
            let label = e.target.parentNode.querySelector("label");
  
            label.classList.add("focused");
        
            e.target.classList.add("focused");
        }
    }

    function handleChange(e){


      

        setValue(e.target.value)
    }

    function handleClick(e){


     
    }


    function handleLoad(e){

        isEmpty(e)

        props.onChangeCallback(e)
    }
  
  
    
  
    return (
      <div className="input-wrapper">
  
           <label htmlFor={props.type}  className="input-label">
            {props.displayName}
          </label> 
          <input
          id={props.value}
            value={value}
            onLoad={handleLoad}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onClick={handleClick}
            placeholder={props.placeholder}
            type={props.type}
          />
        
      </div>
    );
    }

Input.defaultProps = {
    isDisplay:false,
    displayValue:'',
    onChangeCallback:()=>{},
    value:''
}

    export default Input