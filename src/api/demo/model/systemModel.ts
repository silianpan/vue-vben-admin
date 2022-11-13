import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
import { TreeItem } from '/@/components/Tree';

export type AccountParams = BasicPageParams & {
  userName?: string;
  nickName?: string;
};

export type RoleParams = {
  roleId: number;
  roleKey: string;
  roleName?: string;
  status?: string;
};

export type PostParams = {
  postId: number;
  postName?: string;
};

export type DictTypeParams = {
  dictId: number;
  dictName?: string;
};

export type RolePageParams = BasicPageParams & RoleParams;

export type PostPageParams = BasicPageParams & PostParams;

export type DictTypePageParams = BasicPageParams & DictTypeParams;

export type DeptParams = {
  deptName?: string;
  status?: string;
};

export type MenuParams = {
  menuName?: string;
  status?: string;
};

export interface AccountListItem {
  roles: RoleListItem[];
  posts: PostListItem[];
  userId: number;
  deptId: number;
  userName: string;
  nickName: string;
  email: string;
  phonenumber: string;
  sex: string;
  avatar: string;
  status: string;
  createTime: string;
  remark: string;
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

export interface RoleMenuSelectItem {
  checkedKeys: number[];
  menus: TreeItem[];
}

export interface RoleDeptSelectItem {
  checkedKeys: number[];
  depts: TreeItem[];
}

export interface RoleListItem {
  roleId: number;
  roleName: string;
  roleKey: string;
  status: number;
  roleSort: number;
  createTime: string;
  deptIds: [number];
  dataScope: string;
  admin: boolean;
  deptCheckStrictly: boolean;
  menuCheckStrictly: boolean;
}

export interface PostListItem {
  postId: number;
  postName: string;
  postKey: string;
  status: number;
  createTime: string;
}

export interface DictTypeListItem {
  dictId: number;
  dictName: string;
  dictType: string;
  status: number;
  createTime: string;
}

/**
 * @description: Request list return value
 */
export type AccountListGetResultModel = BasicFetchResult<AccountListItem>;

export type DeptListGetResultModel = BasicFetchResult<DeptListItem>;

export type MenuListGetResultModel = BasicFetchResult<MenuListItem>;

export type RolePageListGetResultModel = BasicFetchResult<RoleListItem>;

export type PostPageListGetResultModel = BasicFetchResult<PostListItem>;

export type DictTypePageListGetResultModel = BasicFetchResult<DictTypeListItem>;

export type RoleListGetResultModel = RoleListItem[];

export type PostListGetResultModel = PostListItem[];
