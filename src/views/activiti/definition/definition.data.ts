import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '流程ID',
    dataIndex: 'id',
    width: 60,
  },
  {
    title: '流程KEY',
    dataIndex: 'key',
    width: 120,
  },
  {
    title: '流程名称',
    dataIndex: 'name',
    width: 120,
  },
  {
    title: '版本',
    dataIndex: 'version',
    width: 60,
  },
  {
    title: '流程描述',
    dataIndex: 'description',
    width: 60,
  },
  {
    title: '所属分类',
    dataIndex: 'category',
    width: 120,
  },
  {
    title: '部署时间',
    dataIndex: 'deploymentTime',
    width: 120,
    customRender: ({ text }) => formatToDateTime(text),
  },
  {
    title: '状态',
    dataIndex: 'suspendStateName',
    width: 80,
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
    label: '流程名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'upload',
    label: '上传',
    required: true,
    component: 'Upload',
  },
];
