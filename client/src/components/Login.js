import React, { useState } from 'react';
import { Link } from 'react-router-dom';
// import Signup from './Signup';
export default function Signin() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const endPoint = "http://localhost:4001/login"

    function login(){
        if (!(email && password)===null ||(email && password)===""){
           
                
                alert("You have not an account. Please sign up")
          }
    else {
        fetch(endPoint, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({email:email, password: password })
        }).then(data => data.json())
        .then(json=> {
            //sessionStorage
            sessionStorage.setItem("token", json.token) 
            //show main body
            window.location.reload();
        })   
    }}

   
    return (
        <div class="container-fluid">
            <p type="bold"> Please sign in</p>
            <div class="form-group">
                <label>Email:<input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <div class="form-group">
                <label>Password:<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
            </div>
            <button  onClick = {()=> login ()}> Log in</button>
            {/* <button  onClick = {()=> <Link href to ="/signup"> </Link>}>  Sign up  </button> */}
         <a href="./Signup"> Sign up </a>
       
         
            </div>

            </div>
    )
}