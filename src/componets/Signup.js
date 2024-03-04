import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";


export default function Signup() {
    const [credentials, setCredentials] = useState({name: "", email: "", password: "", cpassword: ""})
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    
  const handleSubmit = async (e) => {
    e.preventDefault()
    const response = await fetch('http://localhost:5000/api/auth/createuser', {
    method: "POST",
            mode: "cors", 
            cache: "no-cache",    
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json"              
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer",
            body: JSON.stringify({name: credentials.name, email: credentials.email, password: credentials.password}), 
          });
          const json = await response.json(); 
          console.log(json)
          if (credentials.password === credentials.cpassword) {
              //save token to localStorage and redirect
              localStorage.setItem('token', json.token)
              navigate("/")  
          } else {
            alert("Password didn't Match")
          }

          
  } 

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" value={credentials.name} onChange={onChange} name="name" id="name" aria-describedby="emailHelp" required/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" required/>
                
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password} onChange={onChange} name="password" id="password" required/>
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control"  value={credentials.cpassword} onChange={onChange} name="cpassword" id="cpassword" required/>
            </div>
            <button type="submit" className="btn btn-primary">SignUP</button>
    </form>
    </div>
  )
}
