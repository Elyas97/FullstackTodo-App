import React from "react";
import { Form,Button } from 'react-bootstrap'
import Feedback from 'react-bootstrap/Feedback'
import { useState } from "react";
import { Redirect } from "react-router-dom";
import { useHistory } from "react-router-dom";

const Register = (props) => {
  const [email,setEmail]=useState(null)
  const [password,setPassword]=useState(null)
  const [name,setName]=useState(null);
  const [validated, setValidated] = useState(false);
  const history=useHistory()
  const handleSubmit=(e)=>{
    const form = e.currentTarget;

    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      setValidated(true)
      return
    }

    setValidated(true);
    e.preventDefault()
    const data={name,email,password};

    fetch('http://localhost:3000/users',{
          method:'POST',
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify(data)

      }).then((e)=>{
        if(e.ok){
          alert('registered succesfully')
          return e.json()
        }
        throw new Error("Failed to Register");
      }).then((responseJson) => {
        console.log(responseJson)
        history.push('/login')
      }).catch((e)=>{
        console.log(e)
        alert("Failed to Register try with a different email")
      })
        
      

  }
  if(props.user){
    return <Redirect to="/" />
 }
    return (      
        
        <div>
            <h1>Register</h1>
           <Form noValidate validated={validated} onSubmit={handleSubmit}>
           <Form.Group  className="mb-3" controlId="formBasicEmail">
    <Form.Label>Full Name</Form.Label>
    <Form.Control type="text" placeholder="Enter Name" required onChange={(e)=>{
      setName(e.target.value)
    }} />
    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
    <Form.Control.Feedback type="invalid">
              Please type your name.
            </Form.Control.Feedback>

    </Form.Group>
  <Form.Group  className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" required onChange={(e)=>{
      setEmail(e.target.value)
    }} />
       

    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
    <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              Please type your email.
            </Form.Control.Feedback>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" minLength="7" required onChange={(e)=>{
      setPassword(e.target.value)
}} />
 <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        <Form.Control.Feedback type="invalid">
              password length should be above 6.
            </Form.Control.Feedback>
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form>
</div>
     );
}
 
export default Register;