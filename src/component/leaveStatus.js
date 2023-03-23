import React, { useEffect, useState } from 'react'
function LeaveStatus() {
  const [leaveHistory, setLeaveHistry] = useState([])
  useEffect(() => {
    loadLeaveHis()
})

  const updateLeave= async(id,status)=>{
    await fetch(
      'http://localhost:8003/api/v1/manager/leave/update/'+status+'/' +id,

      {
        method: 'PUT',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      },
    )
      .then((res) => res.text())
      .then((data) => {
        if(data!=="REMAINING LEAVE IS LESS THAN APPLIED LEAVE"){
          if(status==="APPROVED"){
            alert("LEAVE ACCEPTED")
          }else{
            alert("LEAVE REJECTED")
          }
        }
        else{
          alert("REMAINING LEAVE IS LESS THAN APPLIED LEAVE")
        }
      })
  }

  const loadLeaveHis = async () => {
    await fetch(
      'http://localhost:8003/api/v1/manager/leave/getmanager/' +
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
        setLeaveHistry(data)
      })
  }

  return (
    <div className="LeaveStatus">
      <table className="table table-hover table-light container mt-5">
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
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody id="leaveStatusTable">
          {leaveHistory.map((leave, index) => (
            <tr key={index}>
              <td className="col" >{leave.id}</td>
              <td className="col" >{leave.leaveHistoryId}</td>
              <td className="col" >{leave.email}</td>
              <td className="col" >{leave.leaveType}</td>
              <td className="col" >{leave.fromDate}</td>
              <td className="col" >{leave.toDate}</td>
              <td className="col" >{leave.reason}</td>
              <td className="col" >{leave.status}</td>
              <td className="d-inline d-flex" key={index}>
                { leave.status ==='PENDING' &&
                <button type="button" class="btn btn-success mx-2" onClick={()=>updateLeave(leave.leaveHistoryId,'APPROVED')}>
                  Accept
                </button>
                }
                { leave.status !=='PENDING' &&
                <button type="button" class="btn btn-success mx-2" onClick={()=>updateLeave(leave.leaveHistoryId,'APPROVED')} disabled>
                  Accept
                </button>
                }
                { leave.status ==='PENDING' &&
                <button type="button" class="btn btn-danger" onClick={()=>updateLeave(leave.leaveHistoryId,'REJECTED')}>
                  Reject
                </button>
                }
                 { leave.status !=='PENDING' &&
                <button type="button" class="btn btn-danger mx-2" onClick={()=>updateLeave(leave.leaveHistoryId,'REJECTED')} disabled>
                  Reject
                </button>
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default LeaveStatus
