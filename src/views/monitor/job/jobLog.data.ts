import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '日志编号',
    dataIndex: 'jobLogId',
    width: 60,
  },
  {
    title: '系统模块',
    dataIndex: 'jobName',
    width: 120,
  },
  {
    title: '操作类型',
    dataIndex: 'jobGroup',
    width: 100,
    customRender: ({ record }) => {
      return record.jobGroup === 'DEFAULT' ? '默认' : '系统';
    },
  },
  {
    title: '调用目标字符串',
    dataIndex: 'invokeTarget',
    width: 120,
  },
  {
    title: '日志信息',
    dataIndex: 'jobMessage',
    width: 160,
  },
  {
    title: '执行状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === '0' ? '正常' : '暂停';
    },
  },
  {
    title: '执行时间',
    dataIndex: 'createTime',
    width: 160,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'jobName',
    label: '任务名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'jobGroup',
    label: '任务组名',
    component: 'Select',
    componentProps: {
      options: [
        { label: '默认', value: 'DEFAULT' },
        { label: '系统', value: 'SYSTEM' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '执行状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '暂停', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: '[beginTime, endTime]',
    label: '执行时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
