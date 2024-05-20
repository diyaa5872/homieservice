import React from 'react';
import {Routes,Route} from 'react-router-dom'
import "./App.css";
import Login from './components/Login';
import Frontpage from './components/Frontpage';
import SignUp from "./components/Register"
import SignUpWorker from './components/Registerworker';
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
import WorkerCard from './components/UserCard';
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

function App(){
  return (
    <div>
      <Routes>
        {/* user routes */}
        <Route path='/' element={<Frontpage />} />
        <Route  path='/mainpage' element={<Mainuser />} />
        <Route path='/categories/:profession' element={<Plumberpages />} />
        <Route path='/request' element={<Perperson />} />
        <Route path='/requesting' element={<Jobdetail />} />
        <Route path='/unavailable' element={<Unavailablepage />} />
        <Route path='/profileuser' element={<Account />} />
        <Route path='/updateuserprofile' element={<Updatepage />} />

        {/* worker routes */}
        <Route path='/otpworker' element={<Otp />} />
        <Route path='/otherdetails' element={<Otherdetailsworker />} />
        <Route path='/mainworkerpage' element={<Workerrequested />} />
        <Route path='/viewingrequest' element={<Jobdetail />} />
        <Route path='/workerprofile' element={<Profileworker />} />
        <Route path='/updateworkerprofile' element={<Workerdetailsupdate />} />
      </Routes>
    </div>
  )
}

export default App;
