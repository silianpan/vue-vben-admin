import { ColumnType } from 'ant-design-vue/es/table/interface';
import { BasicColumn } from '/@/components/Table';
import { FormSchema } from '/@/components/Table';

export const columns: BasicColumn[] = [
  {
    title: '序号',
    dataIndex: 'tableId',
    width: 60,
  },
  {
    title: '表名称',
    dataIndex: 'tableName',
    width: 120,
  },
  {
    title: '表描述',
    dataIndex: 'tableComment',
    width: 120,
  },
  {
    title: '实体',
    dataIndex: 'className',
    width: 120,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    width: 120,
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    width: 120,
  },
];

export const searchFormSchema: FormSchema[] = [
  {
    field: 'tableName',
    label: '表名称',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: 'tableComment',
    label: '表描述',
    component: 'Input',
    colProps: { span: 8 },
  },
  {
    field: '[beginTime, endTime]',
    label: '创建时间',
    component: 'RangePicker',
    colProps: { span: 8 },
  },
];

export const basicInfoFormSchema: FormSchema[] = [
  {
    field: 'tableId',
    label: '代码生成ID',
    component: 'InputNumber',
    show: false,
    colProps: { span: 12 },
  },
  {
    field: 'tableName',
    label: '表名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'tableComment',
    label: '表描述',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'className',
    label: '实体类名称',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    field: 'functionAuthor',
    label: '作者',
    required: true,
    component: 'Input',
    colProps: { span: 12 },
  },
  {
    label: '备注',
    field: 'remark',
    component: 'InputTextArea',
    colProps: { span: 12 },
  },
];

export const genInfoFormSchema: FormSchema[] = [
  {
    field: 'tplCategory',
    label: '生成模板',
    component: 'Select',
    componentProps: {
      options: [
        { label: '单表（增删改查）', value: 'crud' },
        { label: '树表（增删改查）', value: 'tree' },
        { label: '主子表（增删改查）', value: 'sub' },
      ],
    },
    colProps: { span: 12 },
  },
  {
    field: 'packageName',
    label: '生成包路径',
    required: true,
    component: 'Input',
    helpMessage: '生成在哪个java包下，例如 com.seal.system',
    colProps: { span: 12 },
  },
  {
    field: 'moduleName',
    label: '生成模块名',
    required: true,
    component: 'Input',
    helpMessage: '可理解为子系统名，例如 system',
    colProps: { span: 12 },
  },
  {
    field: 'businessName',
    label: '生成业务名',
    required: true,
    component: 'Input',
    helpMessage: '可理解为功能英文名，例如 user',
    colProps: { span: 12 },
  },
  {
    field: 'functionName',
    label: '生成功能名',
    required: true,
    component: 'Input',
    helpMessage: '用作类描述，例如 用户',
    colProps: { span: 12 },
  },
  {
    field: 'parentMenuId',
    label: '上级菜单',
    component: 'TreeSelect',
    helpMessage: '分配到指定菜单下，例如 系统管理',
    colProps: { span: 12 },
  },
  {
    field: 'genType',
    label: '生成代码方式',
    required: true,
    component: 'RadioGroup',
    helpMessage: '默认为zip压缩包下载，也可以自定义生成路径',
    componentProps: {
      options: [
        { label: 'zip压缩包', value: '0' },
        { label: '自定义路径', value: '1' },
      ],
    },
    colProps: { span: 12 },
  },
  {
    field: 'genPath',
    label: '自定义路径',
    required: true,
    component: 'Input',
    helpMessage: '填写磁盘绝对路径，若不填写，则生成到当前Web项目下',
    colProps: { span: 12 },
  },
];

// 其他信息
export const otherInfoFormSchema: FormSchema[] = [
  {
    field: 'treeCode',
    label: '树编码字段',
    component: 'Select',
    helpMessage: '树显示的编码字段名， 如：dept_id',
    colProps: { span: 12 },
  },
  {
    field: 'treeParentCode',
    label: '树父编码字段',
    component: 'Select',
    helpMessage: '树显示的父编码字段名， 如：parent_Id',
    colProps: { span: 12 },
  },
  {
    field: 'treeName',
    label: '树名称字段',
    component: 'Select',
    helpMessage: '树节点的显示名称字段名， 如：dept_name',
    colProps: { span: 12 },
  },
];

// 关联信息
export const relaInfoFormSchema: FormSchema[] = [
  {
    field: 'subTableName',
    label: '关联子表的表名',
    component: 'Select',
    helpMessage: '关联子表的表名， 如：sys_user',
    colProps: { span: 12 },
  },
  {
    field: 'subTableFkName',
    label: '子表关联的外键名',
    component: 'Select',
    helpMessage: '子表关联的外键名， 如：user_id',
    colProps: { span: 12 },
  },
];

// 代码生成编辑表格
export const codeGenEditColumns: ColumnType[] = [
  {
    title: '序号',
    dataIndex: 'columnId',
    align: 'center',
    width: '5%',
  },
  {
    title: '字段列名',
    dataIndex: 'columnName',
    align: 'center',
    ellipsis: true,
    width: '10%',
  },
  {
    title: '字段描述',
    dataIndex: 'columnComment',
    align: 'center',
    width: '8%',
  },
  {
    title: '物理类型',
    dataIndex: 'columnType',
    align: 'center',
    ellipsis: true,
    width: '10%',
  },
  {
    title: 'Java类型',
    dataIndex: 'javaType',
    align: 'center',
    width: '8%',
  },
  {
    title: 'java属性',
    dataIndex: 'javaField',
    align: 'center',
    width: '10%',
  },
  {
    title: '插入',
    dataIndex: 'isInsert',
    align: 'center',
    width: '3%',
  },
  {
    title: '编辑',
    dataIndex: 'isEdit',
    align: 'center',
    width: '3%',
  },
  {
    title: '列表',
    dataIndex: 'isList',
    align: 'center',
    width: '3%',
  },
  {
    title: '查询',
    dataIndex: 'isQuery',
    align: 'center',
    width: '3%',
  },
  {
    title: '查询方式',
    dataIndex: 'queryType',
    align: 'center',
    width: '10%',
  },
  {
    title: '必填',
    dataIndex: 'isRequired',
    align: 'center',
    width: '3%',
  },
  {
    title: '显示类型',
    dataIndex: 'htmlType',
    align: 'center',
    width: '10%',
  },
  {
    title: '字典类型',
    dataIndex: 'dictType',
    align: 'center',
    width: '10%',
  },
];
