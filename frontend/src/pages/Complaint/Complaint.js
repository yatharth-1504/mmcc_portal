import { Preview } from "../../components/Preview/Preview";
import { useFetch } from "../../hooks/fetch";
import { NavBar } from "../../components/Nav/NavBar";
import { useState } from "react";
import "./Complaint.scss";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export function Complaint() {
  const { state } = useLocation();
  const { token } = state;

  const {device} = useSelector((state) => state.windowSize)

  const [filter, setFilter] = useState("All Complaints");
  const [sort, setSort] = useState("Date(newest first)");

  const { complaints, isPending, errors, user } = useFetch(filter, sort, token);

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
      {user ? (
        <div>
          <NavBar buttons={buttons} token={token} userRole={user.role} />
          <div className="complaints-wrapper">
            {isPending && <div className="Loading">Loading ...</div>}
            {errors && (
              <div className="Error">
                Errors in fetching the resource... :({errors}
              </div>
            )}
            {complaints?.length === 0 ? (
              <div className="no-complaints">
                Have a Complaint ? Add it here
                {/* <img src={require("../../assets//complaintsBG.png")} alt="bg" /> */}
              </div>
            ) : null}
            {!!complaints && (
              <Preview complaints={complaints} token={token} user={user} />
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
}
