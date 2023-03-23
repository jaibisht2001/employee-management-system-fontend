import React from "react";
import { Routes ,Route} from "react-router-dom";
import './AdmDashboard.css';
import NavBar from "./Navbar";
import AddEmp from './AddEmp.js'
import AddMang from "./AddMang.js";


function AdmDashboard()
{
    return(
        <div className="AdmDashboard">
            <NavBar/>
            <Routes>
                <Route path="/addemployee" element={<AddEmp />} />
                <Route path="/addmanager" element={<AddMang/>} />
            </Routes>
        </div>
    )
}

export default AdmDashboard