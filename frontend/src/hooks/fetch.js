import { useState, useEffect } from "react";

const filteringConditions = {
  verticle: null,
  status: null,
  myComplaints: false,
  search: null,
};

const sortConditions = {
  createdAt: true,
};

const _COMPLAINTS_QUERY = `query GetComplaints($sortConditions: SortConditions!, $filteringConditions: FilteringConditions!) {
  getComplaints(sortConditions: $sortConditions, filteringConditions: $filteringConditions) {
    id
    title
    description
    createdAt
    images
    verticle
    status
  }
}
`;

const url = "http://localhost:8000/graphql";

export function useFetch(filter, sort) {
  const [complaints, setComplaints] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState(false);

  if (filter === "MMCC") {
    filteringConditions.verticle = "MMCC";
  }

  if (filter === "CMGFS") {
    filteringConditions.verticle = "CMGFS";
  }

  if (sort === "Date(oldest first)") {
    sortConditions.createdAt = false;
  }

  useEffect(() => {
    fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: _COMPLAINTS_QUERY,
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
        setComplaints(res_data.data.getComplaints);
        setIsPending(false);
      })
      .catch((e) => {
        console.log(e);
        setErrors(true);
        setIsPending(false);
      });
  }, [filter, sort]);

  return { complaints, isPending, errors };
}
