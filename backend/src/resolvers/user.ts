import User from "../entities/user";
import bcryptjs from "bcryptjs";
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import LoginOutput from "../types/objects/user";
import MyContext from "../utils/context";
import { LoginInput, UpdateRoleInput } from "../types/inputs/user";
import jwt from "jsonwebtoken";
import { usersDevList, validateUpdateRole } from "../utils";
import {UserRole } from "../types/enums/user"

@Resolver(() => User)
class UserResolver {
  @Mutation(() => LoginOutput)
  async login(@Arg("login") { roll, password }: LoginInput) {
    try {
      const user = await User.findOne({ where: { roll: roll } });
      if (!user) throw new Error("Invalid Email");
      const passwordIsValid =
        process.env.NODE_ENV === "production"
          ? bcryptjs.compareSync(password, user.password)
          : password === user.password;
      if (!passwordIsValid) throw new Error("Invalid Credentials");
      let token = jwt.sign(user.id, process.env.JWT_SECRET!);
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
                password: _user.pass,
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
    @Ctx() { user }: MyContext,
    @Arg("updateRole") { roll, role, verticle }: UpdateRoleInput
  ) {
    const _user = await User.findOne({ where: { roll: roll } });
    if (!_user) {
      throw new Error("Invalid roll no");
    }
    if (verticle !== user.verticle) {
      throw new Error("Invalid Verticle");
    }
    if (!validateUpdateRole(_user.role, user.role, role)) {
      throw new Error("Invalid Action");
    }
    _user.role = role;
    const userUpdated = await _user.save();
    return userUpdated;
  }
}

export default UserResolver;
