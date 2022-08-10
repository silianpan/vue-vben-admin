import {
  AccountParams,
  DeptListItem,
  MenuParams,
  RoleParams,
  RolePageParams,
  MenuListGetResultModel,
  DeptListGetResultModel,
  AccountListGetResultModel,
  RolePageListGetResultModel,
  RoleListGetResultModel,
  MenuListItem,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/user/list',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/dept/treeselect',
  setRoleStatus = '/system/setRoleStatus',
  MenuList = '/system/menu/list',
  AddMenu = '/system/menu',
  RolePageList = '/system/getRoleListByPage',
  GetAllRoleList = '/system/role/optionselect',
}

export const getAccountList = (params?: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

// 新增菜单
export const addMenu = (data: MenuListItem) => {
  return defHttp.post<void>({ url: Api.AddMenu, data });
};

// 修改菜单
export const updateMenu = (data: MenuListItem) => {
  return defHttp.put<void>({ url: Api.AddMenu, data });
};

// 删除菜单
export const delMenu = (menuId: Number) => {
  return defHttp.delete<void>({ url: Api.AddMenu + '/' + menuId });
};

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const setRoleStatus = (id: number, status: string) =>
  defHttp.post({ url: Api.setRoleStatus, params: { id, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
