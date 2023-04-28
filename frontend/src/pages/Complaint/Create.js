import "./Create.scss";

export function Create() {
  return (
    <div className="Create-Page">
      <form className="Create-Form">
        <h2>Enter your Complaint</h2>
        <label for="title">Title:</label>
        <input id="title" type="text" required />
        <label for="descitption">Description:</label>
        <textarea id="description" required />
        <button>Submit</button>
      </form>
    </div>
  );
}
