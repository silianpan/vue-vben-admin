import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '字典编号',
    dataIndex: 'dictId',
    width: 60,
  },
  {
    title: '字典名称',
    dataIndex: 'dictName',
    width: 120,
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    width: 120,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 100,
    customRender: ({ record }) => {
      return record.status === '0' ? '已启用' : '已停用';
    },
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    width: 100,
  },
];

export const columnsDictData: BasicColumn[] = [
  {
    title: '字典编码',
    dataIndex: 'dictCode',
    width: 60,
  },
  {
    title: '字典标签',
    dataIndex: 'dictLabel',
    width: 100,
  },
  {
    title: '字典键值',
    dataIndex: 'dictValue',
    width: 100,
  },
  {
    title: '字典排序',
    dataIndex: 'dictSort',
    width: 60,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 80,
    customRender: ({ record }) => {
      return record.status === '0' ? '已启用' : '已停用';
    },
  },
  {
    title: '表格回显样式',
    dataIndex: 'listClass',
    width: 80,
  },
  {
    title: '样式属性（其他样式扩展）',
    dataIndex: 'cssClass',
    width: 80,
  },
  // {
  //   title: '创建时间',
  //   dataIndex: 'createTime',
  //   width: 180,
  // },
  // {
  //   title: '备注',
  //   dataIndex: 'remark',
  //   width: 200,
  // },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'dictName',
    label: '字典名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'dictType',
    label: '字典类型',
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
    field: 'dictId',
    label: '字典ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'dictName',
    label: '字典名称',
    required: true,
    component: 'Input',
  },
  {
    field: 'dictType',
    label: '字典类型',
    required: true,
    component: 'Input',
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
