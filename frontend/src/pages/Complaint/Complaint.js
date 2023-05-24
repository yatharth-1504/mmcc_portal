import { Preview } from "../../components/Preview/Preview";
import { useFetch } from "../../hooks/fetch";
import { NavBar } from "../../components/Nav/NavBar";
import { useState } from "react";
import "./Complaint.scss";

export function Complaint() {
  const [filter, setFilter] = useState("All Complaints");
  const [sort, setSort] = useState("Date(newest first)");

  const { complaints, isPending, errors } = useFetch(filter, sort);

  const useFilters = (value) => {
    setFilter(value);
  };

  const useSort = () => {
    setSort(sort);
  };

  const buttons = [
    {
      id: 1,
      name: "Filters",
      conditions: ["All Complaints", "CMGFS", "MMCC"],
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
        <div className="Error">
          Errors in fetching the resource... :({errors}
        </div>
      )}
      {!!complaints && <Preview complaints={complaints} />}
    </div>
  );
}
