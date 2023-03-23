import React, { useEffect} from 'react'
import './EmployeeList.css'

function EmpList() {
  useEffect(() => {
    fetch(
      'http://localhost:8003/api/v1/manager/get/' + localStorage.getItem('id'),
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
        console.log(data)
        for (let i = 0; i < data.length; i++) {
          document.getElementById('empdetails').innerHTML += `
          <div class="col-md-4" >
          <div class="card mt-4">
            <div class="card-body">
            <h5 class="card-title">${data[i].name} </h5><br/>
            <p class="card-text">
              <b>Employee ID: </b> ${data[i].id}<br>
              <b>Email: </b>${data[i].email}<br>
              <b>Date of Birth: </b>${data[i].dob}<br>
              <b>Address:</b> ${data[i].address}<br>
              <b>Mobile:</b> ${data[i].mobile}<br>
              <b>Designation: </b> ${data[i].designation}
            </p>
            </div>
            </div>
            </div>
        `
        }
      })
  }, [])
  return (
    <div class="container text-center py-4">
        <div class="row" id="empdetails">
            
            </div>
        </div>
  )
}

export default EmpList
