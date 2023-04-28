import { UserRole } from "src/types/enums/user";
import { _admin, _core, _has, _super_cord, admin, core, has, super_cord } from "src/types/objects/permissions";

export const emailExpresion =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export const usersDevList = [
  { roll: "BS20B039", name: "Yatharth", pass: "123456" },
  { roll: "CH20B010", name: "Aman Kulwal", pass: "123456" },
];

export const validateUpdateRole = (userRole: UserRole, _userRole: UserRole, role: UserRole) => {
  if(userRole === UserRole.SUPER_CORD && (!super_cord.includes(_userRole) || !_super_cord.includes(role))){
    return false
  }
  if(userRole === UserRole.CORE && (!core.includes(_userRole) || !_core.includes(role))){
    return false
  }
  if(userRole === UserRole.HAS && (!has.includes(_userRole) || !_has.includes(role))){
    return false
  }
  if(userRole === UserRole.ADMIN && (!admin.includes(_userRole) || !_admin.includes(role))){
    return false
  }
  return true;

}