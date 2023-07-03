import { useState } from "react";
import { useAssign, useResolve } from "../../hooks/update";
import "./Preview.scss";
import Overlay from "../Overlay/Overlay";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import MMCC from '../../assets/mmcc.jpg'
import CMGFS from '../../assets/cmgfs.png'

export function Preview({ complaints, token, user }) {
  const [element, setElement] = useState("complaints");
  const [assignRoll, setAssignRoll] = useState();
  const [complaintId, setComplaintId] = useState();
  const [imageUrl, setImageUrl] = useState();
  const [status, setStatus] = useState("RESOLVED");
  const [rollErr, setRollErr] = useState(false)

  const navigate = useNavigate();
  const validRollno = new RegExp("^[a-zA-Z].[0-9].[a-zA-Z][0-9]..$");
  const {device} = useSelector((state) => state.windowSize)

  const [assign] = useAssign({
    variables: {
      assignComplaint: {
        complaintId: complaintId,
        roll: assignRoll + "@smail.iitm.ac.in",
      },
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
      resolveComplaint: {
        complaintId: complaintId,
        proof: imageUrl,
        status: status,
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const onSuccessOverlayClose = () => {
    setElement("complaints");
    navigate("/complaints", { state: { token: token } });
  } 

  const onAssign = async () => {
    if (validRollno.test(assignRoll)) {
      const assignOutput = await assign();
      console.log("AssignOutput: ", assignOutput);
      setAssignRoll(null);
      setElement('assignSuccess')
    } else {
      console.log("Invalid Roll no");
      setRollErr(true)
    }
  };

  const onAction = async () => {
    if (imageUrl === undefined || imageUrl === "" || imageUrl === null) {
      console.log("Image Required");
    } else {
      const resolveOutput = await resolve();
      console.log("ResolveOutput: ", resolveOutput);
      setStatus("RESOLVED");
      setImageUrl(null);
      setElement('actionSuccess')
    }
  };

  var openFile = function (file) {
    var input = file.target;
    var reader = new FileReader();
    reader.onload = function () {
      var dataURL = reader.result;
      var output = document.getElementById("output");
      output.src = dataURL;
      setImageUrl(dataURL);
    };
    reader.readAsDataURL(input.files[0]);
  };

  return (
    <div className="Preview">
      {complaints.map((complaint) => (
        <div className={`Complaint ${device}`} key={complaint.id}>
          <div className={`Complaint-Img ${device}`}>
            <div className="title">Complaint image: </div>
            {complaint.images ? 
              <img
                className="Image"
                src={complaint.images}
                alt={complaint.title}
              />: complaint.verticle === "MMCC" ? 
              <img
                className="Image logo"
                src={MMCC}
                alt="MMCC"
              />:
              <img
                className="Image logo"
                src={CMGFS}
                alt="MMCC"
              />
            }

            {(complaint.proofImage || complaint.proofDesc) ? 
              <div className="title">Proof of Action: </div> : null
            }
            {complaint.proofImage ? 
              <img
                className="Image"
                src={complaint.proof}
                alt="Proof of Resolution"
              /> : null
            }

            {complaint.proofDesc ? 
              <div className="proofDesc">
                {complaint.proofDesc}
              </div> : null
            }
          </div>
          <div className="Complaint-Text">
            <div className="complaint-header">
              <div className="title">{complaint.title}</div>
              <div className="desc">{complaint.description}</div>
            </div>
            <div className="complaint-footer">
              <div className="user-side">
                <div className="time">
                  <b>Posted at:</b> {complaint.createdAt.split("T")[0]}
                </div>
              </div>

              {user.role === 'USER' ? null : 
                <div className="admin-side">
                  <div
                    className="assign button"
                    onClick={() => {
                      setElement("assignComplaint");
                      setComplaintId(complaint.id);
                    }}
                  >
                    Assign Complaint
                  </div>
                  <div
                    className="action button"
                    onClick={() => {
                      setElement("takeAction");
                      setComplaintId(complaint.id);
                    }}
                  >
                    Take Action
                  </div>
                </div>
              }

              {(user.role === 'USER') ?
                <div className={`status ${complaint.status}`}>{complaint.status}</div>
              : null}

            </div>
          </div>
        </div>
      ))}

      {element === "assignComplaint" ? (
        <Overlay
          title={"Assign Complaint"}
          closeFunction={() => {
            setElement("complaints");
            setImageUrl(null);
            setStatus("RESOLVED");
            setRollErr(false)
          }}
          children={
            <div className="assign-overlay" id="assign-overlay">
              <input
                className={`roll-input ${rollErr ? "error" : ""}`}
                placeholder="Enter the roll no you want to assign it to"
                onChange={(e) => {
                  setAssignRoll(e.target.value);
                  setRollErr(false)
                }}
                required
                autoFocus={true}
              />
              {rollErr ? <div className="error-msg">{"Please enter a valid roll number"}</div> : null}
              <div className="btns">
                <div
                  className="cancel-btn"
                  onClick={() => {
                    setImageUrl(null);
                    setStatus("RESOLVED");
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
                <input
                  className="proofOfAction"
                  type="file"
                  accept="image/*"
                  onChange={(e) => openFile(e)}
                  id="uploadImage"
                  name="myPhoto"
                />
                <img
                  className={`image ${imageUrl ? "" : "none"}`}
                  id="output"
                  alt=""
                />
              </div>
              <select
                className="select"
                onChange={(e) => setStatus(e.target.value)}
              >
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
      ) : (element === 'assignSuccess') ? 
          <Overlay
            title={"Complaint assigned successfully"}
            closeFunction={onSuccessOverlayClose}
            children={
              <div className="success-overlay">
                <div className="success-msg">{`Complaint assigned successfully to ${assignRoll}`}</div>
                <div className="button" onClick={onSuccessOverlayClose}>Close</div>
              </div>
            }
          />
      : (element === 'actionSuccess') ? 
          <Overlay
            title={"Action taken successfully"}
            closeFunction={onSuccessOverlayClose}
            children={
              <div className="success-overlay">
                <div className="success-msg">{`Complaint ${status} successfully`}</div>
                <div className="button" onClick={onSuccessOverlayClose}>Close</div>
              </div>
            }
          />
      :null}
    </div>
  );
}
