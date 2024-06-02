import React from 'react';
import {Routes,Route} from 'react-router-dom'
import "./App.css";
import Login from './components/Login';
import Frontpage from './components/Frontpage';
import SignUp from "./components/Register"
import SignUpWorker from './components/Registerworker';
import SignInworker from './components/Loginworker';
import Navbar from "./components/Navbar"
import Sidebar from "./components/Sidebar"
import Mainuser from './components/Mainuser';
import Perperson from './components/Perperson';
import UserCard from './components/Card';
import Plumberpages from './components/Plumberpages';
import MediaCover from './components/Image';
import Bookingcomponents from './components/Bookingcomponents';
import Updatepage from './components/Profilepage';
import Account from './components/Accountdetails';
import Updatedetails from './components/Updatedetails';
import Workerrequested from './components/Workerrequested';
import uservalaCard from './components/UserCard';
import Otp from './components/Otp';
import JobCard from './components/CardForJobDetail';
import Jobdetail from './components/Jobdetail';
import Otherdetailsworker from './components/Otherdetailsworker';
import Extradetailsform from './components/Extradetailsform';
import Addressworker from './components/Addressworker';
import Uploadfilesworker from './components/Uploadfilesworker';
import Profileworker from './components/Profileworker';
import Workerdetailsupdate from './components/Workerdetailsupdate';
import Accountdetails from './components/Accountdetails';
import MediaCard from './components/PumberCard';
import BaseModalDialog from './components/BaseModalDialog';
import Unavailablepage from './components/Unavailablepage'
import Sidebarworker from './components/Sidebarworker';
import Otpuser from './components/Otpuser';
import WorkersByProfession from './components/WorkerByProfession';
import Workercard from './components/Workercard';
import Useraddress from './components/Useraddress';

function App(){
  return (
    <div>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Frontpage />} />
        <Route path='/loginuser' element={<Login />} />
        <Route path='/Registeruser' element={<SignUp />} />
        <Route path='/addressuser/:userId' element={<Addressworker />} />
        <Route path='/otpuser' element={<Otpuser />} />
        <Route path='/registerworker' element={<SignUpWorker />} />
        <Route path='/loginworker' element={<SignInworker />} />
        <Route path='/mainpage' element={<Mainuser />} />
        <Route path='/categories/:profession' element={<Plumberpages />} />
        <Route path='/request/:id' element={<Perperson />} />
        <Route path='/requesting/:id' element={<Bookingcomponents />} />
        <Route path='/unavailable' element={<Unavailablepage />} />
        <Route path='/profileuser' element={<Account />} />
        <Route path='/updatedetails' element={<Updatedetails />} />
        <Route path='/Useraddress' element={<Useraddress />} />
        <Route path='/extradetailsform' element={<Extradetailsform />} />

        {/* worker routes */}
        <Route path='/otpworker' element={<Otp />} />
        <Route path='/otherdetails' element={<Otherdetailsworker />} />
        <Route path='/mainworkerpage' element={<Workerrequested />} />
        <Route path='/viewingrequest/:id' element={<Jobdetail />} />
        <Route path='/workerprofile' element={<Profileworker />} />
        <Route path='/updateworkerprofile' element={<Workerdetailsupdate />} />
        <Route path='/addressworker' element={<Addressworker />} />
        <Route path='/uploadworkerfiles' element={<Uploadfilesworker />} />
      </Routes>
    </div>
  )
}

export default App;

