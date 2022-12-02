import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';

export type ModelParams = {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
};

export type DefinitionParams = {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
  category?: string;
  suspendStateName?: string;
  suspendState?: string;
  processDefinitionId?: number;
};

export type ModelPageParams = BasicPageParams & ModelParams;
export type DefinitionPageParams = BasicPageParams & DefinitionParams;

export interface ModelListItem {
  id: number;
  key: string;
  name: string;
  version: number;
  createTime: string;
  lastUpdateTime: string;
}

export interface DefinitionListItem {
  id: number;
  key: string;
  name: string;
  version: number;
  description: string;
  category: string;
  deploymentTime: string;
  suspendStateName: string;
}

export type ModelPageListGetResultModel = BasicFetchResult<ModelListItem>;
export type DefinitionPageListGetResultModel = BasicFetchResult<DefinitionListItem>;
