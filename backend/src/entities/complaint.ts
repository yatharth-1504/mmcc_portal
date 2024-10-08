import { Field, ObjectType, registerEnumType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import User from "./user";
import { ComplaintStatus } from "../types/enums/complaint";
import { Mess, Vendor } from "../types/enums/vendors";
import { Verticle } from "../types/enums/user";
registerEnumType(ComplaintStatus, { name: "ComplaintStatus" });
registerEnumType(Vendor, { name: "Vendor" });
registerEnumType(Mess, { name: "Mess" });

@Entity("Complaint")
@ObjectType("Complaint")
class Complaint extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  @Field()
  id: string;

  @Column()
  @Field()
  description: string;

  @Column()
  @Field()
  title: string;

  @Column("enum", { enum: Verticle })
  @Field()
  verticle: Verticle;

  @CreateDateColumn({ type: "timestamptz" })
  @Field(() => Date)
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.complaints, { nullable: true })
  @Field(() => User, { nullable: true })
  user: User;

  @ManyToOne(() => User, (assignedTo) => assignedTo.complaintsAssigned, {
    nullable: true,
  })
  assignedTo: User;

  @Column("enum", { enum: ComplaintStatus, default: ComplaintStatus.POSTED })
  @Field()
  status: ComplaintStatus;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  images: string | null;

  @Column({ type: "text", nullable: true })
  @Field(() => String, { nullable: true })
  proofImage: string | null;

  @Column({ nullable: true })
  @Field({ nullable: true })
  proofDesc: string;
}

export default Complaint;
