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
      let imageUrls = "";
      if (complaintInput.images) {
        imageUrls = complaintInput.images.join(" AND ");
      }
      const complaintCreated = await Complaint.create({
        title: complaintInput.title,
        description: complaintInput.description,
        status: ComplaintStatus.POSTED,
        verticle: complaintInput.verticle,
        images: imageUrls === "" ? null : imageUrls,
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
      const _user = await User.findOneOrFail({
        where: { roll: assignComplaintInput.roll },
      });
      if (!user.permission.assignComplaintsTo.includes(_user!.role))
        throw new Error("UnAuthorised");
      const complaint = await Complaint.findOneOrFail({
        where: { id: assignComplaintInput.complaintId },
      });
      if (_user!.verticle !== complaint.verticle)
        throw new Error("Invalid Vertical");
      complaint.status = ComplaintStatus.ASSIGNED;
      complaint.assignedTo = _user;
      const complaintUpdated = await complaint.save();
      return complaintUpdated;
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
      const complaint = await Complaint.findOneOrFail(
        resolveComplaintInput.complaintId,
        { relations: ["assignedTo"] }
      );
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
