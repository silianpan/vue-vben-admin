import {
  DefinitionPageListGetResultModel,
  DefinitionPageParams,
  DefinitionParams,
  ModelListItem,
  ModelPageListGetResultModel,
  ModelPageParams,
} from './model/activitiModel';
import { Result } from '/#/axios';
import { defHttp } from '/@/utils/http/axios';

enum Api {
  Model = '/activiti/modeler',
  Definition = '/activiti/definition',
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

// 流程定义分页列表
export const getDefinitionListByPage = (params?: DefinitionPageParams) =>
  defHttp.get<DefinitionPageListGetResultModel>({ url: Api.Definition + '/list', params });

// 激活/挂起流程定义
export const suspendOrActiveDefinition = (data: DefinitionParams) =>
  defHttp.post<void>(
    { url: Api.Definition + '/suspendOrActiveDefinition', data },
    {
      joinParamsToUrl: true,
    },
  );

// 流程定义转成模型
export const convert2Model = (data: DefinitionParams) =>
  defHttp.post<void>(
    { url: Api.Definition + '/convert2Model', data },
    {
      joinParamsToUrl: true,
    },
  );

// 删除流程定义
export const delDefinition = (deploymentId: Number) =>
  defHttp.delete<void>({ url: Api.Definition + '/remove/' + deploymentId });
