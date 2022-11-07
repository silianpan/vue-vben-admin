import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';
import { h } from 'vue';
import { Switch } from 'ant-design-vue';
import { setRoleStatus } from '/@/api/demo/system';
import { useMessage } from '/@/hooks/web/useMessage';

export const columns: BasicColumn[] = [
  {
    title: '角色编号',
    dataIndex: 'roleId',
    width: 60,
  },
  {
    title: '角色名',
    dataIndex: 'roleName',
    width: 200,
  },
  {
    title: '权限标识',
    dataIndex: 'roleKey',
    width: 180,
  },
  {
    title: '排序',
    dataIndex: 'roleSort',
    width: 50,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 120,
    customRender: ({ record }) => {
      if (!Reflect.has(record, 'pendingStatus')) {
        record.pendingStatus = false;
      }
      return h(Switch, {
        checked: record.status === '0',
        checkedChildren: '已启用',
        unCheckedChildren: '已禁用',
        loading: record.pendingStatus,
        onChange(checked: boolean) {
          record.pendingStatus = true;
          const newStatus = checked ? '0' : '1';
          const { createMessage } = useMessage();
          setRoleStatus(record.roleId, newStatus)
            .then(() => {
              record.status = newStatus;
              createMessage.success(`已成功修改角色状态`);
            })
            .catch(() => {
              createMessage.error('修改角色状态失败');
            })
            .finally(() => {
              record.pendingStatus = false;
            });
        },
      });
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
    field: 'roleNme',
    label: '角色名称',
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
    field: 'roleId',
    label: '角色ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'roleName',
    label: '角色名',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleKey',
    label: '权限标识',
    required: true,
    component: 'Input',
  },
  {
    field: 'roleSort',
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
  {
    label: ' ',
    field: 'menu',
    slot: 'menu',
    component: 'Input',
    defaultValue: [],
  },
];

export const RoleDataPermFormSchema: FormSchema[] = [
  {
    field: 'roleId',
    label: '角色ID',
    component: 'InputNumber',
    show: false,
  },
  {
    field: 'roleName',
    label: '角色名',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'roleKey',
    label: '权限标识',
    required: true,
    component: 'Input',
    componentProps: {
      disabled: true,
    },
  },
  {
    field: 'dataScope',
    label: '权限范围',
    required: true,
    component: 'Select',
    componentProps: {
      options: [
        { label: '全部数据权限', value: '1' },
        { label: '自定义数据权限', value: '2' },
        { label: '本部门数据权限', value: '3' },
        { label: '本部门及以下数据权限', value: '4' },
        { label: '仅本人数据权限', value: '5' },
      ],
    },
  },
  {
    label: ' ',
    field: 'deptIds',
    slot: 'deptIds',
    component: 'Input',
    defaultValue: [],
  },
];
