import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import Complaint from "../entities/complaint";
import MyContext from "../utils/context";
import {
  AssignComplaintInput,
  CreateComplaintInput,
  FilteringConditions,
  ResolveComplaintInput,
  SortConditions,
} from "../types/inputs/complaint";
import { ComplaintStatus } from "../types/enums/complaint";
import { UserRole } from "../types/enums/user";
import User from "../entities/user";

@Resolver(() => Complaint)
class ComplaintResolver {
  @Mutation(() => Complaint)
  @Authorized()
  async addComplaint(
    @Arg("complaint") complaintInput: CreateComplaintInput,
    @Ctx() { user }: MyContext
  ) {
    try {
      const complaintCreated = await Complaint.create({
        description: complaintInput.description,
        status: ComplaintStatus.POSTED,
        verticle: complaintInput.verticle,
        user,
      }).save();
      return complaintCreated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Query(() => [Complaint])
  @Authorized()
  async getComplaints(
    @Arg("filteringConditions") filters: FilteringConditions,
    @Ctx() { user }: MyContext,
    @Arg("sortConditions") sort: SortConditions
  ) {
    try {
      // sort condition
      let complaints = await Complaint.find({
        order: { createdAt: sort.createdAt == false ? "ASC" : "DESC" },
        relations: ["user"],
      });
      // filters
      if (filters.search) {
        complaints = complaints.filter((complaint) =>
          JSON.stringify(complaint)
            .toLowerCase()
            .includes(filters.search.toLowerCase())
        );
      }
      if (filters.status) {
        complaints = complaints.filter(
          (complaint) => complaint.status === filters.status
        );
      }
      if (filters.myComplaints) {
        complaints = complaints.filter(
          (complaint) => complaint.user.id === user.id
        );
      }
      if (filters.verticle) {
        complaints = complaints.filter(
          (complaint) => complaint.verticle === filters.verticle
        );
      }
      return complaints;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Mutation(() => Complaint)
  @Authorized([
    UserRole.ADMIN,
    UserRole.CORE,
    UserRole.SUPER_CORD,
    UserRole.HAS,
  ])
  async assignComplaint(
    @Ctx() { user }: MyContext,
    @Arg("assignComplaint") assignComplaintInput: AssignComplaintInput
  ) {
    try {
      const _user = await User.findOne({
        where: { roll: assignComplaintInput.roll },
      });
      if (!_user) throw new Error("Invalid Roll no.");
      if (!user.permission.assignComplaintsTo.includes(_user.role))
        throw new Error("UnAuthorised");
      const complaint = await Complaint.findOne({
        where: { id: assignComplaintInput.complaintId },
      });
      if (!complaint) throw new Error("Invalid Complaint Id");
      complaint.status = ComplaintStatus.ASSIGNED;
      complaint.assignedTo = _user;
      const complaintUpdated = await complaint.save();
      return !!complaintUpdated;
    } catch (e) {
      throw new Error(e);
    }
  }

  @Mutation(() => Boolean)
  @Authorized([
    UserRole.ADMIN,
    UserRole.CORE,
    UserRole.SUPER_CORD,
    UserRole.HAS,
    UserRole.CORD,
  ])
  async resolveComplaint(
    @Ctx() { user }: MyContext,
    @Arg("resolveComplaint") resolveComplaintInput: ResolveComplaintInput
  ) {
    try {
      const complaint = await Complaint.findOne(
        resolveComplaintInput.complaintId,
        { relations: ["assignedTo"] }
      );
      if (!complaint) throw new Error("Invalid Complaint Id");
      if (user.id !== complaint.assignedTo.id) throw new Error("UnAuthorised");
      complaint.status = resolveComplaintInput.status;
      complaint.proof = resolveComplaintInput.proof;
      const complaintUpdated = await complaint.save();
      return !!complaintUpdated;
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default ComplaintResolver;
