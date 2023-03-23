import React from 'react'
import { useNavigate, Routes, Route } from 'react-router-dom'
import './EmpDashboard.css'
import NavBar from './Navbar.js'
import 'bootstrap'
import Profile from './Profile.js'
import Task from './Task.js'
import Leave from './Leave.js'

function EmpDashboard() {
  const navigate = useNavigate()
  React.useEffect(() => {
    if (!localStorage.getItem('token')) {
      navigate('/emp-login')
    }
  }, [navigate])

  return (
    <div className="EmpDashboard">
      <NavBar />
      <Routes>
        <Route path="/profile" element={<Profile />} />
        <Route path="/leave" element={<Leave />} />
        <Route path="/task" element={<Task />} />
      </Routes>
    </div>
  )
}

export default EmpDashboard
