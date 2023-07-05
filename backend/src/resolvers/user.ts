import User from "../entities/user";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import LoginOutput from "../types/objects/user";
import MyContext from "../utils/context";
import {
  LoginInput,
  UpdateRoleInput,
} from "../types/inputs/user";
import jwt from "jsonwebtoken";
import { usersDevList } from "../utils";
import { UserRole } from "../types/enums/user";

@Resolver(() => User)
class UserResolver {
  @Mutation(() => LoginOutput)
  async login(@Arg("login") { roll, name }: LoginInput) {
    try {
      const user = await User.findOne({ where: { roll: roll } });
      let newUser;
      if (!user) {
        if (usersDevList.filter((u) => u.roll === roll).length)
          newUser = await User.create({
            roll,
            name,
            role: UserRole.ADMIN,
          }).save();
        else newUser = await User.create({ roll, name }).save();
      }
      let token = jwt.sign(
        newUser ? newUser.id : user!.id,
        process.env.JWT_SECRET!
      );
      return { token: token, status: true };
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Mutation(() => Boolean)
  @Authorized([UserRole.ADMIN])
  async addTestUsers() {
    try {
      if (process.env.NODE_ENV !== "production") {
        const users = await Promise.all(
          usersDevList.map(
            async (_user) =>
              await User.create({
                roll: _user.roll,
                name: _user.name,
                role: UserRole.ADMIN,
              }).save()
          )
        );
        if (!!users) return true;
      }
      return false;
    } catch (e) {
      throw new Error(`error : ${e}`);
    }
  }

  @Query(() => User)
  @Authorized()
  async getMe(@Ctx() { user }: MyContext) {
    return user;
  }

  @Mutation(() => User)
  @Authorized([
    UserRole.ADMIN,
    UserRole.CORE,
    UserRole.SUPER_CORD,
    UserRole.HAS,
  ])
  async updateUserRole(
    // @Ctx() { user }: MyContext,
    @Arg("updateRole") updateRoleInput: UpdateRoleInput
  ) {
    try {
      // if (!user.permission.updateRoleTo.includes(updateRoleInput.role))
      //   throw new Error("Invalid Role");
      const _user = await User.findOne({
        where: { roll: updateRoleInput.roll },
      });
      // if (!user.permission.updateRoleOf.includes(_user!.role))
      //   throw new Error("UnAuthorised");
      _user!.role = updateRoleInput.role;
      _user!.verticle = updateRoleInput.verticle;
      const userUpdated = await _user!.save();
      return userUpdated;
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default UserResolver;
