import "./Preview.scss";

export function Preview({ complaints }) {
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
            <h2>{complaint.title}</h2>
            <p>{complaint.description}</p>
            {/* <p>Raised By: {complaint.user.id}</p> */}
            <p>Time: {complaint.createdAt}</p>
            <h3>Status: {complaint.status}</h3>
          </div>
        </div>
      ))}
    </div>
  );
}
