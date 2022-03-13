import { useState,useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import useFetch from "./usefetch";
import UpdatePopup from "./UpdatePopup"
import Modal from 'react-bootstrap/Modal'
import { Redirect } from "react-router-dom";


import Badge from 'react-bootstrap/Badge'

const TaskDetails = (props) => {
    const history=useHistory();
    
    const handleClick=(e)=>{
        fetch('http://localhost:3000/tasks/'+id,{
            method:'DELETE',
            headers: {"Content-Type": "application/json",Authorization: 'beartoken ' + localStorage.getItem('token')}

        }).then(()=>{
            history.push('/')
        })
    }
   

    const{id}=useParams();

    
    const {data,error,isPending}=useFetch('http://localhost:3000/tasks/'+id)
    const [modalShow, setModalShow] = useState(false);
    if(!props.user){
        return <Redirect to="/login" />
     }
    return (  
        <div className="task-details">
            {isPending&&<div>Loading..</div> }
            {error&&<div>{error}</div>}
            {data&&(
                <article>
                    <h2>{data.title}</h2>
                    <p>{data.description}</p>
                    <div>Task {data.completed? <span><Badge text="light" bg="success">Completed</Badge></span> :<span><Badge text="light" bg="warning">Ongoing</Badge></span>}</div>
                    <button onClick={(e)=>{
                        handleClick()
                    }}>Delete</button>
                    <button className="edits" onClick={(e)=>{
                        setModalShow(true)
                    }}>Edit </button>
                            <UpdatePopup data={data} show={modalShow} onHide={() => setModalShow(false)}/>

                </article>
            )}


        </div>
    );
}
 
export default TaskDetails;