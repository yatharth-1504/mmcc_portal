/* eslint-disable no-loop-func */
import "./updateRole.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Overlay from "../../../components/Overlay/Overlay";
import { useSelector } from "react-redux";

export default function UpdateRole() {
  const { state } = useLocation();
  const { token } = state;

  const {device} = useSelector((state) => state.windowSize)

  const [roll, setRoll] = useState("");
  const [role, setRole] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const onUpdateRole = async (e) => {
    e.preventDefault();
    //TODO: Write the update role function here
    setRoll("");
    setRole();
    setSubmitted(true)
  };

  return (
    <div className="Create-Page">
      <form className={`Create-Form ${device}`} onSubmit={onUpdateRole}>
        <h1>Update Role</h1>
        <label htmlFor="roll">Roll no:</label>
        <input
          id="roll"
          type="text"
          required
          value={roll}
          placeholder="Enter the roll number here"
          onChange={(e) => setRoll(e.target.value)}
        />

        <label htmlFor="verticle">Role:</label>

        <select onChange={(e) => setRole(e.target.value)}>
          <option>HAS</option>
          <option>CORE</option>
          <option>SUPER_COORDINATOR</option>
          <option>CORDINATOR</option>
        </select>
        
        <div className="btn-wrapper">
          <button className="submit-btn" type="submit">
            Submit
          </button>
        </div>
      </form>

      {submitted ? (
        <Overlay
          title={"Submitted Successfully"}
          closeFunction={() =>
            navigate("/complaints", { state: { token: token } })
          }
          children={
            <div className="submit-overlay">
              <div className="submit-msg">
                Role Update Successfully
              </div>
              <div
                className="close-btn"
                onClick={() =>
                  navigate("/complaints", { state: { token: token } })
                }
              >
                Close
              </div>
            </div>
          }
        />
      ) : null}
    </div>
  );
}
