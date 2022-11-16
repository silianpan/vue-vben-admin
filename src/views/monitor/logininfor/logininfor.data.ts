import { Tag } from 'ant-design-vue';
import { h } from 'vue';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '访问编号',
    dataIndex: 'infoId',
    width: 60,
  },
  {
    title: '用户名称',
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: '登录地址',
    dataIndex: 'ipaddr',
    width: 50,
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    width: 50,
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 50,
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    width: 100,
  },
  {
    title: '登录状态',
    dataIndex: 'status',
    width: 50,
    customRender: ({ record }) => {
      return h(Tag, { color: record.status === '0' ? 'success' : 'error' }, () =>
        record.status === '0' ? '成功' : '失败',
      );
    },
  },
  {
    title: '操作信息',
    dataIndex: 'msg',
    width: 100,
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'ipaddr',
    label: '登录地址',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'status',
    label: '登录状态',
    component: 'Select',
    componentProps: {
      options: [
        { label: '成功', value: '0' },
        { label: '失败', value: '1' },
      ],
    },
    colProps: { span: 8 },
  },
  {
    field: 'userName',
    label: '登录名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: '[beginTime, endTime]',
    label: '登录时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];
