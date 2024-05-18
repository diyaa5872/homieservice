import React from 'react';
import "./App.css";
import Login from './components/Login';
import Frontpage from './components/Frontpage';
import SignUp from "./components/Register"
import SignUpWorker from './components/Registerworker';
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Mainuser from './components/Mainuser';
import UserCard from './components/Card';

function App(){
  return (
    <div>
      <UserCard />
    </div>
  )
}

export default App;
