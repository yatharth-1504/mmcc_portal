import { useState } from "react";
import { useAssign } from "../../hooks/update";
import "./Preview.scss";
import Overlay from "../Overlay/Overlay";

export function Preview({ complaints }) {
  const [element, setElement] = useState("complaints");
  const [assignRoll, setAssignRoll] = useState();

  const [assign] = useAssign({
    variables: {
      // add complaint id
    },
    // add header,
  });

  const onAssign = async () => {
    // await assign();
    console.log("hi");
  };

  const onAction = () => {};

  return (
    <div className="Preview">
      {complaints.map((complaint) => (
        <div className="Complaint" key={complaint.id}>
          <div className="Complaint-Img">
            <img
              className="Image"
              src={complaint.images}
              alt={complaint.title}
            />
          </div>
          <div className="Complaint-Text">
            <div className="complaint-header">
              <div className="title">{complaint.title}</div>
              <div className="desc">{complaint.description}</div>
            </div>
            {/* <p>Raised By: {complaint.user.id}</p> */}
            <div className="complaint-footer">
              <div className="user-side">
                <div className="time">
                  <b>Posted at:</b> {complaint.createdAt.split("T")[0]}
                </div>
                <div className="status">
                  <b>Status:</b> {complaint.status}
                </div>
              </div>

              <div className="admin-side">
                <div
                  className="assign button"
                  onClick={() => {
                    setElement("assignComplaint");
                  }}
                >
                  Assign Complaint
                </div>
                <div
                  className="action button"
                  onClick={() => {
                    setElement("takeAction");
                  }}
                >
                  Take Action
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {element === "assignComplaint" ? (
        <Overlay
          title={"Assign Complaint"}
          closeFunction={() => setElement("complaints")}
          children={
            <div className="assign-overlay">
              <input
                className="roll-input"
                placeholder="Enter the roll no you want to assign it to"
                onChange={(e) => {
                  setAssignRoll(e.target.value);
                }}
                required
                autoFocus={true}
              />
              <div className="btns">
                <div
                  className="cancel-btn"
                  onClick={() => {
                    setElement("complaints");
                  }}
                >
                  Cancel
                </div>
                <div className="assign-btn" onClick={onAssign}>
                  Assign Complaint
                </div>
              </div>
            </div>
          }
        />
      ) : element === "takeAction" ? (
        <Overlay
          title={"Take Action"}
          closeFunction={() => setElement("complaints")}
          children={
            <div className="action-overlay">
              <div className="proof">
                Upload proof of action
                <input type="file" className="proofOfAction" />
              </div>
              <select className="select">
                <option>Resolve</option>
                <option>Reject</option>
              </select>

              <div className="btns">
                <div
                  className="cancel-btn"
                  onClick={() => {
                    setElement("complaints");
                  }}
                >
                  Cancel
                </div>
                <div className="assign-btn" onClick={onAction}>
                  Take Action
                </div>
              </div>
            </div>
          }
        />
      ) : null}
    </div>
  );
}
