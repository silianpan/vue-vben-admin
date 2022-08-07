import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';

export type AccountParams = BasicPageParams & {
  account?: string;
  nickname?: string;
};

export type RoleParams = {
  roleName?: string;
  status?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  id: string;
  account: string;
  email: string;
  nickname: string;
  role: number;
  createTime: string;
  remark: string;
  status: number;
}

export interface DeptListItem {
  deptId: number;
  deptName: string;
  orderNum: number;
  createTime: string;
  status: number;
}

export interface MenuListItem {
  menuId: number;
  menuName: string;
  orderNum: number;
  createTime: string;
  status: number;
  icon: string;
  component: string;
  perms: string;
  isApp: number;
  isExt: number;
  parentId: number;
  menuType: string;
  visible: number;
}

export interface RoleListItem {
  roleId: number;
  roleName: string;
  roleKey: string;
  status: number;
  roleSort: number;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type RoleListGetResultModel = RoleListItem[];
