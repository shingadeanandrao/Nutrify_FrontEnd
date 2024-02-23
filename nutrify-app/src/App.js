import './App.css';
import Login from './Components/Login';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Register from './Components/Register';
import userContext from './Context/UserContext'
import { useState } from 'react';
import Private from './Components/Private';
import Track from './Components/Track';
import Diet from './Components/Diet';
import Notfound from './Components/NotFound';

function App() {

const [loggedUser,setLoggedUser]=useState(JSON.parse(localStorage.getItem("nutrify")))

  return (
    <div className="App">

      <userContext.Provider value={{loggedUser,setLoggedUser}}>
        <Router>
          <Routes>
            <Route exact path="/" element={<Login />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path='/track' element={<Private Component={Track}/>}/>
            <Route exact path='/diet' element={<Private Component={Diet}/>}/>                  
            
            <Route path='*' element={<Notfound/>}/>
          </Routes>
        </Router>
      </userContext.Provider>
    </div>
  );
}

export default App;
