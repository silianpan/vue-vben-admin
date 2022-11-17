import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '任务编号',
    dataIndex: 'jobId',
    width: 60,
  },
  {
    title: '任务名称',
    dataIndex: 'jobName',
    width: 120,
  },
  {
    title: '任务组名',
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
    title: 'cron执行表达式',
    dataIndex: 'cronExpression',
    width: 160,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === '0' ? '正常' : '暂停';
    },
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
    label: '任务状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '暂停', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'jobId',
    label: '任务ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'jobName',
    label: '任务名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'jobGroup',
    label: '任务分组',
    required: true,
    component: 'Select',
    defaultValue: 'DEFAULT',
    componentProps: {
      options: [
        { label: '默认', value: 'DEFAULT' },
        { label: '系统', value: 'SYSTEM' },
      ],
    },
  },
  {
    field: 'invokeTarget',
    label: '调用方法',
    required: true,
    component: 'Input',
    helpMessage: [
      "Bean调用示例：ryTask.ryParams('ry')",
      "Class类调用示例：com.seal.quartz.task.RyTask.ryParams('ry')",
      '参数说明：支持字符串，布尔类型，长整型，浮点型，整型',
    ],
  },
  {
    field: 'cronExpression',
    label: 'cron表达式',
    required: true,
    component: 'Input',
  },
  {
    field: 'concurrent',
    label: '是否并发',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '允许', value: '0' },
        { label: '禁止', value: '1' },
      ],
    },
  },
  {
    field: 'misfirePolicy',
    label: '错误策略',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '立即执行', value: '1' },
        { label: '执行一次', value: '2' },
        { label: '放弃执行', value: '3' },
      ],
    },
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '正常', value: '0' },
        { label: '暂停', value: '1' },
      ],
    },
  },
];
