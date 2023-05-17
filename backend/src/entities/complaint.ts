import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";
import { ComplaintStatus } from "../types/enums/complaint";
registerEnumType(ComplaintStatus, { name: "ComplaintStatus" });

@Entity("Complaint")
@ObjectType("Complaint")
class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  @ManyToOne(() => User, (user) => user.complaints, { nullable: true })
  user: User;

  @Column("enum", { enum: ComplaintStatus, default: ComplaintStatus.POSTED })
  @Field()
  status: ComplaintStatus;
}

export default Complaint;
