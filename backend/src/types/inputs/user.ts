import { Field, InputType } from "type-graphql";

@InputType("LoginInput")
class LoginInput {
  @Field()
  roll: string;

  @Field()
  password: string;
}

export { LoginInput };
