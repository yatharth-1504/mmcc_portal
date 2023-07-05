import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Complaint from "./complaint";
import { UserRole, Verticle } from "../types/enums/user";
import Permission from "./permission";
registerEnumType(UserRole, { name: "UserRole" });
registerEnumType(Verticle, { name: "Verticle" });

@Entity("User")
@ObjectType("User")
class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  roll: string;

  @Column("enum", { enum: UserRole, default: UserRole.USER })
  @Field()
  role: UserRole;

  @Column("enum", { nullable: true, enum: Verticle })
  @Field()
  verticle: Verticle;

  @OneToMany(() => Complaint, (complaint) => complaint.user, {
    nullable: true,
  })
  complaints: Complaint[];

  @OneToMany(
    () => Complaint,
    (complaintAssigned) => complaintAssigned.assignedTo,
    {
      nullable: true,
    }
  )
  complaintsAssigned: Complaint[];

  
  @ManyToOne(() => Permission, (permission) => permission.users, {
    nullable: true,
  })
  permission: Permission;
}

export default User;
