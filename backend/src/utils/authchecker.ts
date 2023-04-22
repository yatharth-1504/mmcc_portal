import MyContext from "./context";

import { AuthChecker } from "type-graphql";

const authChecker: AuthChecker<MyContext> = async (
  { context: { user } },
  roles
) => {
  if (!user) return false;
  if (!roles || roles.length == 0) return true;
  if (!roles.includes(user.role)) return false;
  return true;
};

export default authChecker;
