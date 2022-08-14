import React from 'react';
import {Link} from 'react-router-dom'
import {useNavigate} from "react-router-dom";
import { useCookies } from 'react-cookie';
import "./Sidebar.css";

const Sidebar = () =>{
    const navigate = useNavigate();
    // eslint-disable-next-line
    const [cookies, setCookie] = useCookies([]);

    const handleLogout = ()=> {
        // console.log(cookies)
        // localStorage.setItem("authorization", "");
        setCookie("jwt", "")
        navigate("/login");
    }
    return(
        <>
       

            <div className='container'>
               <div className='sidebar'>
                <div className='top_column'>
                    <h1 className='logo'>ToDo List</h1>
                </div>
                <div className='top_content'>
                       <Link to='/' className='history'><p >History</p></Link> 
                    </div>
                    <div className='last_content'>
                       <button onClick={handleLogout}><p>Logout</p></button> 
                    </div>

               </div>
            </div>

           
        </>
    )
}

export default Sidebar;