import React, { useEffect, useState } from 'react'
import './AddEmp.css'
import 'bootstrap'

function AddEmp() {
  const [managers, setManager] = useState([])
  const [managerName, setManagerName] = useState('')
  const [empLoginDetails,setEmpLoginDetails]=useState({})
  var EmpAddData = {
    empdetails: {
      name: null,
      email: null,
      dob: null,
      mobile: null,
      address: null,
      designation: null,
      manager:null,
      managerId:null
    },
  }
  const handleSubmit = (event) => {
    event.preventDefault()
    EmpAddData.empdetails.name = event.target.empName.value
    EmpAddData.empdetails.email = event.target.email.value
    EmpAddData.empdetails.dob = event.target.dob.value
    EmpAddData.empdetails.mobile = event.target.mobile.value
    EmpAddData.empdetails.address = event.target.address.value
    EmpAddData.empdetails.designation = event.target.designation.value
    EmpAddData.empdetails.manager=event.target.managername.value
    EmpAddData.empdetails.managerId=event.target.managerid.value
    console.log(EmpAddData.empdetails)
    if (
      EmpAddData.empdetails.name !== '' &&
      EmpAddData.empdetails.email !== '' &&
      EmpAddData.empdetails.dob !== '' &&
      EmpAddData.empdetails.mobile !== '' &&
      EmpAddData.empdetails.address !== '' &&
      EmpAddData.empdetails.designation !== ''&&
      EmpAddData.empdetails.manager!==''&&
      EmpAddData.empdetails.managerId!==''
    ) {
      fetch('http://localhost:8002/api/v1/admin/add/employee', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(EmpAddData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.json())
        .then((data) => {
          alert('EMPLOYEE ADDED SUCCESSFULLY!')
          setEmpLoginDetails(data)
        })
    } else {
      alert('FIELDS CAN`T BE EMPTY')
    }
  }
  const loadManager = () => {
    fetch('http://localhost:8002/api/v1/admin/get/manager', {
      method: 'GET',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setManager(data)
      })
  }

  const setManagerN=(id)=>{
    for(let i=0;i<managers.length;i++){
      if(managers[i].id===id){
        setManagerName(managers[i].name)
      }
    }
  }

  useEffect(() => {
    loadManager()
  }, [loadManager])

  return (
    <div className="AddEmp">
      <h1>Add Employee</h1>
      <h1>{empLoginDetails.id}</h1>
      <h1>{empLoginDetails.password}</h1>
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
                  name="empName"
                />
                <label for="floatingInput">Name</label>
              </div>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputdep"
                  placeholder="Department"
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
              <select class="form-select" aria-label="manager-id" name='managerid' onChange={(e)=>setManagerN(e.target.value)}>
                <option selected>Select Manager Id</option>
                {managers.map((manager, index) => (
                  <>
                    <option value={manager.id} key={index}>
                      {manager.id}
                    </option>
                  </>
                ))}
              </select>
                  <br/>
              <div class="form-floating">
                <input
                  type="text"
                  class="form-control"
                  id="floatingInputdes"
                  placeholder="Designation"
                  name="managername"
                  defaultValue={managerName}
                />
                <label for="floatingInputdes">Manager Name</label>
                <br />
              </div>

              <div class="d-grid gap-2">
                <button type="submit" class="btn btn-primary">
                  Add Employee
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddEmp
