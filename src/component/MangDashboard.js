import React from 'react'
import './MangDashboard.css'
import NavBar from './Navbar.js'
import 'bootstrap'
import Profile from './Profile.js'
import Task from './Task.js'
import { useNavigate, Routes, Route } from 'react-router-dom'
import LeaveStatus from './leaveStatus.js'
import EmpList from './EmployeeList'

function MangDashboard() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/man-login')
    }
  }, [navigate])

  return (
    <div className="MangDashboard">
      <NavBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/emplist" element={<EmpList />} />
        <Route path="/task" element={<Task />} />
        <Route path="/leave" element={<LeaveStatus/> }/>
      </Routes>
    </div>
  )
}

export default MangDashboard
