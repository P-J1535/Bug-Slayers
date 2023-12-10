import React from "react";
// import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Table from "./components/Table/Table";


// import LoginAndSignUp from "./components/Login&SignUp/LoginAndSignUp";
// import Cards from "./components/Cards.js/Cards";
// import CreatQuestion from "./components/CreatQuestion/CreatQuestion";

// import Login from './Login/Login';

function App() {
  return (
    // <Router>
    //   <div style={{ backgroundColor: 'white' }}>
    //     <Routes>
    //     <Route exact path="/*" element={<LoginAndSignUp/>} />
    //     <Route path="/cards" element={<Cards/>} />
    //     {/* Add more Route components for other routes */}
    //     </Routes>
    //   </div>
    // </Router>
    // <Login/>
      <Table/>
    // <CreatQuestion/>
  );
}

export default App;
