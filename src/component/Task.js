import React, { useEffect, useState } from 'react'
import './Task.css'

function Task() {
  const [taskdata, setTaskData] = useState([])
  const [userType, setuserType] = useState(null)
  const [status, setStatus] = useState('')
  const [disabled,setDisabled]=useState(false)
  var TaskAddData = {
    id: null,
    taskId: null,
    taskName: null,
    taskCompletionDate: null,
    taskUpdates: 'ASSIGNED',
    managerId: localStorage.getItem('id'),
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    TaskAddData.taskName = event.target.taskName.value
    TaskAddData.id = event.target.empId.value
    TaskAddData.taskCompletionDate = event.target.taskcompldate.value
    TaskAddData.taskUpdates = 'ASSIGNED'
    TaskAddData.managerId = event.target.assignedby.value
    console.log(TaskAddData)

    if (
      TaskAddData.id !== '' &&
      TaskAddData.managerId !== '' &&
      TaskAddData.taskCompletionDate !== '' &&
      TaskAddData.taskName !== '' &&
      TaskAddData.taskUpdates !== ''
    ) {
      fetch('http://localhost:8003/api/v1/manager/task/add', {
        method: 'POST',
        mode: 'cors',
        body: JSON.stringify(TaskAddData),
        headers: {
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + localStorage.getItem('token'),
        },
      })
        .then((res) => res.text())
        .then((data) => {
          TaskAddData.id = ''
          TaskAddData.taskCompletionDate = ''
          TaskAddData.taskName = ''
          alert('TASK ADDED SUCCESSFULLY !')
        })
    } else {
      alert("FEILDS CAN'T BE EMPTY!")
    }
  }

  const loadTaskMang = async () => {
    await fetch(
      'http://localhost:8003/api/v1/manager/task/get/managerid/' +
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
        setTaskData(data)
      })
  }

  const loadTaskEmployee = async () => {
    await fetch(
      'http://localhost:8001/api/v1/employee/task/get/empid/' +
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
        setTaskData(data)
      })
  }

  useEffect(() => {
    setuserType(localStorage.getItem('user'))
    TaskAddData.managerId = localStorage.getItem('id')
    if (userType === 'MANAGER') {
      loadTaskMang()
      setDisabled(true)
    } else if (userType === 'EMPLOYEE') {
      loadTaskEmployee()
      setDisabled(false)
    }
  }, [loadTaskMang, loadTaskEmployee])

  const setTaskUpdateData = async (id, status) => {
    await fetch(
      'http://localhost:8001/api/v1/employee/task/update/' + status + '/' + id,

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
        console.log(data)
      })
  }

  return (
    <div className="AddTask">
      {userType === 'MANAGER' && (
        <div className='mt-5'>
          <h1 className='text-white d-flex justify-content-center'>ASSIGN TASK</h1>
        </div>
      )}
      {userType==="MANAGER" &&(
          <div class="container text-center custom">
          <div class="row align-items-center">
            <div class="col">
              {userType === 'MANAGER' && (
                <form onSubmit={handleSubmit}>
                  <div class="form-floating mb-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="Name"
                      name="taskName"
                    />
                    <label for="floatingInput"> Task Name</label>
                  </div>
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputdep"
                      placeholder="Employee ID"
                      name="empId"
                      required
                    />
                    <label for="floatingInputdep">Employee ID</label>
                    <br />
                  </div>
                  <div class="form-floating">
                    <input
                      type="date"
                      class="form-control"
                      id="floatingInputdob"
                      placeholder="Task Completion Date"
                      name="taskcompldate"
                      required
                    />
                    <label for="floatingInputdob">Task Completion Date</label>
                    <br />
                  </div>
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputadd"
                      placeholder="Task Update"
                      name="taskupdate"
                      defaultValue={TaskAddData.taskUpdates}
                      disabled
                    />
                    <label for="floatingInputadd">Task Updates</label>
                    <br />
                  </div>
                  <div class="form-floating">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInputtel"
                      placeholder="Assigned By"
                      name="assignedby"
                      defaultValue={TaskAddData.managerId}
                      disabled
                    />
                    <label for="floatingInputtel">Assigned By</label>
                    <br />
                  </div>
                  <div class="d-grid gap-2">
                    <button type="submit" class="btn btn-primary">
                      ADD TASK
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      )}
    
      <h1 className="text-white d-flex justify-content-center">
        EMPLOYEE TASK LIST
      </h1>
      <table className="table table-hover table-light container mt-5">
        <thead>
          <tr>
            <th scope="col">Task ID</th>
            <th scope="col">Employee ID</th>
            <th scope="col">Manager ID</th>
            <th scope="col">Task Name</th>
            <th scope="col">Task Completion Date</th>
            <th scope="col">Task Status</th>
            {userType === 'EMPLOYEE' && <th scope="col">Action</th>}
          </tr>
        </thead>

        <tbody id="taskdataTable">
          {taskdata.map((task, index) => (
            <tr key={index}>
              <td className="col">{task.taskId}</td>
              <td className="col">{task.id}</td>
              <td className="col">{task.managerId}</td>
              <td className="col">{task.taskName}</td>
              <td className="col">{task.taskCompletionDate}</td>
              <td className="col">
                <select
                  class="form-select"
                  aria-label="Default select example"
                  onClick={(e) => setStatus(e.target.value)}
                  disabled={disabled}
                >
                  <option value={task.taskUpdates} selected>
                    {task.taskUpdates}
                  </option>
                  <option value="IN PROGRESS">IN PROGRESS</option>
                  <option value="DEVELOPING">DEVELOPING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </td>
              {userType === 'EMPLOYEE' && (
                <td className="d-inline d-flex" key={index}>
                  <button
                    type="button"
                    class="btn btn-success mx-2"
                    onClick={() => setTaskUpdateData(task.taskId, status)}
                  >
                    Update
                  </button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      ></div>
    </div>
  )
}

export default Task
