import { BasicFetchResult, BasicPageParams } from '../../model/baseModel';

export type OperlogParams = {
  perId?: number;
  title?: string;
  businessType?: string;
  requestMethods?: string;
  operName?: string;
  operIp?: string;
};

export type LogininforParams = {
  infoId?: number;
  userName?: string;
  ipaddr?: string;
  status?: number;
  loginTime?: string;
};

export type OperlogPageParams = BasicPageParams & OperlogParams;

export type LogininforPageParams = BasicPageParams & LogininforParams;

export interface OperlogListItem {
  perId: number;
  title: string;
  businessType: string;
  requestMethod: string;
  operName: string;
  operIp: string;
  operLocation: string;
  status: number;
  operTime: string;
  operUrl: string;
  method: string;
  operParam: string;
  jsonResult: string;
  errorMsg: string;
}

export interface LogininforListItem {
  infoId: number;
  userName: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  status: number;
  msg: string;
  loginTime: string;
}

export type OperlogPageListGetResultModel = BasicFetchResult<OperlogListItem>;

export type LogininforPageListGetResultModel = BasicFetchResult<LogininforListItem>;
