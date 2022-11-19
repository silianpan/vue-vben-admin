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

export type CodeGenParams = {
  tableId?: number;
  tableName?: string;
  tableComment?: string;
  className?: number;
  createTime?: string;
  updateTime?: string;
};

export type OperlogPageParams = BasicPageParams & OperlogParams;

export type LogininforPageParams = BasicPageParams & LogininforParams;

export type OnlinePageParams = BasicPageParams & OnlineParams;

export type JobPageParams = BasicPageParams & JobParams;

export type JobLogPageParams = BasicPageParams & JobLogParams;

export type CodeGenPageParams = BasicPageParams & CodeGenParams;

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

export type CodeGenListItem = {
  tableId: number;
  tableName: string;
  tableComment: string;
  className: number;
  createTime: string;
  updateTime: string;
};

export type OperlogPageListGetResultModel = BasicFetchResult<OperlogListItem>;

export type LogininforPageListGetResultModel = BasicFetchResult<LogininforListItem>;

export type OnlinePageListGetResultModel = BasicFetchResult<OnlineListItem>;

export type JobPageListGetResultModel = BasicFetchResult<JobListItem>;

export type JobLogPageListGetResultModel = BasicFetchResult<JobLogListItem>;

export type CodeGenPageListGetResultModel = BasicFetchResult<CodeGenListItem>;

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

// 生成代码
export type CodeGenInfoItem = {
  // 基本信息
  tableName: string;
  tableComment: string;
  className: number;
  functionAuthor: string;
  remark: string;
  // 生成信息
  tplCategory: string;
  packageName: string;
  moduleName: string;
  businessName: string;
  functionName: string;
  parentMenuId: string;
  genType: string;
  genPath: string;
  // 其他信息
  treeCode: string;
  treeParentCode: string;
  treeName: string;
  subTableName: string;
  subTableFkName: string;
};

export type CodeGenRowItem = {
  capJavaField: string;
  columnComment: string;
  columnId: number;
  columnName: string;
  columnType: string;
  createBy: string;
  createTime: string;
  dictType: string;
  edit: boolean;
  htmlType: string;
  increment: boolean;
  insert: boolean;
  isEdit: string | boolean;
  isIncrement: string | boolean;
  isInsert: string | boolean;
  isList: string | boolean;
  isPk: string | boolean;
  isQuery: string | boolean;
  isRequired: string | boolean;
  javaField: string;
  javaType: string;
  list: boolean;
  params: object;
  pk: boolean;
  query: boolean;
  queryType: string;
  remark: string;
  required: boolean;
  searchValue: string;
  sort: number;
  superColumn: boolean;
  tableId: number;
  updateBy: string;
  updateTime: string;
  usableColumn: boolean;
};

export type CodeGenTableColumnItem = {
  columnId: number;
  columnName: string;
  columnComment: string;
};

export type CodeGenTableItem = {
  tableId: number;
  tableName: string;
  columns: CodeGenTableColumnItem[];
  businessName: string;
  className: string;
  crud: boolean;
  functionAuthor: string;
  functionName: string;
  moduleName: string;
  packageName: string;
  sub: boolean;
  subTable: string;
  subTableFkName: string;
  subTableName: string;
  tableComment: string;
  tplCategory: string;
  tree: boolean;
  treeCode: string;
  treeName: string;
  treeParentCode: string;
};

export type CodeGenEditItem = {
  info: CodeGenInfoItem;
  rows: CodeGenRowItem[];
  tables: CodeGenTableItem[];
};
