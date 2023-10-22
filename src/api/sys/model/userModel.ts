import { UserObj } from '/#/store';

/**
 * @description: Login interface parameters
 */
export interface LoginParams {
  username: string;
  password: string;
  code: string;
}

export interface RoleInfo {
  roleName: string;
  value: string;
}

/**
 * @description: Login interface return value
 */
export interface LoginResultModel {
  userId: string | number;
  token: string;
  roles: RoleInfo[];
}

/**
 * @description: Get user information return value
 */
export interface GetUserInfoModel {
  user: UserObj;
  roles: string[];
  posts: string[];
  permissions: string[];
}
