import "./Create.scss";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { useCreateComplaint } from "../../hooks/post";
import Overlay from "../../components/Overlay/Overlay";

export function Create() {
  const { state } = useLocation();
  const { token } = state;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [verticle, setVerticle] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const navigate = useNavigate();
  const [addComplaint] = useCreateComplaint({
    variables: {
      complaint: {
        title: title,
        description: description,
        verticle: verticle,
        images: [
          "data:image/png;base64,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",
        ],
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
    setSubmitted(true)
  };

  return (
    <div className="Create-Page">
      <form className="Create-Form" onSubmit={onCreateComplaint}>
        <h2>Enter your Complaint</h2>
        <label htmlFor="title">Title:</label>
        <input
          id="title"
          type="text"
          required
          value={title}
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
        />
        <label htmlFor="verticle">Verticle:</label>
        <input
          id="verticle"
          type="text"
          required
          value={verticle}
          onChange={(e) => setVerticle(e.target.value)}
        />

        <div className="upload-images">Upload images (optional)</div>
        <input type="file"/>
        <button type="submit">Submit</button>
      </form>

      { submitted ?
        <Overlay
          title={"Submitted Successfully"}
          closeFunction={() => navigate("/complaints", { state: { token: token } })}
          children={
            <div className="submit-overlay">
              <div className="submit-msg">
                Your Complaint was successfully submitted. Necessary action will be taken
              </div>
              <div className="close-btn" onClick={() => navigate("/complaints", { state: { token: token } })}>Close</div>
            </div>
          }
        /> : null
      }
    </div>
  );
}
