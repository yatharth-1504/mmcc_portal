import { UserRole } from "src/types/enums/user";
import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("Permission")
@ObjectType("Permission")
export class Permission extends BaseEntity{
    @PrimaryGeneratedColumn("uuid")
    @Field()
    id: string

    @Column({
        type: 'enum',
        enum: UserRole,
        default: [],
        array: true
    })
    @Field()
    updateRoleTo: UserRole[]

    @Column({
        type: 'enum',
        enum: UserRole,
        default: [],
        array: true
    })
    @Field()
    updateRoleOf: UserRole[]

    
}