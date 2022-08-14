import React from "react";
import {Routes,Route} from "react-router-dom";
import Login from "./Components/Signup-Login/Login";
import Signup from "./Components/Signup-Login/Signup";
import Protected from "./Components/Protected/protected";
import Error404 from "./Components/404 Error/Error404";
import ToDo from "./Components/ToDo/ToDo";
import AddActivity from "./Components/Add-Activity/AddActivity";

function App() {
  return (
    <>
  
    <Routes>
      <Route path="/login" element={<Login></Login>}></Route>
      <Route path="/signup" element={<Signup></Signup>}></Route>
      <Route path="/" element={<Protected><ToDo/></Protected>}></Route>
      <Route path="/addactivity" element={<Protected><AddActivity/></Protected>}></Route>
      <Route path="*" element={<Error404/>}></Route>
    </Routes>
    
    </>
  );
}

export default App;