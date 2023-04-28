import { useState, useEffect } from "react";

export function useFetch(url) {
  const [complaints, setComplaints] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [errors, setErrors] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            setErrors(true);
            setIsPending(false);
          }
          console.log(response);
          return response.json();
        })
        .then((res_data) => {
          setComplaints(res_data);
          setIsPending(false);
        })
        .catch((e) => {
          setErrors(true);
          setIsPending(false);
        });
    }, 1000);
  }, [url]);

  return { complaints, isPending, errors };
}
