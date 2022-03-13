import TaskList from './TaskList';
import usefetch from './usefetch'
import { Redirect } from "react-router-dom";
import { useState } from "react";


const Home = (props) => {
console.log('home rendered')
const  [filter,setFilter]=useState('');

if(!props.user){
   return <Redirect to="/login" />
}

   const {data,isPending,error}=usefetch('http://localhost:3000/tasks?completed'+filter)
    return ( 
    <div className="home">
     {error&&<div>{error}</div>}   
     {isPending && <div>Loading..</div>}   
      {data&& <div className='filter'><TaskList data={data} title="All tasks!" />
                      <select value={filter} onChange={(e)=>{
                        console.log(e.target.value)
                        setFilter(e.target.value)
                    }}>
                        <option select value="">All</option>
                        <option value="=false">Ongoing</option>
                        <option value="=true">Completed</option>
                    </select>
                    </div>}
      {!data&& <h1>Start Adding tasks</h1>}

     
  
 </div>    

     );
}
 
export default Home
;