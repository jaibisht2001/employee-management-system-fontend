import { React } from 'react'
import { useNavigate } from 'react-router-dom'
import './emp-login.css'
import 'bootstrap'
import employee from '../images/employee.png'

function EmpLogin() {
  const navigate = useNavigate()
  var EmployeeLoginData = {
    id: null,
    password: null,
  }
  const handelSubmit = (event) => {
    event.preventDefault()
    EmployeeLoginData.id = event.target.empId.value
    EmployeeLoginData.password = event.target.password.value
    console.log(EmployeeLoginData)
    if (EmployeeLoginData.id !== '' && EmployeeLoginData.password !=='') {
      
      fetch('http://localhost:8001/api/v1/employee/authenticate', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(EmployeeLoginData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.text())
        .then((data) => {
          if (data !== 'AUTHENTICATION FAILED') {
            console.log(data)
            localStorage.setItem('token', data)
            localStorage.setItem('id', EmployeeLoginData.id)
            localStorage.setItem('user', 'EMPLOYEE')
            navigate('/emp-dashboard/profile')
          } else {
            alert(data)
          }
        })
    }else{
      alert("FIELDS CAN`T BE EMPTY")
    }
  }

  return (
    <div className="EmpLogin">
      <h1>Employee Login</h1>
      <div className="container text-center">
        <div className="row align-items-center">
          <div className="emp-logo">
            <img src={employee} alt="logo" className="img-logo"></img>
          </div>
        </div>
        <div className="row align-items-center">
          <div className="col">
            <form onSubmit={handelSubmit}>
              <div className="form-floating mb-3">
                <input
                  type="text"
                  className="form-control"
                  id="empid"
                  name="empId"
                  placeholder="E1234"
                />
                <label htmlFor="floatingInput">Employee ID</label>
              </div>
              <div className="form-floating">
                <input
                  type="password"
                  className="form-control"
                  id="empPass"
                  placeholder="Password"
                  name="password"
                />
                <label htmlFor="floatingPassword">Password</label>
                <br />
                <button type="submit" className="btn btn-primary">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
export default EmpLogin
