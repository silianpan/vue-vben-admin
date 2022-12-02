import { ModelListItem, ModelPageListGetResultModel, ModelPageParams } from './model/activitiModel';
import { Result } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Model = '/activiti/modeler',
}

// 流程模型分页列表
export const getModelListByPage = (params?: ModelPageParams) =>
  defHttp.get<ModelPageListGetResultModel>({ url: Api.Model + '/list', params });

// 删除流程模型
export const delModel = (modelId: Number) =>
  defHttp.delete<void>({ url: Api.Model + '/remove/' + modelId });

// 新增流程模型
export const addModel = (data: ModelListItem) =>
  defHttp.post<void>({ url: Api.Model + '/create', data });

// 部署流程模型
export const deployModel = (modelId: Number) =>
  defHttp.get<void>({ url: Api.Model + '/deploy/' + modelId });

// 导出流程模型
export const exportModel = (modelId: Number) =>
  defHttp.get<Result>(
    { url: Api.Model + '/export/' + modelId },
    {
      isTransformResponse: false,
    },
  );
