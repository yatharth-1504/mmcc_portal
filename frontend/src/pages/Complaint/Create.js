import "./Create.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCreateComplaint } from "../../hooks/post";
import Overlay from "../../components/Overlay/Overlay";
import { useSelector } from "react-redux";

export function Create() {
  const { state } = useLocation();
  const { token } = state;

  const {device} = useSelector((state) => state.windowSize)

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [verticle, setVerticle] = useState("MMCC");
  const [imageUrl, setImageUrl] = useState();
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [addComplaint] = useCreateComplaint({
    variables: {
      complaint: {
        title: title,
        description: description,
        verticle: verticle,
        images: [imageUrl],
      },
    },
    context: {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    },
  });

  const onCreateComplaint = async (e) => {
    e.preventDefault();
    await addComplaint();
    setTitle("");
    setDescription("");
    setVerticle("");
    setSubmitted(true);
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
    <div className="Create-Page">
      <form className={`Create-Form ${device}`} onSubmit={onCreateComplaint}>
        <h1>Enter your Complaint</h1>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={title}
          placeholder="Enter the title here"
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="descitption">Description:</label>
        <textarea
          id="description"
          required
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
          }}
          placeholder="Enter the description here"
        />
        <label htmlFor="verticle">Verticle:</label>

        <select onChange={(e) => setVerticle(e.target.value)}>
          <option>MMCC</option>
          <option>CMGFS</option>
        </select>

        <div className="upload-images">Upload images (optional)</div>

        <label htmlFor="uploadImage" className="upload-button">Click here to upload images</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => openFile(e)}
          id="uploadImage"
          name="myPhoto"
          style={{display: "none"}}
        />
        <img className="image" id="output" alt="" />
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
                Your Complaint was successfully submitted. Necessary action will
                be taken
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
