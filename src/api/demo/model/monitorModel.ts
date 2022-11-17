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
  status?: string;
  loginTime?: string;
};

export type OnlineParams = {
  tokenId?: number;
  userName?: string;
  ipaddr?: string;
  loginLocation?: string;
  loginTime?: string;
};

export type JobParams = {
  jobId?: number;
  jobName?: string;
  jobGroup?: string;
  status?: number;
};

export type OperlogPageParams = BasicPageParams & OperlogParams;

export type LogininforPageParams = BasicPageParams & LogininforParams;

export type OnlinePageParams = BasicPageParams & OnlineParams;

export type JobPageParams = BasicPageParams & JobParams;

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
  status: string;
  msg: string;
  loginTime: string;
}

export interface OnlineListItem {
  tokenId: number;
  userName: string;
  deptName: string;
  ipaddr: string;
  loginLocation: string;
  browser: string;
  os: string;
  loginTime: string;
}

export interface JobListItem {
  jobId: number;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  cronExpression: string;
  status: number;
}

export type OperlogPageListGetResultModel = BasicFetchResult<OperlogListItem>;

export type LogininforPageListGetResultModel = BasicFetchResult<LogininforListItem>;

export type OnlinePageListGetResultModel = BasicFetchResult<OnlineListItem>;

export type JobPageListGetResultModel = BasicFetchResult<JobListItem>;
