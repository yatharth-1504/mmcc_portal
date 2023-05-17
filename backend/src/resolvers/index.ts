import ComplaintResolver from "./complaint";
import PermissionResolver from "./permission";
import UserResolver from "./user";

export default [UserResolver, ComplaintResolver, PermissionResolver] as const;
