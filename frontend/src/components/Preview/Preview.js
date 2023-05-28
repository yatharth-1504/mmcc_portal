import { useState } from "react";
import { useAssign, useResolve } from "../../hooks/update";
import "./Preview.scss";
import Overlay from "../Overlay/Overlay";
import { useNavigate } from "react-router-dom";

export function Preview({ complaints, token }) {
  const [element, setElement] = useState("complaints");
  const [assignRoll, setAssignRoll] = useState();
  const [complaintId, setComplaintId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState('RESOLVED');

  const navigate = useNavigate()
  const validRollno = new RegExp('^[a-zA-Z].[0-9].[a-zA-Z][0-9]..$')

  const [assign] = useAssign({
    variables: {
      complaintId: complaintId,
      roll: assignRoll + '@smail.iitm.ac.in'
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const [resolve] = useResolve({
    variables: {
      complaintId: complaintId,
      proof: imageUrl,
      status: status
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  })

  const onAssign = async () => {
    if(validRollno.test(assignRoll)){
      const assignOutput = await assign();
      console.log("AssignOutput: ", assignOutput);
      setAssignRoll(null)
      setElement('complaints')
      navigate("/complaints", { state: { token: token } })
    }else{
      console.log("Invalid Roll no")
    }
  };

  const onAction = async () => {
    if(imageUrl === undefined || imageUrl === '' || imageUrl === null){
      console.log("Image Required")
    }else{
      const resolveOutput = await resolve()
      console.log("ResolveOutput: ", resolveOutput)
      setStatus('RESOLVED')
      setImageUrl(null)
      setElement('complaints')
      navigate("/complaints", { state: { token: token } })
    }
  };

  var openFile = function(file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function(){
      var dataURL = reader.result;
      var output = document.getElementById('output');
      output.src = dataURL;
      setImageUrl(dataURL)
    };
    reader.readAsDataURL(input.files[0]);
  };

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
                    setComplaintId(complaint.id)
                  }}
                >
                  Assign Complaint
                </div>
                <div
                  className="action button"
                  onClick={() => {
                    setElement("takeAction");
                    setComplaintId(complaint.id)
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
          closeFunction={() => {
            setElement("complaints")
            setImageUrl(null)
            setStatus('RESOLVED')
          }}
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
                    setImageUrl(null)
                    setStatus('RESOLVED')
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
                <input className="proofOfAction" type="file" accept="image/*" onChange={(e) => openFile(e)} id="uploadImage" name="myPhoto"/>
                <img className={`image ${imageUrl ? "" : "none"}`} id="output" alt=''/>
              </div>
              <select className="select" onChange={(e) => setStatus(e.target.value)}>
                <option>RESOLVED</option>
                <option>REJECTED</option>
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
