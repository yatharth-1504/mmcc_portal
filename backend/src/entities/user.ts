import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import Complaint from "./compliant";
import { UserRole, Verticle } from "../types/enums/user";
registerEnumType(UserRole, { name: "UserRole" });

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
  password: string;

  @Column()
  @Field()
  roll: string;

  @Column("enum", { enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column("enum", { nullable: true, enum: Verticle })
  verticle: Verticle;

  @OneToMany(() => Complaint, (complaint) => complaint.user, {
    nullable: true,
  })
  complaints: Complaint[];
}

export default User;
