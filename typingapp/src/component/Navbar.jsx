import React from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
const Navbar = () => {
  const navigate = useNavigate();
  
  const handleClick = () => {
   
      navigate("/settings");
   
  };

  return (
    <div className="nav">
      <div onClick={() => navigate("/")}>
       
        <h2 className="touch">TOUCH-TYPING</h2>
      </div>

        <div>
          <a href="/settings" onClick={handleClick} className="settings">
           Settings
          </a>
        
        </div>
      </div>
  );
};

export default Navbar;
