import { getAllPostList, getAllRoleList } from '/@/api/demo/system';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { Switch } from 'ant-design-vue';
import { h } from 'vue';

export const columns: BasicColumn[] = [
  {
    title: '用户名',
    dataIndex: 'userName',
    width: 120,
  },
  {
    title: '昵称',
    dataIndex: 'nickName',
    width: 120,
  },
  {
    title: '邮箱',
    dataIndex: 'email',
    width: 120,
  },
  {
    title: '部门',
    dataIndex: 'deptId',
    customRender: ({ record }) => record.dept.deptName,
  },
  {
    title: '状态',
    dataIndex: 'status',
    customRender: ({ record }) => {
      return h(Switch, {
        checked: record.status === '0',
        checkedChildren: '正常',
        unCheckedChildren: '停用',
      });
    },
  },
  {
    title: '角色',
    dataIndex: 'roleId',
    customRender: ({ record }) => record.roleIds && record.roleIds.joins(','),
  },
  {
    title: '岗位',
    dataIndex: 'postId',
    customRender: ({ record }) => record.postIds && record.postIds.joins(','),
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 180,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    colProps: { span: 8 },
  },
];

export const accountFormSchema: FormSchema[] = [
  {
    field: 'userId',
    label: '用户ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'userName',
    label: '用户名',
    component: 'Input',
    helpMessage: ['本字段演示异步验证', '不能输入带有admin的用户名'],
    rules: [
      {
        required: true,
        message: '请输入用户名',
      },
      // {
      //   validator(_, value) {
      //     return new Promise((resolve, reject) => {
      //       isAccountExist(value)
      //         .then(() => resolve())
      //         .catch((err) => {
      //           reject(err.message || '验证失败');
      //         });
      //     });
      //   },
      // },
    ],
  },
  {
    field: 'password',
    label: '密码',
    component: 'InputPassword',
    required: true,
    defaultValue: '123456',
  },
  {
    label: '角色',
    field: 'roleIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllRoleList,
      labelField: 'roleName',
      valueField: 'roleId',
      mode: 'multiple',
    },
  },
  {
    field: 'deptId',
    label: '所属部门',
    component: 'TreeSelect',
    componentProps: {
      fieldNames: {
        label: 'label',
        key: 'id',
        value: 'id',
      },
      getPopupContainer: () => document.body,
    },
    required: true,
  },
  {
    label: '岗位',
    field: 'postIds',
    component: 'ApiSelect',
    componentProps: {
      api: getAllPostList,
      labelField: 'postName',
      valueField: 'postId',
      mode: 'multiple',
    },
  },
  {
    field: 'nickName',
    label: '昵称',
    component: 'Input',
    required: true,
  },

  {
    label: '邮箱',
    field: 'email',
    component: 'Input',
    required: true,
  },

  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
  },
];
