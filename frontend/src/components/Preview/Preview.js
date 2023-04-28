import "./Preview.scss";

export function Preview({ complaints }) {
  return (
    <div className="Preview">
      {complaints.map((complaint) => (
        <div className="Complaint" key={complaint.id}>
          <div className="Complaint-Img">
            <img
              className="Image"
              src={complaint.image}
              alt={complaint.title}
            />
          </div>
          <div className="Complaint-Text">
            <h2>{complaint.title}</h2>
            <p>{complaint.description}</p>
            <p>Raised By: {complaint.raisedBy}</p>
            <p>Time: {complaint.time}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
