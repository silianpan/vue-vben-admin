<template>
  <a-space direction="vertical">
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card :loading="loading" title="CPU" :bordered="false">
          <a-row :gutter="24" v-if="server.cpu">
            <a-col :span="12">
              <a-space direction="vertical" size="large">
                <a-statistic
                  title="核心数"
                  :value="server.cpu.cpuNum"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon icon="ant-design:setting-outlined" />
                  </template>
                </a-statistic>
                <a-statistic
                  title="用户使用率"
                  :value="server.cpu.used"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon icon="ant-design:team-outlined" />
                  </template>
                </a-statistic>
              </a-space>
            </a-col>
            <a-col :span="12">
              <a-space direction="vertical" size="large">
                <a-statistic
                  title="系统使用率"
                  :value="server.cpu.sys"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon icon="material-symbols:cloud-outline" />
                  </template>
                </a-statistic>
                <a-statistic
                  title="当前空闲率"
                  :value="server.cpu.free"
                  :precision="2"
                  suffix="%"
                  :value-style="{ color: '#3f8600' }"
                  style="margin-right: 50px"
                >
                  <template #prefix>
                    <a-icon icon="material-symbols:inbox-outline" />
                  </template>
                </a-statistic>
              </a-space>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :loading="loading" title="内存" :bordered="false">
          <a-table
            :loading="loading"
            size="small"
            rowKey="name"
            :columns="memColumns"
            :data-source="memData"
            :pagination="false"
          >
            <template #mem="{ text, record }">
              <div :style="{ color: record.name == '使用率' && text > 80 ? 'red' : '' }">
                <a-icon
                  type="warning"
                  style="color: #ffcc00"
                  v-if="record.name == '使用率' && text > 80"
                />
                {{ text }} &nbsp;
                <code v-if="record.name == '使用率'">%</code>
                <code v-if="record.name != '使用率'">G</code>
              </div>
            </template>
            <template #jvm="{ text, record }">
              <div :style="{ color: record.name == '使用率' && text > 80 ? 'red' : '' }">
                <a-icon
                  type="warning"
                  style="color: #ffcc00"
                  v-if="record.name == '使用率' && text > 80"
                />
                {{ text }} &nbsp;
                <code v-if="record.name == '使用率'">%</code>
                <code v-if="record.name != '使用率'">M</code>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="24">
        <a-card :loading="loading" title="服务器信息" :bordered="false">
          <a-descriptions :column="2" v-if="server.sys">
            <a-descriptions-item label="服务器名称">
              {{ server.sys.computerName }}
            </a-descriptions-item>
            <a-descriptions-item label="操作系统">
              {{ server.sys.osName }}
            </a-descriptions-item>
            <a-descriptions-item label="服务器IP">
              {{ server.sys.computerIp }}
            </a-descriptions-item>
            <a-descriptions-item label="系统架构">
              {{ server.sys.osArch }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="24">
        <a-card :loading="loading" title="Java虚拟机信息" :bordered="false">
          <a-descriptions :column="2" v-if="server.jvm">
            <a-descriptions-item label="Java名称">
              {{ server.jvm.name }}
            </a-descriptions-item>
            <a-descriptions-item label="Java版本">
              {{ server.jvm.version }}
            </a-descriptions-item>
            <a-descriptions-item label="启动时间">
              {{ server.jvm.startTime }}
            </a-descriptions-item>
            <a-descriptions-item label="运行时长">
              {{ server.jvm.runTime }}
            </a-descriptions-item>
            <a-descriptions-item label="安装路径">
              {{ server.jvm.home }}
            </a-descriptions-item>
            <a-descriptions-item label="项目路径">
              {{ server.sys.userDir }}
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="24">
        <a-card :loading="loading" title="磁盘状态" :bordered="false">
          <a-table
            :loading="loading"
            size="small"
            rowKey="dirName"
            :columns="sysColumns"
            :data-source="sysData"
            :pagination="false"
          >
            <template #total="{ text }">
              {{ text }}
            </template>
            <template #free="{ text }">
              {{ text }}
            </template>
            <template #used="{ text }">
              {{ text }}
            </template>
            <template #usage="{ text }">
              <div :style="{ color: text > 80 ? 'red' : '' }">
                <a-icon type="warning" style="color: #ffcc00" v-if="text > 80" />
                {{ text }}<code>%</code>
              </div>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </a-space>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import {
    Row,
    Col,
    Descriptions,
    DescriptionsItem,
    Card,
    Statistic,
    Space,
    Table,
  } from 'ant-design-vue';
  import Icon from '/@/components/icon';
  import { getServer } from '/@/api/demo/monitor';
  import { ServerItem, SysFileItem } from '/@/api/demo/model/monitorModel';

  export default defineComponent({
    name: 'Server',
    components: {
      ARow: Row,
      ACol: Col,
      ADescriptions: Descriptions,
      ACard: Card,
      AStatistic: Statistic,
      ASpace: Space,
      ADescriptionsItem: DescriptionsItem,
      AIcon: Icon,
      ATable: Table,
    },
    setup() {
      const loading = ref<boolean>(true);
      const server = ref<ServerItem>({});
      const memData = ref([]);
      const sysData = ref<SysFileItem[]>([]);
      const memColumns = ref([
        {
          title: '属性',
          dataIndex: 'name',
        },
        {
          title: '内存',
          dataIndex: 'mem',
          scopedSlots: { customRender: 'mem' },
        },
        {
          title: 'JVM',
          dataIndex: 'jvm',
          scopedSlots: { customRender: 'jvm' },
        },
      ]);
      const sysColumns = ref([
        {
          title: '盘符路径',
          dataIndex: 'dirName',
          ellipsis: true,
        },
        {
          title: '文件系统',
          dataIndex: 'sysTypeName',
        },
        {
          title: '盘符类型',
          dataIndex: 'typeName',
          ellipsis: true,
        },
        {
          title: '总大小',
          dataIndex: 'total',
          scopedSlots: { customRender: 'total' },
        },
        {
          title: '可用大小',
          dataIndex: 'free',
          scopedSlots: { customRender: 'free' },
        },
        {
          title: '已用大小',
          dataIndex: 'used',
          scopedSlots: { customRender: 'used' },
        },
        {
          title: '已用百分比',
          dataIndex: 'usage',
          scopedSlots: { customRender: 'usage' },
        },
      ]);

      onMounted(async () => {
        const res = await getServer();
        const s = res;
        server.value = s;
        memData.value = [
          {
            name: '总内存',
            mem: s.mem.total,
            jvm: s.jvm.total,
          },
          {
            name: '已用内存',
            mem: s.mem.used,
            jvm: s.jvm.used,
          },
          {
            name: '剩余内存',
            mem: s.mem.free,
            jvm: s.jvm.free,
          },
          {
            name: '使用率',
            mem: s.mem.usage,
            jvm: s.jvm.usage,
          },
        ];
        sysData.value = s.sysFiles;
        loading.value = false;
      });
      return {
        loading,
        server,
        memData,
        sysData,
        memColumns,
        sysColumns,
      };
    },
  });
</script>
