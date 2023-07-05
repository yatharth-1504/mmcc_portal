/* eslint-disable no-loop-func */
import "./updateRole.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import Overlay from "../../../components/Overlay/Overlay";
import { useSelector } from "react-redux";
import { useUpdateRole } from "../../../hooks/update";

export default function UpdateRole() {
  const { state } = useLocation();
  const { token, userRole, userVerticle } = state;
  const { device } = useSelector((state) => state.windowSize);

  const [roll, setRoll] = useState("");
  const [role, setRole] = useState("");
  const [verticle, setVerticle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();

  const [updateRole] = useUpdateRole({
    variables: {
      updateRole: {
        roll: roll,
        role: role,
        verticle: verticle,
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const onUpdateRole = async (e) => {
    e.preventDefault();
    await updateRole();
    setRoll("");
    setRole("");
    setSubmitted(true);
  };

  return (
    <div className="Create-Page">
      <form className={`Create-Form ${device}`} onSubmit={onUpdateRole}>
        <h1>Update Role</h1>
        <label htmlFor="roll">Smail:</label>
        <input
          id="roll"
          type="text"
          required
          value={roll}
          placeholder="Enter the SMAIL here"
          onChange={(e) => setRoll(e.target.value)}
        />

        <label htmlFor="role">Role:</label>
        <select onChange={(e) => setRole(e.target.value)}>
          <option>-</option>
          {userRole === "ADMIN" && <option>HAS</option>}
          {(userRole === "ADMIN" || userRole === "HAS") && (
            <option>CORE</option>
          )}
          {(userRole === "ADMIN" ||
            userRole === "HAS" ||
            userRole === "CORE") && <option>SUPER_COORDINATOR</option>}
          <option>COORDINATOR</option>
        </select>

        <label htmlFor="verticle">Verticle:</label>
        <select onChange={(e) => setVerticle(e.target.value)}>
          <option>-</option>
          {userRole === "ADMIN" || userRole === "HAS" ? (
            <>
              <option>CMGFS</option>
              <option>MMCC</option>
            </>
          ) : (
            <option>{userVerticle}</option>
          )}
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
              <div className="submit-msg">Role Update Successfully</div>
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
