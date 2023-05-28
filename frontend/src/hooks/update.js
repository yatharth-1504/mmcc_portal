// Update roll, update status
import { useMutation, gql } from "@apollo/client";

const ASSIGN_COMPLAINT_MUTATION = gql`
  mutation Mutation($assignComplaint: AssignComplaintInput!) {
    assignComplaint(assignComplaint: $assignComplaint) {
      id
    }
  }
`;

export const useAssign = ({ variables, context }) => {
  let assign;
  return ([assign] = useMutation(ASSIGN_COMPLAINT_MUTATION, {
    variables,
    context,
  }));
};

const RESOLVE_COMPLAINT_MUTATION = gql`
  mutation ResolveComplaint($resolveComplaint: ResolveComplaintInput!) {
    resolveComplaint(resolveComplaint: $resolveComplaint)
  }
`;

export const useResolve = ({ variables, context }) => {
  let resolve;
  return ([resolve] = useMutation(RESOLVE_COMPLAINT_MUTATION, {
    variables,
    context,
  }));
};
