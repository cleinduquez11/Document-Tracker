import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import Login from "./Components/Login";
import Layout from "./Layout";
import {BrowserRouter,Routes,Route} from "react-router-dom"; 
// import Home from "./Layout"; 
// import Login from "./Components/Login"; 
  
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
     <> 
      <BrowserRouter> 
      <Routes> 
        <Route exact path="/home" element={<Layout/>}/> 
        <Route exact path="/" element={<Login/>}/> 
      </Routes> 
      </BrowserRouter> 
      </> 
  </React.StrictMode>
);
