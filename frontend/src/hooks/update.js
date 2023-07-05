// Update roll, update status
import { useMutation, gql } from "@apollo/client";

const ASSIGN_COMPLAINT_MUTATION = gql`
  mutation Assign($assignComplaint: AssignComplaintInput!) {
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

const UPDATE_ROLE_MUTATION = gql`
  mutation UpdateUserRole($updateRole: UpdateRoleInput!) {
    updateUserRole(updateRole: $updateRole) {
      id
    }
  }
`;

export const useUpdateRole = ({ variables, context }) => {
  let resolve;
  return ([resolve] = useMutation(UPDATE_ROLE_MUTATION, {
    variables,
    context,
  }));
};
