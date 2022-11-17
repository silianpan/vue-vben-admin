import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { formatToDateTime } from '/@/utils/dateUtil';

export const columns: BasicColumn[] = [
  {
    title: '会话编号',
    dataIndex: 'tokenId',
    width: 60,
  },
  {
    title: '登录名称',
    dataIndex: 'userName',
    width: 100,
  },
  {
    title: '部门名称',
    dataIndex: 'deptName',
    width: 50,
  },
  {
    title: '主机',
    dataIndex: 'ipaddr',
    width: 100,
  },
  {
    title: '登录地点',
    dataIndex: 'loginLocation',
    width: 100,
  },
  {
    title: '浏览器',
    dataIndex: 'browser',
    width: 100,
  },
  {
    title: '操作系统',
    dataIndex: 'os',
    width: 100,
  },
  {
    title: '登录时间',
    dataIndex: 'loginTime',
    width: 180,
    customRender: ({ record }) => {
      return formatToDateTime(record.loginTime);
    },
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
    field: 'userName',
    label: '登录名称',
    component: 'Input',
    colProps: { span: 8 },
  },
];
