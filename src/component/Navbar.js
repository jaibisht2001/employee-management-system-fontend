import React, { useEffect, useState } from 'react'
import './Navbar.css'
import { useNavigate, Link } from 'react-router-dom'

function NavBar() {
  const navigate = useNavigate()
  const [userType, setuserType] = useState(null)

  useEffect(() => {
    setuserType(localStorage.getItem('user'))
  }, [])

  const LogOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    localStorage.removeItem('id')
    navigate('/home')
  }
  return (
    <nav
      className="navbar navbar-expand-lg bg-primary navbar-dark"
      data-bs-theme="dark"
    >
      <div className="container-fluid">
        <Link className="navbar-brand">
          {localStorage.getItem('user')} DASHBOARD
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarSupportedContent"
        >
          {userType === 'EMPLOYEE' && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link to={'/emp-dashboard/profile'} className="nav-link active">
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/emp-dashboard/leave'} class="nav-link">
                  Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/emp-dashboard/task'} className="nav-link">
                  Task
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Action
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={LogOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {userType === 'MANAGER' && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={'/mang-dashboard/profile'}
                  className="nav-link active"
                >
                  Profile
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/mang-dashboard/emplist'} class="nav-link">
                  Employee List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/mang-dashboard/leave'} class="nav-link">
                  Leave
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/mang-dashboard/task'} className="nav-link">
                  Task
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Action
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={LogOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}

          {userType === 'ADMIN' && (
            <ul className="navbar-nav mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to={'/adm-dashboard/addemployee'}
                  className="nav-link active"
                >
                  Add Employee
                </Link>
              </li>
              <li className="nav-item">
                <Link to={'/adm-dashboard/addmanager'} class="nav-link active">
                  Add Manager
                </Link>
              </li>

              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Action
                </Link>
                <ul className="dropdown-menu dropdown-menu-end">
                  <li>
                    <button className="dropdown-item" onClick={LogOut}>
                      Logout
                    </button>
                  </li>
                </ul>
              </li>
            </ul>
          )}
        </div>
      </div>
    </nav>
  )
}

export default NavBar
