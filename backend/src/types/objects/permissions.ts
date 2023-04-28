import { UserRole } from "../enums/user";
export const super_cord = [UserRole.USER]
export const core = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD]
export const has = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD, UserRole.CORE]
export const admin = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD, UserRole.CORE]

export const _super_cord = [UserRole.USER, UserRole.CORD]
export const _core = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD]
export const _has = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD, UserRole.CORE]
export const _admin = [UserRole.USER, UserRole.CORD, UserRole.SUPER_CORD, UserRole.CORE, UserRole.HAS]