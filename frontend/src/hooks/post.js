// Create complaint, login
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

// Login
const LOGIN_MUTATION = gql`
  mutation Login($login: LoginInput!) {
    login(login: $login) {
      token
      status
    }
  }
`;

export const useLogin = ({ variables }) => {
  let login;
  return ([login] = useMutation(LOGIN_MUTATION, { variables }));
};
