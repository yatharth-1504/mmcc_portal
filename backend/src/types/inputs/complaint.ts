import { Field, InputType } from "type-graphql";
import { Verticle } from "../enums/user";
import { ComplaintStatus } from "../enums/complaint";

@InputType()
class CreateComplaintInput {
  @Field()
  description: string;

  @Field()
  verticle: Verticle;
  // TODO: Add more Fields Latter
}

@InputType()
class FilteringConditions {
  @Field({ nullable: true })
  search: string;

  @Field({ nullable: true })
  status: ComplaintStatus;

  @Field({ nullable: true })
  verticle: Verticle;

  @Field({ nullable: true })
  myComplaints: boolean;
}

@InputType()
class SortConditions {
  @Field({ nullable: true })
  createdAt: boolean;
}

@InputType()
class AssignComplaintInput {
  @Field()
  complaintId: string;

  @Field()
  roll: string;
}

@InputType()
class ResolveComplaintInput {
  @Field()
  complaintId: string;

  @Field()
  proof: string;

  @Field()
  status: ComplaintStatus;
}

export {
  CreateComplaintInput,
  FilteringConditions,
  SortConditions,
  AssignComplaintInput,
  ResolveComplaintInput,
};
