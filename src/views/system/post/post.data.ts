import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '岗位编号',
    dataIndex: 'postId',
    width: 60,
  },
  {
    title: '岗位编码',
    dataIndex: 'postCode',
    width: 60,
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    width: 200,
  },
  {
    title: '排序',
    dataIndex: 'postSort',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === '0' ? '已启用' : '已停用';
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
    field: 'postCode',
    label: '岗位编码',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'postName',
    label: '岗位名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'postId',
    label: '岗位ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'postName',
    label: '岗位名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'postCode',
    label: '岗位编码',
    required: true,
    component: 'Input',
  },
  {
    field: 'postSort',
    label: '排序',
    required: true,
    component: 'InputNumber',
  },
  {
    field: 'status',
    label: '状态',
    component: 'RadioButtonGroup',
    defaultValue: '0',
    componentProps: {
      options: [
        { label: '启用', value: '0' },
        { label: '停用', value: '1' },
      ],
    },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
