import React from "react";
import Feedback from 'react-bootstrap/Feedback'

import { Form,Button } from 'react-bootstrap'
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
const Login = (props) => {
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const [error,setError]=useState(false)
  const history=useHistory()
  if(props.user){
    return <Redirect to="/" />
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    const data={email,password};

    fetch('http://localhost:3000/users/login',{
          method:'POST',
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify(data)

      }).then((e)=>{
        if(e.ok){
          setError(false)
          alert('Logged succesfully')
          return e.json()

        }
        throw new Error("Failed to Login");
      }).then((data)=>{
        props.login(data.token)
        localStorage.setItem('token',JSON.stringify(data.token))
      }).catch((e)=>{
        console.log(e)
        setError(e)
        alert("Failed to login")
      })


  }
  

    return (      
      <div>    
          <h1>Login</h1>
           <Form onSubmit={handleSubmit}>
  <Form.Group  className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>{
      setEmail(e.target.value)
    }} />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" required onChange={(e)=>{
      setPassword(e.target.value)
}} />
  </Form.Group>
 
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>  
     );
}
 
export default Login;