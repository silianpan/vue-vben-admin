import {
  LogininforPageListGetResultModel,
  LogininforPageParams,
  LogininforParams,
  OperlogPageListGetResultModel,
  OperlogPageParams,
  OperlogParams,
} from './model/monitorModel';
import { Result } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AddOperlog = '/monitor/operlog',
  AddLogininfor = '/monitor/logininfor',
}

// 删除操作日志
export const delOperlog = (operlogId: Number) => {
  return defHttp.delete<void>({ url: Api.AddOperlog + '/' + operlogId });
};

// 清空操作日志
export const cleanOperlog = () => {
  return defHttp.delete<void>({ url: Api.AddOperlog + '/clean' });
};

// 导出操作日志
export const exportOperlog = (params: OperlogParams) => {
  return defHttp.get<Result>({ url: Api.AddOperlog + '/export', params });
};

// 分页列表
export const getOperlogListByPage = (params?: OperlogPageParams) =>
  defHttp.get<OperlogPageListGetResultModel>({ url: Api.AddOperlog + '/list', params });

// 删除登录日志
export const delLogininfor = (infoId: Number) => {
  return defHttp.delete<void>({ url: Api.AddLogininfor + '/' + infoId });
};

// 清空登录日志
export const cleanLogininfor = () => {
  return defHttp.delete<void>({ url: Api.AddLogininfor + '/clean' });
};

// 导出登录日志
export const exportLogininfor = (params: LogininforParams) => {
  return defHttp.get<Result>({ url: Api.AddLogininfor + '/export', params });
};

// 分页列表
export const getLogininforListByPage = (params?: LogininforPageParams) =>
  defHttp.get<LogininforPageListGetResultModel>({ url: Api.AddLogininfor + '/list', params });
