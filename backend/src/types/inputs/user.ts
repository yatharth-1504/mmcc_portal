import { Field, InputType } from "type-graphql";
import { UserRole, Verticle } from "../enums/user";

@InputType()
class LoginInput {
  @Field()
  roll: string;

  @Field({ nullable: true })
  name: string;
}

@InputType()
class UpdateRoleInput {
  @Field()
  roll: string;

  @Field()
  role: UserRole;

  @Field({ nullable: true })
  verticle: Verticle;
}

export { LoginInput, UpdateRoleInput };
