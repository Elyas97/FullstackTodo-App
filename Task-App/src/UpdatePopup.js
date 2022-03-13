import Modal from 'react-bootstrap/Modal'
import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./usefetch";
import { Form,Button } from 'react-bootstrap'

const UpdatePopup= (props)=> {
    console.log(props)
    
    const [title,setTitle]=useState(props.data.title)
const [description,setdescription]=useState(props.data.description)
const [completed,setcompleted]=useState(props.data.completed)
const [isPending2,setIsPending]=useState(false)
const id=useParams()
const history=useHistory()
console.log(id.id)
const handleSubmit=(e)=>{
    e.preventDefault()

    const blog={ title , description , completed };
    setIsPending(true)
    fetch('http://localhost:3000/tasks/'+id.id,{
        method:'PATCH',
        headers: {"Content-Type": "application/json",Authorization: 'beartoken ' + localStorage.getItem('token')},
        body :JSON.stringify(blog)
    }).then((data)=>{
        console.log(data)
        setIsPending(false)
        if(data.ok){
            alert('Succesfully updated')
            history.push('/')
        return 
        }
        alert("Failed to Update")
    }).catch((e)=>{
        console.log(e)
    })

    
}
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Update Task
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="create">
            <h2>Update Task</h2>
            <form onSubmit={handleSubmit} > 
                <label>Task Title:</label>
                <input type="text" value={title} required onChange={(e)=>{
                    setTitle(e.target.value)
                }}></input>
                <label>Task description</label>
                <textarea required value={description} onChange={(e)=>{
                    setdescription(e.target.value)
                }}></textarea>
                <label> completed</label>
                <select value={completed} onChange={(e)=>{
                    console.log(e.target.value)
                    setcompleted(e.target.value)
                }}>
                    <option value="false">False</option>
                    <option value="true">True</option>
                </select>
                {isPending2&&<button disabled>Updating task..</button>}
                {!isPending2&&<button>Update task</button>}
            </form>
        </div>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }
  export default UpdatePopup;
  