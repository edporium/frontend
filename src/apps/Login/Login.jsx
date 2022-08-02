import Header from "../../components/Header/Header.jsx";
import Input from "../../components/Input/Input.jsx";
import Button from "../../components/Button/Button.jsx";
import "./Login.css";
import { useState, useEffect, useLayoutEffect } from "react";
import LoginData from '../../schemas/LoginSchema.js';
import Parent from '../Parent/Parent.jsx';
import Admin from '../Admin/Admin.jsx'
import axios from "axios";
import {useNavigate} from 'react-router-dom'
let displayText = "Sign In Here!";



function Login(props) {

  let navigate = useNavigate()


  const [username, setUsername] = useState('');

  const [password, setPassword] = useState('');

  function handleUsername(v){
  
    setUsername(v)

    

  }

  function handlePassword(v){

    setPassword(v)

  }

  function handleSubmit(){
    let u = username;
    let p = password;
    console.log(u,p)
    axios.post('http://40.77.94.144:5000/user/authenticate', {username:u, password:p}).then((res)=>{



      if(res.status == 200){
        if(res.data.type === 'admin'){
          navigate('/admin')
        }
        else if(res.data.type === 'parent'){
          navigate(`/parent/${res.data.parentId}`)
        }

      }else{
        console.log('failed to login')
      }
    })

  }

  function handleForgotPassword(){}

  function handleForgotPassword(){}

  return (

    

    <>
    <Header styles={{position:'relative'}} />
    <div className="login-container">

      
          <div className="login">
          
          <div className="login-title">{displayText}</div>
          <div className="login-input-container">
            <Input value='' onChangeCallback={handleUsername} displayName="Username" />
            <Input value='' onChangeCallback={handlePassword} displayName="Password" />
          </div>
  
          <div className="login-button">
            <Button onClickCallback={handleSubmit}>Login</Button>
          </div>
  
          <div className="forgot-password-link-container">
            <div onClick={handleForgotPassword} className="forgot-password-link">- Forgot Password -</div>
          </div>
        </div>
       

      
    
     
    </div>
    </>
    
  );
}

export default Login;


