import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom"
import './App.css';
import Home from './component/home';
import EmpLogin from './component/emp-login';
import MangLogin from './component/man-login';
import AdmLogin from './component/adm-login';
import EmpDashboard from './component/EmpDashboard';
import MangDashboard from './component/MangDashboard';
import AdmDashboard from './component/AdmDashboard';

//import AddEmp from './component/AddEmp';
// import {NavBar} from './component/Navbar';




function App() {

  

  return (
    
    <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Navigate to="/home"/>}/>
          <Route exact path="/home" element={<Home/>} />
          <Route exact path="/emp-login" element={<EmpLogin/>} />
          <Route exact path="/man-login" element={<MangLogin/>} />
          <Route exact path="/adm-login" element={<AdmLogin/>} />
          <Route exact path="/emp-dashboard/*" element={<EmpDashboard/>} />
          <Route exact path="/mang-dashboard/*" element={<MangDashboard/>} />
          <Route exact path="/adm-dashboard/*" element={<AdmDashboard/>} />
        </Routes>
      </BrowserRouter>
  );
}

export default App;
