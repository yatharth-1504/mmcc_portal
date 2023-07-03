import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Complaint } from "./pages/Complaint/Complaint";
import { Create } from "./pages/Complaint/Create";
import { Login } from "./pages/Auth/Login";
import "./index.scss";
import UpdateRole from "./pages/Complaint/updateRole/updateRole";

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<Login/>} />
            <Route path="/create" element={<Create/>} />
            <Route path="/complaints" element={<Complaint/>} />
            <Route path="/updateRole" element={<UpdateRole/>}/>
          </Routes>
        </div>
    </Router>
  );
}

export default App;
