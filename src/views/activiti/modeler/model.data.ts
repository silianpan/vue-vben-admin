import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '编号',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '流程KEY',
    dataIndex: 'key',
    width: 120,
  },
  {
    title: '名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: 60,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
    customRender: ({ text }) => formatToDateTime(text),
  },
  {
    title: '最后更新时间',
    dataIndex: 'lastUpdateTime',
    width: 120,
    customRender: ({ text }) => formatToDateTime(text),
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'key',
    label: '流程KEY',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'name',
    label: '名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'id',
    label: '编号',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'key',
    label: '流程KEY',
    required: true,
    component: 'Input',
  },
  {
    field: 'name',
    label: '名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'description',
    label: '描述',
    required: true,
    component: 'InputTextArea',
  },
];
