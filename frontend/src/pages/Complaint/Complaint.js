import { Preview } from "../../components/Preview/Preview";
import { useFetch } from "../../hooks/fetch";
import { NavBar } from "../../components/Nav/NavBar";
import "./Complaint.scss";

export function Complaint() {

  const buttons = [
    {
      name: "Filters",
      conditions: ["All Complaints", "CMFGS", "MMCC"],
    },
    {
      name: "Sort By",
      conditions: ["Date(newest first)", "Date(oldest first)"],
    },
  ];

  const { complaints, isPending, errors } = useFetch(
    "http://localhost:3001/complaints"
  );

  return (
    <div className="Complaints">
      <NavBar buttons={buttons} />
      {isPending && <div className="Loading">Loading ...</div>}
      {errors && (
        <div className="Error">Errors in fetching the resource... :({errors}</div>
      )}
      {!!complaints && <Preview complaints={complaints} />}
    </div>
  );
}
