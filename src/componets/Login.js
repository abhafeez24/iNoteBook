import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";

export default function Login(props) {
    const [credentials, setCredentials] = useState({email: "", password: ""})
    const navigate = useNavigate();

    const onChange = (e) => {
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }

    const handleSubmit = async (e)=> {
        e.preventDefault();
        const response = await fetch("http://localhost:5000/api/auth/loginuser", {
            method: "POST",
            mode: "cors", 
            cache: "no-cache",    
            credentials: "same-origin", 
            headers: {
              "Content-Type": "application/json"              
            },
            redirect: "follow", 
            referrerPolicy: "no-referrer",
            body: JSON.stringify({email: credentials.email, password: credentials.password}), 
          });
          const json = await response.json(); 
          console.log(json)
          if(json.success) {
            //save token to localStorage and redirect
            localStorage.setItem('token', json.token)
            navigate("/")
            props.showAlert('LoggedIn Successfully', "success")
          } else {
            alert("Invalid Credentials")
            props.showAlert("Invalid Credentials", "danger")
          }
    }
  return (
    <div className='container'>
    <h1>Login</h1>
      <form  onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" value={credentials.email} onChange={onChange} name="email" id="email" aria-describedby="emailHelp" />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" value={credentials.password}onChange={onChange} name="password" id="password" />
            </div>
            <button type="submit" className="btn btn-primary">Login</button>
    </form>
    </div>
  )
}
