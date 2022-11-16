import {
  OperlogPageListGetResultModel,
  OperlogPageParams,
  OperlogParams,
} from './model/monitorModel';
import { Result } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  OperlogPageList = '/monitor/operlog/list',
  AddOperlog = '/monitor/operlog',
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
  defHttp.get<OperlogPageListGetResultModel>({ url: Api.OperlogPageList, params });
