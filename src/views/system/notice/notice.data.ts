import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '公告编号',
    dataIndex: 'noticeId',
    width: 60,
  },
  {
    title: '公告标题',
    dataIndex: 'noticeTitle',
    width: 200,
  },
  {
    title: '公告类型',
    dataIndex: 'noticeType',
    width: 60,
    customRender: ({ record }) => {
      return record.noticeType === '1' ? '通知' : '公告';
    },
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      return record.status === '0' ? '正常' : '关闭';
    },
  },
  {
    title: '操作人员',
    dataIndex: 'createBy',
    width: 60,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'noticeTitle',
    label: '公告标题',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'createBy',
    label: '操作人员',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'noticeType',
    label: '公告类型',
    component: 'Select',
    componentProps: {
      options: [
        { label: '通知', value: '通知' },
        { label: '公告', value: '公告' },
      ],
    },
    colProps: { span: 8 },
  },
];

export const formSchema: FormSchema[] = [
  {
    field: 'noticeId',
    label: '公告ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'noticeTitle',
    label: '公告标题',
    required: true,
    component: 'Input',
  },
  {
    field: 'noticeType',
    label: '公告类型',
    component: 'RadioButtonGroup',
    defaultValue: '1',
    componentProps: {
      options: [
        { label: '通知', value: '1' },
        { label: '公告', value: '2' },
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
        { label: '关闭', value: '1' },
      ],
    },
  },
  {
    label: '公告内容',
    field: 'noticeContent',
    component: 'InputTextArea',
  },
];
