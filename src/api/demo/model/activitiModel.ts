import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';

export type ModelParams = {
  id?: number;
  key?: string;
  name?: string;
  description?: string;
};

export type ModelPageParams = BasicPageParams & ModelParams;

export interface ModelListItem {
  id: number;
  key: string;
  name: string;
  version: number;
  createTime: string;
  lastUpdateTime: string;
}

export type ModelPageListGetResultModel = BasicFetchResult<ModelListItem>;
