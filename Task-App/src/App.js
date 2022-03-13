import logo from './logo.svg';
import Navbar from './navbar' 
import Home from './Home'
import Login from './Login'
import Register from './Register';
import Create from './Create';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import TaskDetails from './TaskDetails';
import NotFound from './notFound';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";


function App() {
  const [user,setUser]=useState(null);
  async function logout(){
    try{
       await fetch('http://localhost:3000/users/logout',{
        method:'POST',
        headers: {"Content-Type": "application/json",Authorization: 'beartoken ' + localStorage.getItem('token')},
    })
    localStorage.removeItem('token')
    setUser(null)
    }catch(e){
      localStorage.removeItem('token')
    setUser(null)
    }
    
}
async function logoutAll(){
  try{
     await fetch('http://localhost:3000/users/logoutAll',{
      method:'POST',
      headers: {"Content-Type": "application/json",Authorization: 'beartoken ' + localStorage.getItem('token')},
  })
  localStorage.removeItem('token')
  setUser(null)
  }catch(e){
    localStorage.removeItem('token')
  setUser(null)
  }
  
}
function logged(childData) {
    setUser(childData)
}
useEffect(()=>{
  const data=localStorage.getItem('token')
  if(data){
      setUser(data)
  }else{
      setUser(null)
  }

},[]);
  return (
    <Router>
    <div className="App">
      <Navbar logoutAll={logoutAll} logout={logout} user={user}/>
      <div className="content">
        <Switch>
          <Route exact path="/">
             <Home user={user}/>
          </Route>
          <Route exact path="/login">
             <Login  login={logged} user={user}/>
          </Route>
          <Route exact path="/register">
          <Register user={user}/>
          </Route>
          <Route exact path="/create">
            <Create user={user} />
          </Route>
          <Route exact path="/tasks/:id">
            <TaskDetails user={user}/>
          </Route>
          <Route path="*">
            <NotFound/>
          </Route>
        </Switch>
      </div>
    </div>
    </Router>
  );
}

export default App;
