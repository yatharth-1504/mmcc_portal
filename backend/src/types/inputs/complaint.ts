import { Field, InputType } from "type-graphql";

@InputType()
class CreateComplaintInput {
  @Field()
  description: string;

  // Add more Fields Latter
}

export { CreateComplaintInput };
