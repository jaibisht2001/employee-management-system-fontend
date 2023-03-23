import React from 'react'
import './AddMang.css'

function AddMang() {
  var MangAddData = {
    empdetails: {
      name: null,
      email: null,
      dob: null,
      mobile: null,
      address: null,
      designation: null,
    },
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    MangAddData.empdetails.name = event.target.mangName.value
    MangAddData.empdetails.email = event.target.email.value
    MangAddData.empdetails.dob = event.target.dob.value
    MangAddData.empdetails.mobile = event.target.mobile.value
    MangAddData.empdetails.address = event.target.address.value
    MangAddData.empdetails.designation = event.target.designation.value
    console.log(MangAddData.empdetails)
    if (
      MangAddData.empdetails.name !== '' &&
      MangAddData.empdetails.email !== '' &&
      MangAddData.empdetails.dob !== '' &&
      MangAddData.empdetails.mobile !== '' &&
      MangAddData.empdetails.address !== '' &&
      MangAddData.empdetails.designation !== ''
    ) {
      fetch('http://localhost:8002/api/v1/admin/add/manager', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(MangAddData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.text())
        .then((data) => {
          alert('MANAGER ADDED SUCCESSFULLY!')
          console.log(data)
        })
    } else {
      alert('FIELDS CAN`T BE EMPTY')
    }
  }

  return (
    <div className="AddMang">
      <h1>Add Manager</h1>
      <div class="container text-center">
        <div class="row align-items-center">
          <div class="col">
            <form onSubmit={handleSubmit}>
              <div class="form-floating mb-3">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInput"
                  placeholder="Name"
                  name="mangName"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div class="form-floating">
                <input
                  type="email"
                  class="form-control"
                  id="floatingInputdep"
                  placeholder="email"
                  name="email"
                />
                <label for="floatingInputdep">Email</label>
                <br />
              </div>
              <div class="form-floating">
                <input
                  type="date"
                  class="form-control"
                  id="floatingInputdob"
                  placeholder="DOB"
                  name="dob"
                  required
                />
                <label for="floatingInputdob">Date of Birth</label>
                <br />
              </div>
              <div class="form-floating">
                <input
                  type="textbox"
                  class="form-control"
                  id="floatingInputadd"
                  placeholder="Address"
                  name="address"
                />
                <label for="floatingInputadd">Address</label>
                <br />
              </div>
              <div class="form-floating">
                <input
                  type="tel"
                  class="form-control"
                  id="floatingInputtel"
                  placeholder="Contact Number"
                  name="mobile"
                />
                <label for="floatingInputtel">Contact Number</label>
                <br />
              </div>

              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputdes"
                  placeholder="Designation"
                  name="designation"
                />
                <label for="floatingInputdes">Designation</label>
                <br />
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                  Add Manager
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddMang
