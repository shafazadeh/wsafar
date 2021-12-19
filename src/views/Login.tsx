
import React, { useState, useEffect } from "react";
import MainContainer from "containers/MainContainer";
import Axios from "axios";
import { navigate } from "hookrouter";
import "assests/style/login.css";
import userSvg from "assests/img/user.svg";
import Toastify from 'toastify-js';
const Login = (props: any) => {

  const [userName, setUserName] = React.useState<string>();
  const [password, setPassword] = React.useState<string>();
  const [loading, setLoading] = React.useState<boolean>(false);


  useEffect(() => {
    if(MainContainer.state.isLogin || localStorage.getItem("LOGINTOKEN")){
      navigate('/dashboard',true)
    }
  },[])

  const login=()=>{
    try {
      let login={
        "username":userName,
        "password":password
      }
      setLoading(true)
      Axios.post("http://front-api-test.wsafar.com/users/login",login).then((res:any)=>{
        setLoading(false)
        if(res.data && res.data.result){
          localStorage.setItem("LOGINTOKEN",res.data.result.access_token)
          MainContainer.setIsLogin(true)
          // navigate('/dashboard',true)
          window.location.href="/dashboard"
        }
        
      });

   

    } catch (error) {
      console.log({error})
      Toastify({
        text: "خطا در پاسخ گویی!",
        duration: 10000,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        close: false,
        gravity: "bottom", 
        position: "left", 
        stopOnFocus: true, 
        backgroundColor:"#ff0000d1",
       
      }).showToast();
    }

  }

  return (
  <div className="loginForm">
     <div id="formContent">
   
      <div className="fadeIn first">
        <img src={userSvg} id="icon" alt="User Icon" />
      </div>

        <input type="text" id="login" className="fadeIn second"
         name="login" placeholder="نام کاربری"
         onChange={(e)=>setUserName(e.target.value)}
         />
        <input type="text" id="password" className="fadeIn third" name="login" 
         onChange={(e)=>setPassword(e.target.value)}
        placeholder="پسورد"/>
       
        <input type="button" onClick={()=>login()} className={(!userName || !password)? "fadeIn fourth btn-disabled" : "fadeIn fourth"} 
        disabled={!userName || !password}
        value="ورود"/>
        {loading && <div className="spinner-border" role="status">
          <span className="sr-only"></span>
        </div>}
    </div>
  </div>
  );
};

export default Login;
