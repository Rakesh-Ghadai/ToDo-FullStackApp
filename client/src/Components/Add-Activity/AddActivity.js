import React ,{ useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Cookies } from 'react-cookie';
import Header from '../header_sidebar/Header';
import Sidebar from '../header_sidebar/Sidebar';
import './AddActivity.css'
const AddActivity = () => {
    const [userState, setUserState] = useState({activity:""});
    let navigate = useNavigate();
    const cookies = new Cookies()
    const token = cookies.get('jwt')
        const handleUserAdd = ()=> {
        console.log(userState);
        axios({
            method : 'post',
            url : 'https://todo-10x.herokuapp.com/addactivity', 
            headers: {
                Accept : "application/json",
                authorization: token,
                "Content-Type": "application/json"
              },
            data : userState

        }).then((res)=> {
            console.log(res);
            navigate("/");
        }).catch((err)=> {
            console.log(err)
        })
    }
    return (
        <>
        <Header/>
        <hr className='line'></hr>
        <Sidebar/>
        <div className='form_div'>
            <div className='label'>Add An Activity</div>
            <form>
                <input type='text' className='input'onChange={e=>setUserState({...userState, activity:e.target.value})}/>
            </form>
        </div>
        <button className='btn_submit' onClick={handleUserAdd}>Submit</button>
        </>
    )
}
export default AddActivity;