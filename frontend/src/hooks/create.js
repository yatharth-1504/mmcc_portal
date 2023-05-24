// all create functionaities here
import { useMutation, gql } from "@apollo/client";

const ADD_COMPLAINT_MUTATION = gql`
  mutation Mutation($complaint: CreateComplaintInput!) {
    addComplaint(complaint: $complaint) {
      id
      description
    }
  }
`;

export const useCreateComplaint = ({ variables }) => {
  let addComplaint;
  return ([addComplaint] = useMutation(ADD_COMPLAINT_MUTATION, { variables }));
};
