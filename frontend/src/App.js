import React from "react";
import "antd/dist/antd.css";
import "./App.css";
import CustomForm from "./form";
import { BrowserRouter as Router, Route } from "react-router-dom";
import UserData from "./userdata";
function App() {
  return (
    <Router>
      <div className="App">
        {/* get user data */}
        <Route path="/" exact component={CustomForm} />

        {/* show encrypted data */}
        <Route path="/showdata/:username/" component={UserData} />
      </div>
    </Router>
  );
}

export default App;
