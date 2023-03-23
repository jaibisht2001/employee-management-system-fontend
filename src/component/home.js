import React from 'react'
import { Link } from 'react-router-dom'
import './home.css'
import employee from '../images/employee.png'
import manager from '../images/manager.png'
import admin from '../images/admin.png'

function Home() {
  return (
    <div className="home align-items-center">
      <div className="container-fluid banner d-flex justify-content-center align-items-center">
        <h1 className="display-4 text-uppercase fw-bold text-center py-5">Employee Management System</h1>
      </div>

      <div className="container text-center py-5">
        <div className="row row-cols-1 row-cols-md-3 g-4 justify-content-center">
          <div className="col al">
            <div className="card align-items-center">
              <img src={employee} className="card-img-top " alt="..." />
              <div className="card-body">
                <h5 className="card-title"><Link to="/emp-login" className="link-mod">EMPLOYEE LOGIN</Link></h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card align-items-center">
              <img src={manager} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title"><Link to="/man-login" className="link-mod">MANAGER LOGIN</Link></h5>
              </div>
            </div>
          </div>
          <div className="col">
            <div className="card align-items-center">
              <img src={admin} className="card-img-top" alt="..." />
              <div className="card-body">
                <h5 className="card-title"><Link to="/adm-login" className="link-mod">ADMIN LOGIN</Link></h5>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
