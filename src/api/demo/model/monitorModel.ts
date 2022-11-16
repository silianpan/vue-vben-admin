import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';

export type OperlogParams = {
  perId: number;
  title?: string;
  businessType?: string;
  requestMethods?: string;
  operName?: string;
  operIp?: string;
};

export type OperlogPageParams = BasicPageParams & OperlogParams;

export interface OperlogListItem {
  perId: number;
  title: string;
  businessType: string;
  requestMethod: string;
  operName: string;
  operIp: string;
  operLocation: string;
  status: string;
  operTime: string;
  operUrl: string;
  method: string;
  operParam: string;
  jsonResult: string;
  errorMsg: string;
}

export type OperlogPageListGetResultModel = BasicFetchResult<OperlogListItem>;

export type OperlogListGetResultModel = OperlogListItem[];
