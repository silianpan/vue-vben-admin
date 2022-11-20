<template>
  <a-table
    ref="tableRef"
    size="small"
    :columns="columns"
    :loading="tableLoading"
    :data-source="rowsLocal"
    row-key="columnId"
    :pagination="false"
  >
    <template #bodyCell="{ column, record }">
      <!-- 字段描述 -->
      <template v-if="column.dataIndex === 'columnComment'">
        <a-input v-model:value="record.columnComment" />
      </template>
      <!-- Java类型 -->
      <template v-else-if="column.dataIndex === 'javaType'">
        <a-select v-model:value="record.javaType" style="width: 100%">
          <a-select-option value="Long">Long</a-select-option>
          <a-select-option value="String">String</a-select-option>
          <a-select-option value="Integer">Integer</a-select-option>
          <a-select-option value="Double">Double</a-select-option>
          <a-select-option value="BigDecimal">BigDecimal</a-select-option>
          <a-select-option value="Date">Date</a-select-option>
        </a-select>
      </template>
      <!-- Java属性 -->
      <template v-else-if="column.dataIndex === 'javaField'">
        <a-input v-model:value="record.javaField" />
      </template>
      <!-- 插入 -->
      <template v-else-if="column.dataIndex === 'isInsert'">
        <a-checkbox v-model:checked="record.isInsert" />
      </template>
      <!-- 编辑 -->
      <template v-else-if="column.dataIndex === 'isEdit'">
        <a-checkbox v-model:checked="record.isEdit" />
      </template>
      <!-- 列表 -->
      <template v-else-if="column.dataIndex === 'isList'">
        <a-checkbox v-model:checked="record.isList" />
      </template>
      <!-- 查询 -->
      <template v-else-if="column.dataIndex === 'isQuery'">
        <a-checkbox v-model:checked="record.isQuery" />
      </template>
      <!-- 查询方式 -->
      <template v-else-if="column.dataIndex === 'queryType'">
        <a-select v-model:value="record.queryType" style="width: 100%">
          <a-select-option value="EQ">=</a-select-option>
          <a-select-option value="NE">!=</a-select-option>
          <a-select-option value="GT">></a-select-option>
          <a-select-option value="GTE">>=</a-select-option>
          <a-select-option value="LT">&lt;</a-select-option>
          <a-select-option value="LTE">&lt;=</a-select-option>
          <a-select-option value="LIKE">LIKE</a-select-option>
          <a-select-option value="BETWEEN">BETWEEN</a-select-option>
        </a-select>
      </template>
      <!-- 必填 -->
      <template v-else-if="column.dataIndex === 'isRequired'">
        <a-checkbox v-model:checked="record.isRequired" />
      </template>
      <!-- 显示类型 -->
      <template v-else-if="column.dataIndex === 'htmlType'">
        <a-select v-model:value="record.htmlType" style="width: 100%">
          <a-select-option value="input">文本框</a-select-option>
          <a-select-option value="textarea">文本域</a-select-option>
          <a-select-option value="select">下拉框</a-select-option>
          <a-select-option value="radio">单选框</a-select-option>
          <a-select-option value="checkbox">复选框</a-select-option>
          <a-select-option value="datetime">日期控件</a-select-option>
          <a-select-option value="imageUpload">图片上传</a-select-option>
          <a-select-option value="fileUpload">文件上传</a-select-option>
          <a-select-option value="editor">富文本控件</a-select-option>
        </a-select>
      </template>
      <!-- 字典类型 -->
      <template v-else-if="column.dataIndex === 'dictType'">
        <a-select v-model:value="record.dictType" placeholder="请选择" style="width: 100%">
          <a-select-option v-for="item in dictOptions" :key="item.dictType" :value="item.dictType">
            {{ item.dictName }}
          </a-select-option>
        </a-select>
      </template>
    </template>
  </a-table>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref, watchEffect } from 'vue';
  import { Select, SelectOption, Table, Input, Checkbox } from 'ant-design-vue';
  import { getDictTypeSelect } from '/@/api/demo/system';
  import { DictTypeListItem } from '/@/api/demo/model/systemModel';
  import { CodeGenRowItem } from '/@/api/demo/model/monitorModel';
  import { codeGenEditColumns } from './gen.data';

  export default defineComponent({
    name: 'FieldInfoTable',
    components: {
      ASelect: Select,
      ASelectOption: SelectOption,
      ATable: Table,
      AInput: Input,
      ACheckbox: Checkbox,
    },
    props: {
      rows: { type: Array, default: () => [] },
    },
    setup(props) {
      const tableLoading = ref<boolean>(true);

      const dictOptions = ref<DictTypeListItem[]>();
      const rowsLocal = ref<CodeGenRowItem[]>();
      onMounted(async () => {
        const res = await getDictTypeSelect();
        dictOptions.value = res;
      });

      nextTick(() => {
        watchEffect(() => {
          rowsLocal.value = props.rows as CodeGenRowItem[];
          tableLoading.value = false;
        });
      });

      async function handleSubmit() {
        return rowsLocal.value;
      }

      return {
        tableLoading,
        rowsLocal,
        columns: codeGenEditColumns,
        dictOptions,
        handleSubmit,
      };
    },
  });
</script>
