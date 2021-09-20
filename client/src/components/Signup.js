import React, {useState, useEffect} from 'react';
import validator from 'validator';
import App from '../App';
export default function Signup(){
    const [first_name, setFirst_name] = useState ('')
    const [last_name, setLast_name] = useState ('')
    const [email, setEmail] = useState ('')
    const [password, setPassword] = useState ('')
    const endPoint = "http://localhost:4001/register";

    useEffect(()=>{

    },[])
    
    function register(){
        fetch (endPoint, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({first_name: first_name, last_name:last_name, email: email, password:password})

        }).then(data => data.json())
        .then(json=> {
            //sessionStorage
            sessionStorage.setItem("token", json.token) 
            //show main body
            // window.location.reload();
            alert("You have registered already. Please sign in to use")
        })
    }
    return (
        <div class="container-fluid">
        <div class="form-group">
           
            <label>First name:
            <input type="text" className="form-control" value={first_name} onChange={(e) => setFirst_name(e.target.value)} />
            </label> <br/>
            <label>Last name:
            <input type="text" className="form-control" value={last_name} onChange={(e) => setLast_name(e.target.value)} />
            </label> <br/>
          
            <label>Email:
            <input type="text" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
            </label> <br/>
           
            <label>Password:<input type="password" className="form-control" value={password} onChange={(e) => setPassword(e.target.value)} />
            </label> <br/>
         
            <button onClick = {()=> register()}> Sign up </button>
        </div>
        </div>
    )
}
// export default App;