import {React} from 'react'
import './man-login.css'
import 'bootstrap'
import manager from '../images/manager.png'
import { useNavigate } from 'react-router-dom'

function MangLogin() {
  const navigate = useNavigate()
  var ManagerLoginData = {
    id: null,
    password: null,
  }

  const handelSubmit = (event) => {
    event.preventDefault()
    ManagerLoginData.id = event.target.mangId.value
    ManagerLoginData.password = event.target.mangpassword.value
    console.log(ManagerLoginData)
    if (ManagerLoginData.id !== '' && ManagerLoginData.password !== '') {
      fetch('http://localhost:8003/api/v1/manager/authenticate', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(ManagerLoginData),
        headers: { 'Content-Type': 'application/json' },
      })
        .then((res) => res.text())
        .then((data) => {
          if (data !== 'AUTHENTICATION FAILED') {
            console.log(data)
            localStorage.setItem('token', data)
            localStorage.setItem('id', ManagerLoginData.id)
            localStorage.setItem('user', 'MANAGER')
            navigate('/mang-dashboard/profile')
          } else {
            alert(data)
          }
        })
    } else {
      alert('FIELDS CAN`T BE EMPTY')
    }
  }

  return (
    <div className="MangLogin shadow-lg">
      <div class="emp-logo" align="center">
        <img src={manager} alt="logo" class="img-logo"></img>
      </div>
      <h1 class="display-6 text-center fw-bold pb-4">Manager Login</h1>
      <div class="container text-center">
        <div class="row align-items-center"></div>
        <div class="row align-items-center">
          <form onSubmit={handelSubmit}>
            <div class="col">
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="name@example.com"
                  name="mangId"
                />
                <label for="floatingInput">Manager ID</label>
              </div>
              <div class="form-floating">
                <input
                  type="password"
                  class="form-control"
                  id="floatingPassword"
                  placeholder="Password"
                  name="mangpassword"
                />
                <label for="floatingPassword">Password</label>
                <br />
                <button type="submit" class="btn btn-dark my-3 py-2">
                  Login
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default MangLogin
