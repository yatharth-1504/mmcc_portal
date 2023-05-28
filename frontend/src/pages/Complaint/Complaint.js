import { Preview } from "../../components/Preview/Preview";
import { useFetch, useGetMe } from "../../hooks/fetch";
import { NavBar } from "../../components/Nav/NavBar";
import { useEffect, useState } from "react";
import "./Complaint.scss";
import { useLocation } from "react-router-dom";

export function Complaint() {
  const { state } = useLocation();
  const { token } = state;

  const [filter, setFilter] = useState("All Complaints");
  const [sort, setSort] = useState("Date(newest first)");

  const { complaints, isPending, errors, user } = useFetch(filter, sort, token);

  console.log("User: ", user)

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
      <NavBar buttons={buttons} token={token} />
      <div className="complaints-wrapper">
        {isPending && <div className="Loading">Loading ...</div>}
        {errors && (
          <div className="Error">
            Errors in fetching the resource... :({errors}
          </div>
        )}
        { (complaints?.length === 0) ? 
          <div className="no-complaints">
            Have a Complaint ? Add it here
          </div> : null}
        {!!complaints && <Preview complaints={complaints} token={token}/>}
      </div>
    </div>
  );
}
