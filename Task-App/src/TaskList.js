import { Link } from "react-router-dom";
import { Redirect } from "react-router-dom";
import Badge from 'react-bootstrap/Badge'
const TaskList = (props) => {
    const data=props.data
    const title=props.title
   
    return ( 
        <div className="task-list">
            <h1>{title}</h1>
             {data.map((data)=>(
           <div className="task-preview" key={data.id}>
               <Link to={'/tasks/'+ data._id }>
               <h2>{data.title}</h2>
               {data.completed&&  <Badge pill bg="success">Completed</Badge> }
               {!data.completed&&  <Badge pill bg="warning">Ongoing</Badge> }
               </Link>
              
           </div>
       ))}
        </div>
     );
}

export default  TaskList ;