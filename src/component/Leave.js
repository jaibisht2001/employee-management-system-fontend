import React, { useState } from 'react'
import './Leave.css'

function Leave() {
  
  const [pLleave, setPlLeave] = useState({})
  const [sLleave, setSlLeave] = useState({})

  var LeaveHistoryData = {
    id: localStorage.getItem('id'),
    email: pLleave.email,
    leaveType: null,
    fromDate: null,
    toDate: null,
    reason: null,
    status: 'PENDING',
  }

  

  useState(React.useCallback(async () => {
    await fetch(
      'http://localhost:8001/api/v1/employee/leave/get/' +
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
        setPlLeave(JSON.parse(JSON.stringify(data[0])))
        setSlLeave(JSON.parse(JSON.stringify(data[1])))
      })

   await fetch(
      'http://localhost:8001/api/v1/employee/leavehistory/get/' +
        localStorage.getItem('id'),
      {
        method: 'GET',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
      },
    )
      .then(async (res) => await res.json())
      .then(async(data) => {
        for(let i=0;i< await data.length;i++){
            console.log(data[i])
            document.getElementById('leaveHistoryTable').innerHTML+=`
            <tr>
            <th scope="col">${data[i].id}</th>
            <th scope="col">${data[i].leaveHistoryId}</th>
            <th scope="col">${data[i].email}</th>
            <th scope="col">${data[i].leaveType}</th>
            <th scope="col">${data[i].fromDate}</th>
            <th scope="col">${data[i].toDate}</th>
            <th scope="col">${data[i].reason}</th>
            <th scope="col">${data[i].status}</th>
          </tr>
            `;
        }
       
      })
  },[]))

 

  var applyLeave = (event) => {
    event.preventDefault()
    console.log(LeaveHistoryData)
    if (
      LeaveHistoryData.id !== '' &&
      LeaveHistoryData.email !== '' &&
      LeaveHistoryData.leaveType !== '' &&
      LeaveHistoryData.fromDate !== '' &&
      LeaveHistoryData.toDate !== '' &&
      LeaveHistoryData.reason !== ''
    ) {
      fetch('http://localhost:8001/api/v1/employee/leave/add', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(LeaveHistoryData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.text())
        .then((data) => {
          alert('LEAVE APPLIED SUCCESSFULLY')
          window.location.reload()
        })
    } else {
      alert('FIELDS CAN`T BE EMPTY')
    }
  }

  return (
    <div className="Leave">
      <h1 className='mt-5 d-flex justify-content-center'>EMPLOYEE LEAVE</h1>
      <div class="container">
        <div class="row">
          <div class="col-md-6">
            <div class="card text-center">
              <div class="card-header text-dark">
                <b>SICK LEAVE</b>
              </div>
              <div class="card-body">
                <h5 class="card-title">Leave Count:{sLleave.leaveCount}</h5>
                <h5 class="card-title">
                  Leave Remaining:{sLleave.leaveRemaining}
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  RAISE {sLleave.leaveType} REQUEST
                </button>
              </div>
            </div>
            <br />
          </div>
          <div class="col-md-6">
            <div class="card text-center">
              <div class="card-header text-dark">
                <b>PRIVILEGED LEAVE</b>
              </div>
              <div class="card-body">
                <h5 class="card-title">Leave Count:{pLleave.leaveCount}</h5>
                <h5 class="card-title">
                  Leave Remaining:{pLleave.leaveRemaining}
                </h5>
                <p class="card-text">
                  With supporting text below as a natural lead-in to additional
                  content.
                </p>
                <button
                  type="button"
                  class="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                >
                  RAISE {pLleave.leaveType} REQUEST
                </button>
              </div>
            </div>
            <br />
          </div>
        </div>
      </div>
      <div
        class="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark" id="staticBackdropLabel">
                Raise Leave Request
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <form class="row g-3 text-dark">
                <div class="col-md-12">
                  <label for="inputEmail4" class="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    class="form-control"
                    id="inputEmail4"
                    name="empemail"
                    defaultValue={LeaveHistoryData.email}
                    disabled
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputId" class="form-label">
                    Employee ID
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputId"
                    defaultValue={LeaveHistoryData.id}
                    disabled
                  />
                </div>

                <div class="col-md-12">
                  <label for="inputFromDate" class="form-label">
                    From Date
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="inputFromDate"
                    name="fromdate"
                    onChange={(e) => {
                      LeaveHistoryData.fromDate = e.target.value
                    }}
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputToDate" class="form-label">
                    To Date
                  </label>
                  <input
                    type="datetime-local"
                    class="form-control"
                    id="inputToDate"
                    name="todate"
                    onChange={(e) => {
                      LeaveHistoryData.toDate = e.target.value
                    }}
                  />
                </div>
                <div class="col-md-12">
                  <label for="inputLeaveType" class="form-label">
                    Leave Type
                  </label>

                  <select
                    class="form-select"
                    id="inputLeaveType"
                    name="leavetpye"
                    onChange={(e) => {
                      LeaveHistoryData.leaveType = e.target.value
                    }}
                  >
                    <option selected>Select Leave Type</option>
                    <option value="PL">Privileged Leave </option>
                    <option value="SL">Sick Leave</option>
                  </select>
                </div>

                <div class="col-md-12">
                  <label for="inputReason" class="form-label">
                    Reason
                  </label>
                  <input
                    type="text"
                    class="form-control"
                    id="inputReason"
                    name="reason"
                    onChange={(e) => {
                      LeaveHistoryData.reason = e.target.value
                    }}
                  />
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={applyLeave}
              >
                Apply
              </button>

              <button type="button" class="btn btn-primary">
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
      <table class="table table-hover table-light container">
        <thead>
          <tr>
            <th scope="col">Employee ID</th>
            <th scope="col">Leave History ID</th>
            <th scope="col">Email</th>
            <th scope="col">Leave Type</th>
            <th scope="col">From Date</th>
            <th scope="col">To Date</th>
            <th scope="col">Reason</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody id="leaveHistoryTable"></tbody>
      </table>
    </div>
  )
}

export default Leave
