import { Field, InputType } from "type-graphql";
import { UserRole } from "../enums/user";

@InputType()
class CreatePermissionInput {
  @Field(() => [UserRole])
  updateRoleTo: UserRole[];

  @Field(() => [UserRole])
  updateRoleOf: UserRole[];

  @Field(() => [UserRole])
  assignComplaintsTo: UserRole[];
}

export { CreatePermissionInput };
