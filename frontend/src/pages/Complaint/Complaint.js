import { Preview } from "../../components/Preview/Preview";
import { useFetch } from "../../hooks/fetch";
import { NavBar } from "../../components/Nav/NavBar";
import "./Complaint.scss";

export function Complaint() {
  let { complaints, isPending, errors } = useFetch(
    "http://localhost:3001/complaints"
  );

  const useFilters = () => {
    console.log("Filtering");
    ({ complaints, isPending, errors } = useFetch(
      "http://localhost:3001/complaints"
    ));
  };

  const useSort = () => {
    console.log("Sorting");
  };

  const buttons = [
    {
      id: 1,
      name: "Filters",
      conditions: ["All Complaints", "CMFGS", "MMCC"],
      method: useFilters,
    },
    {
      id: 2,
      name: "Sort By",
      conditions: ["Date(newest first)", "Date(oldest first)"],
      method: useSort,
    },
  ];

  return (
    <div className="Complaints">
      <NavBar buttons={buttons} />
      {isPending && <div className="Loading">Loading ...</div>}
      {errors && (
        <div className="Error">Errors in fetching the resource... :(</div>
      )}
      {!!complaints && <Preview complaints={complaints} />}
    </div>
  );
}
