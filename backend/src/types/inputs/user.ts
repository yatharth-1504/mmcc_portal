import { Field, InputType } from "type-graphql";

@InputType()
class LoginInput {
  @Field()
  roll: string;

  @Field()
  password: string;
}

export { LoginInput };
