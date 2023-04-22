import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import Complaint from "../entities/compliant";
import MyContext from "../utils/context";
import { CreateComplaintInput } from "../types/inputs/complaint";

@Resolver(() => Complaint)
class ComplaintResolver {
  @Authorized()
  @Mutation(() => Complaint)
  async addComplaint(
    @Arg("complaint") complaintInput: CreateComplaintInput,
    @Ctx() { user }: MyContext
  ) {
    try {
      const complaintCreated = await Complaint.create({
        description: complaintInput.description,
        user,
      }).save();
      return complaintCreated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }
}

export default ComplaintResolver;
