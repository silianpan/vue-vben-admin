import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '参数主键',
    dataIndex: 'configId',
    width: 60,
  },
  {
    title: '参数名称',
    dataIndex: 'configName',
    width: 200,
  },
  {
    title: '参数键名',
    dataIndex: 'configKey',
    width: 60,
  },
  {
    title: '参数键值',
    dataIndex: 'configValue',
    width: 60,
  },
  {
    title: '系统内置',
    dataIndex: 'configType',
    width: 50,
    customRender: ({ record }) => {
      return record.configType === 'Y' ? '是' : '否';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'configName',
    label: '参数名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'configKey',
    label: '参数键名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'configType',
    label: '系统内置',
    component: 'Select',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'configId',
    label: '参数ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'configName',
    label: '参数名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'configKey',
    label: '参数键名',
    required: true,
    component: 'Input',
  },
  {
    field: 'configValue',
    label: '参数键值',
    required: true,
    component: 'Input',
  },
  {
    field: 'configType',
    label: '系统内置',
    component: 'RadioButtonGroup',
    defaultValue: 'Y',
    componentProps: {
      options: [
        { label: '是', value: 'Y' },
        { label: '否', value: 'N' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
