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
  PostListGetResultModel,
  AccountListItem,
  RoleMenuSelectItem,
  RoleDeptSelectItem,
  RoleListItem,
  PostPageListGetResultModel,
  PostPageParams,
  PostListItem,
  DictTypePageListGetResultModel,
  DictTypePageParams,
  DictTypeListItem,
  DictDataListItem,
  ConfigPageParams,
  ConfigPageListGetResultModel,
  ConfigListItem,
  NoticeListItem,
  NoticePageParams,
  NoticePageListGetResultModel,
} from './model/systemModel';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AccountList = '/system/user/list',
  IsAccountExist = '/system/accountExist',
  DeptList = '/system/dept/list',
  AddDept = '/system/dept',
  DeptTreeSelect = '/system/dept/treeselect',
  UpdateRoleStatus = '/system/role/changeStatus',
  UpdateRoleDataScope = '/system/role/dataScope',
  MenuList = '/system/menu/list',
  RoleMenuTreeSelect = '/system/menu/roleMenuTreeselect',
  RoleDeptTreeSelect = '/system/dept/roleDeptTreeselect',
  AddMenu = '/system/menu',
  AddUser = '/system/user',
  AddRole = '/system/role',
  AddPost = '/system/post',
  AddDictType = '/system/dict/type',
  AddDictData = '/system/dict/data',
  AddConfig = '/system/config',
  AddNotice = '/system/notice',
  DictDataList = '/system/dict/data/list',
  ResetUserPwd = '/system/user/resetPwd',
  RolePageList = '/system/role/list',
  PostPageList = '/system/post/list',
  DictTypePageList = '/system/dict/type/list',
  ConfigPageList = '/system/config/list',
  NoticePageList = '/system/notice/list',
  GetAllRoleList = '/system/role/optionselect',
  GetAllPostList = '/system/post/optionselect',
}

export const getAccountList = (params?: AccountParams) =>
  defHttp.get<AccountListGetResultModel>({ url: Api.AccountList, params });

export const getDeptList = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptList, params });

export const getDeptTreeSelect = (params?: DeptListItem) =>
  defHttp.get<DeptListGetResultModel>({ url: Api.DeptTreeSelect, params });

export const getMenuList = (params?: MenuParams) =>
  defHttp.get<MenuListGetResultModel>({ url: Api.MenuList, params });

// 新增部门
export const addDept = (data: DeptListItem) => {
  return defHttp.post<void>({ url: Api.AddDept, data });
};

// 修改部门
export const updateDept = (data: DeptListItem) => {
  return defHttp.put<void>({ url: Api.AddDept, data });
};

// 删除部门
export const delDept = (deptId: Number) => {
  return defHttp.delete<void>({ url: Api.AddDept + '/' + deptId });
};

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

// 新增用户
export const addUser = (data: AccountListItem) => {
  return defHttp.post<void>({ url: Api.AddUser, data });
};

// 修改用户
export const updateUser = (data: AccountListItem) => {
  return defHttp.put<void>({ url: Api.AddUser, data });
};

// 删除用户
export const delUser = (userId: Number) => {
  return defHttp.delete<void>({ url: Api.AddUser + '/' + userId });
};

// 新增角色
export const addRole = (data: RoleListItem) => {
  return defHttp.post<void>({ url: Api.AddRole, data });
};

// 修改角色
export const updateRole = (data: RoleListItem) => {
  return defHttp.put<void>({ url: Api.AddRole, data });
};

// 删除角色
export const delRole = (roleId: Number) => {
  return defHttp.delete<void>({ url: Api.AddRole + '/' + roleId });
};

// 新增岗位
export const addPost = (data: PostListItem) => {
  return defHttp.post<void>({ url: Api.AddPost, data });
};

// 修改岗位
export const updatePost = (data: PostListItem) => {
  return defHttp.put<void>({ url: Api.AddPost, data });
};

// 删除岗位
export const delPost = (postId: Number) => {
  return defHttp.delete<void>({ url: Api.AddPost + '/' + postId });
};

// 新增字典类型
export const addDictType = (data: DictTypeListItem) => {
  return defHttp.post<void>({ url: Api.AddDictType, data });
};

// 修改字典类型
export const updateDictType = (data: DictTypeListItem) => {
  return defHttp.put<void>({ url: Api.AddDictType, data });
};

// 删除字典类型
export const delDictType = (dictId: Number) => {
  return defHttp.delete<void>({ url: Api.AddDictType + '/' + dictId });
};

// 列表字典类型选择
export const getDictTypeSelect = () => {
  return defHttp.get<DictTypeListItem[]>({ url: Api.AddDictType + '/optionselect' });
};

// 列表字典数据
export const getDictDataList = (dictType: String) => {
  return defHttp.get<DictDataListItem[]>({ url: Api.AddDictData + '/type/' + dictType });
};

// 新增字典数据
export const addDictData = (data: DictDataListItem) => {
  return defHttp.post<void>({ url: Api.AddDictData, data });
};

// 修改字典数据
export const updateDictData = (data: DictDataListItem) => {
  return defHttp.put<void>({ url: Api.AddDictData, data });
};

// 删除字典数据
export const delDictData = (dictCode: Number) => {
  return defHttp.delete<void>({ url: Api.AddDictData + '/' + dictCode });
};

// 新增参数
export const addConfig = (data: ConfigListItem) => {
  return defHttp.post<void>({ url: Api.AddConfig, data });
};

// 修改参数
export const updateConfig = (data: ConfigListItem) => {
  return defHttp.put<void>({ url: Api.AddConfig, data });
};

// 删除参数
export const delConfig = (configId: Number) => {
  return defHttp.delete<void>({ url: Api.AddConfig + '/' + configId });
};

// 清理缓存参数
export const clearCacheConfig = () => {
  return defHttp.delete<void>({ url: Api.AddConfig + '/clearCache' });
};

// 新增公告
export const addNotice = (data: NoticeListItem) => {
  return defHttp.post<void>({ url: Api.AddNotice, data });
};

// 修改公告
export const updateNotice = (data: NoticeListItem) => {
  return defHttp.put<void>({ url: Api.AddNotice, data });
};

// 删除公告
export const delNotice = (noticeId: Number) => {
  return defHttp.delete<void>({ url: Api.AddNotice + '/' + noticeId });
};

// 根据userId获取用户
export const getUser = (userId: Number) => {
  return defHttp.get<AccountListItem>({ url: Api.AddUser + '/' + userId });
};

// 根据roleId获取选中菜单
export const getRoleMenuTreeSelect = (roleId: Number) => {
  return defHttp.get<RoleMenuSelectItem>({ url: Api.RoleMenuTreeSelect + '/' + roleId });
};

// 根据roleId获取选中部门
export const getRoleDeptTreeSelect = (roleId: Number) => {
  return defHttp.get<RoleDeptSelectItem>({ url: Api.RoleDeptTreeSelect + '/' + roleId });
};

// 分配数据权限
export const setRoleDataScope = (data: RoleListItem) => {
  return defHttp.put<void>({ url: Api.UpdateRoleDataScope, data });
};

// 修改密码
export const resetUserPwd = (userId: number, password: string) => {
  return defHttp.put<void>({ url: Api.ResetUserPwd, data: { userId, password } });
};

export const getRoleListByPage = (params?: RolePageParams) =>
  defHttp.get<RolePageListGetResultModel>({ url: Api.RolePageList, params });

export const getAllRoleList = (params?: RoleParams) =>
  defHttp.get<RoleListGetResultModel>({ url: Api.GetAllRoleList, params });

export const getPostListByPage = (params?: PostPageParams) =>
  defHttp.get<PostPageListGetResultModel>({ url: Api.PostPageList, params });

export const getDictTypeListByPage = (params?: DictTypePageParams) =>
  defHttp.get<DictTypePageListGetResultModel>({ url: Api.DictTypePageList, params });

export const getConfigListByPage = (params?: ConfigPageParams) =>
  defHttp.get<ConfigPageListGetResultModel>({ url: Api.ConfigPageList, params });

export const getNoticeListByPage = (params?: NoticePageParams) =>
  defHttp.get<NoticePageListGetResultModel>({ url: Api.NoticePageList, params });

export const getAllPostList = (params?: RoleParams) =>
  defHttp.get<PostListGetResultModel>({ url: Api.GetAllPostList, params });

export const setRoleStatus = (roleId: number, status: string) =>
  defHttp.put({ url: Api.UpdateRoleStatus, data: { roleId, status } });

export const isAccountExist = (account: string) =>
  defHttp.post({ url: Api.IsAccountExist, params: { account } }, { errorMessageMode: 'none' });
