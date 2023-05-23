import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Complaint } from "./pages/Complaint/Complaint";
import { Create } from "./pages/Complaint/Create";
import { Login } from "./pages/Auth/Login";
import "./index.scss";

function App() {
  return (
    <Router>
        <div className="App">
          <Routes>
            <Route exact path="/create" Component={Create} />
            <Route exact path="/login" Component={Login} />
            <Route exact path="/complaints" Component={Complaint} />
          </Routes>
        </div>
    </Router>
  );
}

export default App;
