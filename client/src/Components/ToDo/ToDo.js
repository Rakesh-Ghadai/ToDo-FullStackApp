import React from "react";
import { useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { Cookies } from 'react-cookie'
import Header from "../header_sidebar/Header";
import Sidebar from "../header_sidebar/Sidebar";
import "./ToDo.css"
const ToDo = () =>{
    const [users,setUsers]=useState([]);
    const [status,setStatus]=useState(true);
    const [timing,setTiming]=useState();
    const [timingTwo,setTimingTwo]=useState();
    const [timingThree,setTimingThree]=useState();
    
    let now;
    let real_interval=""
    let now_hour;
    let now_min;
    let now_sec;
    let full_now="";
    let end_hour;
    let end_min;
    let end_sec;
    let full_end ="";
   


    const cookies = new Cookies()
    const token = cookies.get('jwt')
    let navigate = useNavigate();
    
    const handleActionOne=(i)=>{
        console.log(i)
        let tOne=document.getElementsByClassName('action')[i].innerHTML;
        let tTwo=document.getElementsByClassName('action_d')[i].innerHTML;
        let sts=document.getElementsByClassName('status')[i].innerHTML;
            
            if(tOne==="Start"&&tTwo==="" && sts==="Pending" && status===true)
            {
                document.getElementsByClassName('action')[i].innerHTML="End";
                document.getElementsByClassName('action_d')[i].innerHTML="Pause";
                document.getElementsByClassName('status')[i].innerHTML="Ongoing"
                setStatus(false);
                let now=new Date()
                now_hour=now.getHours();
                setTiming(now_hour)
                now_min=now.getMinutes();
                setTimingTwo(now_min)
                now_sec=now.getSeconds();
                setTimingThree(now_sec)
                full_now=now_hour+" "+now_min+" "+now_sec;
                console.log(full_now);
            
               
                

            }
            else if(tOne==='End'&&tTwo==="Pause")
            {
                document.getElementsByClassName('action')[i].innerHTML="";
                document.getElementsByClassName('action_d')[i].innerHTML="";
                document.getElementsByClassName('status')[i].innerHTML="Completed";
                setStatus(true);
                now=new Date();
                end_hour=now.getHours();
                end_min=now.getMinutes();
                end_sec=now.getSeconds();
                full_end=end_hour+" "+end_min+" "+end_sec;
                
                
                let arr2=full_end.split(" ").map(Number);
             
                console.log(timing)
                console.log(timingTwo)
                console.log(timingThree)

                console.log(arr2);
                let real_hour=Math.abs(arr2[0]-timing);
                let real_min=Math.abs(arr2[1]-timingTwo);
                let real_sec=Math.abs(arr2[2]-timingThree);
              
               
                real_interval=`${real_hour}:${real_min}:${real_sec}`;
                console.log(real_interval)
                document.getElementsByClassName('timing')[i].innerHTML=real_interval;

                
            }
            else if(tOne==="Start"&&tTwo==="" && sts==="Pending" && status===false){
                window.alert("opps! One Activity is Still going on..")
            }
            


    }
    const handleActionTwo = (i)=>{
        let tOne=document.getElementsByClassName('action')[i].innerHTML;
        let tTwo=document.getElementsByClassName('action_d')[i].innerHTML;
        let sts=document.getElementsByClassName('status')[i].innerHTML;
        if(tOne===""&&tTwo==="Resume" && sts==="Pending" && status===true)
        {
            document.getElementsByClassName('action')[i].innerHTML="End";
            document.getElementsByClassName('action_d')[i].innerHTML="Pause";
            document.getElementsByClassName('status')[i].innerHTML="Ongoing";
            setStatus(false)
        }
        else if(tOne==="End"&&tTwo==="Pause" && sts==="Ongoing" && status===false)
        {
            document.getElementsByClassName('action')[i].innerHTML="";
            document.getElementsByClassName('action_d')[i].innerHTML="Resume";
            document.getElementsByClassName('status')[i].innerHTML="Pending";
            setStatus(true)
        }
        else if(tOne===""&&tTwo==="Resume"&&sts==="Pending" && status===false)
        {
            window.alert("Sorry! One work is still going on")
        }
        

    }

    useEffect(()=>{
        const afterLogin = ()=>{
            console.log("Inside afterLogin function property.js useEffect")
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
                    console.log("Inside then block of property.js")
                    // console.log(res.data.userData[0]._id)
                    // console.log(res.data.property)
                    setUsers(res.data.activity)
                }).catch((err)=>{
                    console.log("Inside catch block of property.js")
                    console.log(err)
                    // if(err){
                    //     navigate("/login")
                    // }
                    if(err.response.data === "Unauthorized user" || err.response.status === 409 ){
                            navigate("/login")
                    }
                })

        }
    
            afterLogin()
        },[token, navigate])
    return(
        <>

        <Header/>
        <hr className='line'></hr>
        <Sidebar/>
       <div className="btn_add"><Link to='/addactivity'><button>Add New Activity</button></Link></div> 
       <table className="main_table">
        <tr>
            <th>Activity</th>
            <th>Status</th>
            <th>Time taken(Hrs:Min:Sec)</th>
            <th>Action</th>

        </tr>
        {[...users].map((user,j)=>{
            
            
            return(
                
                <>
                
                 <tr>
            <td>{user.activity}</td>
            <td><p className="status">Pending</p></td>
            <td><p className="timing"></p></td>
            <td><p className="action"   onClick={()=>handleActionOne(j)}>Start</p>
            <p className="action_d" onClick={()=>handleActionTwo(j)}></p></td>
        </tr>
                </>
            )
        })}
       
       </table>
        </>
    )
}
export default ToDo;