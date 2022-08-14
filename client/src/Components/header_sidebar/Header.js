import React, {useEffect} from 'react';
import {useState} from 'react';
import {HiOutlineUser} from "react-icons/hi";
import "./Header.css"
import { Cookies } from 'react-cookie';
import axios from 'axios';



const Header = () =>{
        const [userName_id, setUserName_id] = useState({})
        const cookies = new Cookies()
        const token = cookies.get('jwt')

        // const userName_id = useContext(Username_id)
        // console.log(props.userdata)
        // console.log(userName_id)
        useEffect(() => {
            console.log("Header useEffect")
            const getUserData = ()=>{
                
                    axios({
                        method: 'get',
                        url:"https://todo-10x.herokuapp.com/activity",
                        headers: {
                            Accept : "application/json",
                            authorization: token,
                            "Content-Type": "application/json"
                          }, 
                          credentials: "include"
                    }).then((res)=>{
                        setUserName_id({
                            username : res.data.userData[0].username,
                        })
                       
                    }).catch((err)=>{
                        console.log(err)
                    })
    
                }                
        
                getUserData()
                // console.log(userName_id)

        }, [token])
        

        return(
            <>
                <div className='main_header'>
                    <div className='header_row'>
                        <HiOutlineUser className='user_icon'/>  <span className='user_name'>{userName_id.username}</span>
                            
                    </div>
                    

                </div>
                
            </>
        )
}
export default Header;