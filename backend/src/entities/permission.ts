import {UserRole} from "../types/enums/user";
import {Field, ObjectType} from "type-graphql";
import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import User from "./user";

@Entity("Permission")
@ObjectType("Permission")
class Permission extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column({
    type: "enum",
    enum: UserRole,
    default: [],
    array: true,
  })
  @Field(() => [UserRole])
  updateRoleTo: UserRole[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: [],
    array: true,
  })
  @Field(() => [UserRole])
  updateRoleOf: UserRole[];

  @Column({
    type: "enum",
    enum: UserRole,
    default: [],
    array: true,
  })
  @Field(() => [UserRole])
  assignComplaintsTo: UserRole[];

  @OneToMany(() => User, user => user.permission, {nullable: true})
  users: User[]
}

export default Permission;
