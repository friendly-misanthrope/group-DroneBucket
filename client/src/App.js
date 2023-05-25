

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import React, { useState } from "react";

import Login from './components/Login';
import Register from './components/Register'
import DisplayOnePage from './views/DisplayOnePage';
import MainPage from './views/MainPage';
import CreatePage from './views/CreatePage';
import EditOne from './components/EditPhoto';


function App() {

  
  const [droneDetails, setDroneDetails] = useState([])
  const [imageDetails, setImageDetails] = useState([])

  return (
    <div className="App">
       <BrowserRouter>
        <Routes>
          <Route path='/login' element={<Login/>}/> 
          <Route path='/register' element={<Register/>}/>
          <Route path="/photo/:id" element={<DisplayOnePage/>} /> 
          <Route element={<MainPage/> } path="/" default   />
          <Route path='/photos/add' element={ <CreatePage/>  } /> 
          <Route path='/photo/:id/edit' element={ <EditOne droneDetails = {droneDetails} setDroneDetails = {setDroneDetails}/> } />
        </Routes>
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
