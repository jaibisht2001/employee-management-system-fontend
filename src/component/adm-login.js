import React from 'react'
import './adm-login.css'
import 'bootstrap';
import admin from '../images/admin.png';
import { useNavigate } from 'react-router-dom';

function AdmLogin() {
  const navigate=useNavigate();
  var AdminLoginData={
    adminId:null,
    adPassword:null,
  }
  const handleSubmit = (event)=>{
    event.preventDefault()
    AdminLoginData.adminId=event.target.admId.value
    AdminLoginData.adPassword=event.target.admPassword.value
    console.log(AdminLoginData)
    if(AdminLoginData.adminId!=='' && AdminLoginData.adPassword!=='')
    {
      fetch('http://localhost:8002/api/v1/admin/authenticate',
      {
        method:'POST',
        mode:'cors',
        body:JSON.stringify(AdminLoginData),
        headers:{
          'Content-Type':'application/json',
        }
      }).then((res)=>res.text()).then((data)=>{

        if(data!=='AUTHENTICATION FAILED')
        {
          console.log(data)
          localStorage.setItem('token',data)
          localStorage.setItem('id',AdminLoginData.adminId)
          localStorage.setItem('user','ADMIN')
          navigate('/adm-dashboard/addemployee');
        }
        else{
          alert(data)
        }

      })
    }
    else{
      alert("FIELDS CAN`T BE EMPTY")
    }

  }
  return (
    <div className="AdmLogin">
        <h1>Admin Login</h1>
      <div class="container text-center">
      <div class="row align-items-center">
        <div class="emp-logo">
        <img src={admin} alt='logo' class="img-logo"></img>
        </div>
        
        </div>
        <div class="row align-items-center">
         
          <div class="col">
            <form onSubmit={handleSubmit}>
            <div class="form-floating mb-3">
              <input
                type="text"
                class="form-control"
                id="floatingInput"
                placeholder="name@example.com"
                name='admId'
              />
              <label for="floatingInput">Admin ID</label>
            </div>
            <div class="form-floating">
              <input
                type="password"
                class="form-control"
                id="floatingPassword"
                placeholder="Password"
                name='admPassword'
              />
              <label for="floatingPassword">Password</label>
              <br/>
              <button type="submit" class="btn btn-primary">LOGIN </button>
            </div>
            </form>
            
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default AdmLogin;