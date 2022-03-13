import { useState } from "react";
import { useHistory } from "react-router-dom";
import { Redirect } from "react-router-dom";
const Create = (props) => {
   
    const [title,setTitle]=useState()
    const [description,setdescription]=useState('')
    const [completed,setcompleted]=useState(false)
    const [isPending,setIsPending]=useState(false)
    const history=useHistory();
    const handleSubmit=(e)=>{
        e.preventDefault()
        const blog={ title , description , completed };
        setIsPending(true)
        fetch('http://localhost:3000/tasks',{
            method:'POST',
            headers: {"Content-Type": "application/json",Authorization: 'beartoken ' + localStorage.getItem('token')},
            body :JSON.stringify(blog)
        }).then((data)=>{
            console.log(data)
            setIsPending(false)
            if(data.ok){
            return history.push('/')
            }
            alert("Failed to add")
        }).catch((e)=>{
            console.log(e)
        })

        
    }
    if(!props.user){
        console.log("rannnssadasdas")

        return <Redirect to="/login" />
     }
    return ( 
        <div className="create">
            <h2>Add a new Task</h2>
            <form onSubmit={handleSubmit}> 
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
                {isPending&&<button disabled>Addding task</button>}
                {!isPending&&<button>Add task</button>}
            </form>
        </div>
     );
}
 
export default Create;