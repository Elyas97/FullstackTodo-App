import {Link} from 'react-router-dom'
const Navbar = (props) => {
    const user=props.user; 
    return ( 
        <nav className="navbar">
            <h1>Task-App</h1>
            <div className="links">
                {!user &&<Link to="/login">Login</Link>}
                {!user &&<Link to="/register">Register</Link>}
                {user&&<Link exact to="/">Home</Link>}
                {user&&<Link to="/create">New Task</Link>}
                {user&&<Link onClick={()=>{props.logout()}} >Logout</Link>}
                {user&&<Link onClick={()=>{props.logoutAll()}} >Logout From All Devices</Link>}


            </div>
        </nav>
     );
}
 
export default Navbar;