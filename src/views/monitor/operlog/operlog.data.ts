import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { DescItem } from '/@/components/Description';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '日志编号',
    dataIndex: 'operId',
    width: 60,
  },
  {
    title: '系统模块',
    dataIndex: 'title',
    width: 100,
  },
  {
    title: '操作类型',
    dataIndex: 'businessType',
    width: 50,
  },
  {
    title: '请求方式',
    dataIndex: 'requestMethod',
    width: 50,
  },
  {
    title: '操作人员',
    dataIndex: 'operName',
    width: 50,
  },
  {
    title: '主机',
    dataIndex: 'operIp',
    width: 100,
  },
  {
    title: '操作地点',
    dataIndex: 'operLocation',
    width: 100,
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      return h(Tag, { color: record.status === 0 ? 'success' : 'error' }, () =>
        record.status === 0 ? '成功' : '失败',
      );
    },
  },
  {
    title: '操作日期',
    dataIndex: 'operTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'title',
    label: '系统模块',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'operName',
    label: '操作人员',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '成功', value: 0 },
        { label: '失败', value: 1 },
      ],
    },
    colProps: { span: 8 },
  },
];

export const operSchema: DescItem[] = [
  {
    field: 'title',
    label: '操作模块',
  },
  {
    field: 'operInfo',
    label: '登录信息',
    render: (_: string, data: Recordable) => {
      return `${data.operName} / ${data.operIp} / ${data.operLocation}`;
    },
  },
  {
    field: 'operUrl',
    label: '请求地址',
  },
  {
    field: 'method',
    label: '请求方法',
  },
  {
    field: 'requestMethod',
    label: '请求方式',
  },
];

export const interfaceSchema: DescItem[] = [
  {
    field: 'operParam',
    label: '请求参数',
  },
  {
    field: 'jsonResult',
    label: '返回结果',
  },
  {
    field: 'status',
    label: '操作状态',
    render: (val: number) => {
      return h(Tag, { color: val === 0 ? 'success' : 'error' }, () =>
        val === 0 ? '成功' : '失败',
      );
    },
  },
  {
    field: 'operTime',
    label: '操作时间',
  },
  {
    field: 'errorMsg',
    label: '异常信息',
  },
];
