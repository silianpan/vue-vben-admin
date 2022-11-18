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

export type JobLogParams = {
  jobLogId?: number;
  jobName?: string;
  jobGroup?: string;
  status?: number;
  createTime?: string;
};

export type OperlogPageParams = BasicPageParams & OperlogParams;

export type LogininforPageParams = BasicPageParams & LogininforParams;

export type OnlinePageParams = BasicPageParams & OnlineParams;

export type JobPageParams = BasicPageParams & JobParams;

export type JobLogPageParams = BasicPageParams & JobLogParams;

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

export interface JobLogListItem {
  jobLogId: number;
  jobName: string;
  jobGroup: string;
  invokeTarget: string;
  jobMessage: string;
  status: number;
  createTime: string;
}

export type OperlogPageListGetResultModel = BasicFetchResult<OperlogListItem>;

export type LogininforPageListGetResultModel = BasicFetchResult<LogininforListItem>;

export type OnlinePageListGetResultModel = BasicFetchResult<OnlineListItem>;

export type JobPageListGetResultModel = BasicFetchResult<JobListItem>;

export type JobLogPageListGetResultModel = BasicFetchResult<JobLogListItem>;

interface CpuItem {
  cpuNum: number;
  free: number;
  sys: number;
  total: number;
  used: number;
  wait: number;
}

interface JvmItem {
  free: number;
  home: string;
  max: number;
  name: string;
  runTime: string;
  startTime: string;
  total: number;
  usage: number;
  used: number;
  version: string;
}

interface MemItem {
  free: number;
  total: number;
  usage: number;
  used: number;
}

interface SysItem {
  computerIp: string;
  computerName: string;
  osArch: string;
  osName: string;
  userDir: string;
}

export interface SysFileItem {
  dirName: string;
  free: string;
  sysTypeName: string;
  total: string;
  typeName: string;
  usage: number;
  used: string;
}

export interface ServerItem {
  cpu: CpuItem;
  jvm: JvmItem;
  mem: MemItem;
  sys: SysItem;
  sysFiles: SysFileItem[];
}

interface CommandItem {
  name: string;
  value: string;
}

interface CacheInfoItem {
  redis_version: string;
  redis_mode: string;
  tcp_port: string;
  connected_clients: string;
  uptime_in_days: string;
  used_memory_human: string;
  used_cpu_user_children: string;
  maxmemory_human: string;
  aof_enabled: string;
  rdb_last_bgsave_status: string;
  instantaneous_input_kbps: string;
  instantaneous_output_kbps: string;
}

export interface CacheItem {
  commandStats: CommandItem[];
  dbSize: number;
  info: CacheInfoItem;
}
