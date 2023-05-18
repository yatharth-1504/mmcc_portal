import { Arg, Authorized, Mutation, Resolver } from "type-graphql";
import Permission from "../entities/permission";
import { CreatePermissionInput } from "../types/inputs/permission";
import User from "../entities/user";
import { Raw } from "typeorm";
import { UserRole } from "../types/enums/user";

@Resolver(() => Permission)
class PermissionResolver {
  @Authorized(UserRole.ADMIN, UserRole.CORE, UserRole.SUPER_CORD, UserRole.HAS)
  @Mutation(() => Permission)
  async addPermission(
    @Arg("permission") permissionInput: CreatePermissionInput,
    @Arg("roll") roll: string
  ) {
    try {
      const _user = await User.findOne({ where: { roll } });
      if (!_user) throw new Error("Invalid Roll no.");
      const permission = await Permission.findOne({
        where: {
          updateRoleOf: Raw((alias) => `${alias} = :updateRoleOf`, {
            updateRoleOf: permissionInput.updateRoleOf,
          }),
          updateRoleTo: Raw((alias) => `${alias} = :updateRoleTo`, {
            updateRoleTo: permissionInput.updateRoleTo,
          }),
          assignComplaintsTo: Raw((alias) => `${alias} = :assignComplaintsTo`, {
            assignComplaintsTo: permissionInput.assignComplaintsTo,
          }),
        },
        relations: ["users"],
      });
      if (!!permission) {
        permission.users.push(_user);
        const permissionUpdated = await permission.save();
        return !!permissionUpdated;
      }
      const permissionCreated = await Permission.create({
        ...permissionInput,
        users: [_user],
      }).save();
      return !!permissionCreated;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }
}

export default PermissionResolver;
