import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";

let filteringConditions = {
  verticle: null,
  status: null,
  myComplaints: false,
  search: null,
};

const sortConditions = {
  createdAt: true,
};

const FETCH_QUERY = `query GetComplaints($sortConditions: SortConditions!, $filteringConditions: FilteringConditions!) {
  getComplaints(sortConditions: $sortConditions, filteringConditions: $filteringConditions) {
    id
    title
    description
    createdAt
    images
    verticle
    status
    proofImage
    proofDesc
  }
  getMe {
    id
    name
    roll
    role
    verticle
  }
}
`;

const url = "https://hostelaffairsiitm.com/api/graphql";
// const url = "http://localhost:8000/graphql";

export function useFetch(filter, sort, token, role) {
  const [complaints, setComplaints] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState(false);
  const [user, setUser] = useState(null);

  console.log("Fetching complaints 🙂");

  if (filter === "All" || filter === "") {
    filteringConditions = {
      verticle: null,
      status: null,
      myComplaints: false,
      search: null,
    };
  }

  if (filter === "MMCC") {
    filteringConditions.verticle = "MMCC";
  }

  if (filter === "CMGFS") {
    filteringConditions.verticle = "CMGFS";
  }

  if (sort === "Date(oldest first)") {
    sortConditions.createdAt = false;
  }

  if (sort === "None" || sort === "Date(newest first)") {
    sortConditions.createdAt = true;
  }

  // filteringConditions.myComplaints =
  //   role === "ADMIN" || role === "HAS" || role === "CORE" ? false : true;

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        query: FETCH_QUERY,
        variables: {
          filteringConditions,
          sortConditions,
        },
      }),
    })
      .then((response) => {
        if (!response.ok) {
          setErrors(true);
          setIsPending(false);
        }
        return response.json();
      })
      .then((res_data) => {
        setUser(res_data.data.getMe);
        setComplaints(res_data.data.getComplaints);
        setIsPending(false);
      })
      .catch((e) => {
        console.log(e);
        setErrors(true);
        setIsPending(false);
      });
  }, [filter, sort]);

  return { complaints, isPending, errors, user };
}
