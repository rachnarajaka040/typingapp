import React, { useState } from "react";
import "../App.css";
import { useDispatch } from "react-redux";
import { getSettings } from "../redux/Settings/Actions";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const [timer, setTimer] = useState();
  const [displaytext, setDisplaytext] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSettings = (event) => {
    event.preventDefault();

    let obj = {
      timer: timer,
      displaytext: displaytext,
    };

    dispatch(getSettings(obj));
    navigate("/");
  };

  return (
    <div className="form-login">
      <h2>Settings</h2>
      <form onSubmit={handleSettings}>
       <label>Set Timer:</label>
        <br />
        <input
          type="number"
          value={timer}
          onChange={(e) => setTimer(e.target.value)}
          min="1"
          max="10"
        />
        <br />
        <label>Set Display Text:</label>
        <br />
        <input
          type="text"
          value={displaytext}
          onChange={(e) => setDisplaytext(e.target.value)}
        />
        <br />
        <button type="submit">Save</button>
      </form>
    </div>
  );
};

export default Settings;
