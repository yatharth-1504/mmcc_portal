import "./Create.scss";
import { useNavigate } from "react-router-dom";

export function Create() {

  const navigate = useNavigate()

  const onCreateComplaint = () => {
    console.log("complaint added")
    navigate('/complaints')
  }

  return (
    <div className="Create-Page">
      <form className="Create-Form" onSubmit={onCreateComplaint}>
        <h2>Enter your Complaint</h2>
        <label for="title">Title:</label>
        <input id="title" type="text" required />
        <label for="descitption">Description:</label>
        <textarea id="description" required />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
