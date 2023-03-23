import React, { useState, useEffect } from 'react'
import './Profile.css'
function Profile() {
  const [empdata, setEmpData] = useState({})
  const [isDisabled, setDisable] = useState(true)
  const [buttonTitle, setTitle] = useState('Edit')
  useEffect(() => {
    fetch(
      'http://localhost:8001/api/v1/employee/get/id/' +
        localStorage.getItem('id'),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    )
      .then((res) => res.json())
      .then((data) => {
        setEmpData(JSON.parse(JSON.stringify(data.empdetails)))
        console.log(data)
      })
  }, [])

  var saveData = () => {
    fetch('http://localhost:8001/api/v1/employee/update', {
      method: 'PUT',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
      body: JSON.stringify(empdata),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data)
        alert('Data Saved')
        setDisable(true)
      })
  }

  var enableEdit = () => {
    if (isDisabled === true) {
      setDisable(false)
      setTitle('Cancel')
    } else {
      setDisable(true)
      setTitle('Edit')
    }
  }

  return (
    <div className="container py-4 profile">
      <div className="text-center">
        <h1>PERSONAL DETAILS</h1>
      </div>

      <div className="container mt-5 text-dark">
        <div className="card">
          <div className="card-header text-dark">Hi,{empdata.name}</div>
          <div className="card-body">
            <form class="row g-3">
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Email
                </label>
                <input
                  type="email"
                  class="form-control"
                  id="inputEmail4"
                  onChange={(e) => {
                    empdata.email = e.target.value
                  }}
                  defaultValue={empdata.email}
                  name="empemail"
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label for="inputPassword4" class="form-label">
                  Employee ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputPassword4"
                  defaultValue={empdata.id}
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Name
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  onChange={(e) => {
                    empdata.name = e.target.value
                  }}
                  defaultValue={empdata.name}
                  disabled={isDisabled}
                  name="empname"
                />
              </div>
              <div class="col-md-6">
                <label for="inputState" class="form-label">
                  Mobile
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  onChange={(e) => {
                    empdata.mobile = e.target.value
                  }}
                  defaultValue={empdata.mobile}
                  disabled={isDisabled}
                />
              </div>
              <div class="col-md-6">
                <label for="inputAddress" class="form-label">
                  Address
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  onChange={(e) => {
                    empdata.address = e.target.value
                  }}
                  defaultValue={empdata.address}
                  disabled={isDisabled}
                />
              </div>
              <div class="col-md-6">
                <label for="inputAddress" class="form-label">
                  Designation
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputAddress"
                  onChange={(e) => {
                    empdata.designation = e.target.value
                  }}
                  defaultValue={empdata.designation}
                  disabled={isDisabled}
                />
              </div>
              <div class="col-md-6">
                <label for="inputCity" class="form-label">
                  Manager
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  defaultValue={empdata.manager}
                  disabled
                />
              </div>
              <div class="col-md-6">
                <label for="inputState" class="form-label">
                  Manager ID
                </label>
                <input
                  type="text"
                  class="form-control"
                  id="inputCity"
                  defaultValue={empdata.managerId}
                  disabled
                />
              </div>

              <br />
              <div class="col-md-2 d-inline-flex">
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={enableEdit}
                >
                  {buttonTitle}
                </button>
                &nbsp;
                {!isDisabled && (
                  <button
                    type="button"
                    className="btn btn-success"
                    onClick={saveData}
                  >
                    Save
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
