import {
  JobListItem,
  JobLogPageListGetResultModel,
  JobLogPageParams,
  JobLogParams,
  JobPageListGetResultModel,
  JobPageParams,
  LogininforPageListGetResultModel,
  LogininforPageParams,
  LogininforParams,
  OnlinePageListGetResultModel,
  OnlinePageParams,
  OperlogPageListGetResultModel,
  OperlogPageParams,
  OperlogParams,
} from './model/monitorModel';
import { Result } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  AddOperlog = '/monitor/operlog',
  AddLogininfor = '/monitor/logininfor',
  AddOnline = '/monitor/online',
  AddJob = '/monitor/job',
  AddJobLog = '/monitor/jobLog',
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

// 操作日志分页列表
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

// 登录日志分页列表
export const getLogininforListByPage = (params?: LogininforPageParams) =>
  defHttp.get<LogininforPageListGetResultModel>({ url: Api.AddLogininfor + '/list', params });

// 在线用户分页列表
export const getOnlineListByPage = (params?: OnlinePageParams) =>
  defHttp.get<OnlinePageListGetResultModel>({ url: Api.AddOnline + '/list', params });

// 在线用户强制退出
export const forceLogoutOnline = (tokenId: Number) => {
  return defHttp.delete<void>({ url: Api.AddOnline + '/' + tokenId });
};

// 任务分页列表
export const getJobListByPage = (params?: JobPageParams) =>
  defHttp.get<JobPageListGetResultModel>({ url: Api.AddJob + '/list', params });

// 新增任务
export const addJob = (data: JobListItem) => {
  return defHttp.post<void>({ url: Api.AddJob, data });
};

// 修改任务
export const updateJob = (data: JobListItem) => {
  return defHttp.put<void>({ url: Api.AddJob, data });
};

// 删除任务
export const delJob = (jobId: Number) => {
  return defHttp.delete<void>({ url: Api.AddJob + '/' + jobId });
};

// 删除任务日志
export const delJobLog = (jobLogId: Number) => {
  return defHttp.delete<void>({ url: Api.AddJobLog + '/' + jobLogId });
};

// 清空任务日志
export const cleanJobLog = () => {
  return defHttp.delete<void>({ url: Api.AddJobLog + '/clean' });
};

// 导出任务日志
export const exportJobLog = (params: JobLogParams) => {
  return defHttp.get<Result>({ url: Api.AddJobLog + '/export', params });
};

// 任务日志分页列表
export const getJobLogListByPage = (params?: JobLogPageParams) =>
  defHttp.get<JobLogPageListGetResultModel>({ url: Api.AddJobLog + '/list', params });
