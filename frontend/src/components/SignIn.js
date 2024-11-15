import React,{useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom'



const SignIn=()=>{
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");

    const navigate=useNavigate();
    useEffect(()=>{

        const auth = localStorage.getItem('user');
        if(auth){
            navigate('/');
        }else{
            
        }
        
    },[])

    const handleLogin=async ()=>{

        console.log(email,password);
        let result=await fetch('http://localhost:5000/login',{
            method:'Post',
            body:JSON.stringify({email,password}),
            headers:{
                'Content-Type':'application/json',
              }

        });
        result=await result.json();
        console.log(result)
        if(result.name){

            localStorage.setItem("user",JSON.stringify(result))
            navigate('/');

        }else{
            alert("please enter valid email or password");
        }


    }
    return(
        <div className='login'>
            <h1>Login</h1>
            <input className='inputBox' type='text' placeholder='Enter email' value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input className='inputBox' type='password' placeholder='Enter Password' value={password} onChange={(e)=>setPassword(e.target.value)}/>
            <button className='login-btn' type='button' onClick={handleLogin}>Login</button>

        </div>
    )
}

export default SignIn;