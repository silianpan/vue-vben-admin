<template>
  <a-space direction="vertical">
    <a-row :gutter="24">
      <a-col :span="24">
        <a-card :loading="loading" title="基本信息" :bordered="false">
          <a-descriptions :column="4">
            <a-descriptions-item label="Redis版本">
              <span v-if="cache.info">{{ cache.info.redis_version }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="运行模式">
              <span v-if="cache.info">{{
                cache.info.redis_mode == 'standalone' ? '单机' : '集群'
              }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="端口">
              <span v-if="cache.info">{{ cache.info.tcp_port }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="客户端数">
              <span v-if="cache.info">{{ cache.info.connected_clients }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="运行时间(天)">
              <span v-if="cache.info">{{ cache.info.uptime_in_days }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="使用内存">
              <span v-if="cache.info">{{ cache.info.used_memory_human }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="使用CPU">
              <span v-if="cache.info">{{
                parseFloat(cache.info.used_cpu_user_children).toFixed(2)
              }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="内存配置">
              <span v-if="cache.info">{{ cache.info.maxmemory_human }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="AOF是否开启">
              <span v-if="cache.info">{{ cache.info.aof_enabled == '0' ? '否' : '是' }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="RDB是否成功">
              <span v-if="cache.info">{{ cache.info.rdb_last_bgsave_status }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="Key数量">
              <span v-if="cache.dbSize">{{ cache.dbSize }}</span>
            </a-descriptions-item>
            <a-descriptions-item label="系统架构">
              <span v-if="cache.info"
                >{{ cache.info.instantaneous_input_kbps }}kps/{{
                  cache.info.instantaneous_output_kbps
                }}kps</span
              >
            </a-descriptions-item>
          </a-descriptions>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="24">
      <a-col :span="12">
        <a-card :loading="loading" title="命令统计" :bordered="false">
          <div id="mountNode"></div>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card :loading="loading" title="内存信息" :bordered="false">
          <div id="usedmemory"></div>
        </a-card>
      </a-col>
    </a-row>
  </a-space>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, nextTick } from 'vue';
  import { Row, Col, Descriptions, DescriptionsItem, Card, Space } from 'ant-design-vue';
  import { Pie, Gauge } from '@antv/g2plot';

  import { getCache } from '/@/api/demo/monitor';
  import { CacheItem } from '/@/api/demo/model/monitorModel';

  export default defineComponent({
    name: 'Cache',
    components: {
      ARow: Row,
      ACol: Col,
      ADescriptions: Descriptions,
      ACard: Card,
      ASpace: Space,
      ADescriptionsItem: DescriptionsItem,
    },
    setup() {
      const loading = ref<boolean>(true);
      const cache = ref<CacheItem>({});
      const usedmemory = ref({});

      onMounted(async () => {
        const res = await getCache();
        cache.value = res;
        usedmemory.value = res.commandStats.map(({ name, value }) => ({
          name,
          value: parseFloat(value),
        }));
        loading.value = false;

        nextTick(() => {
          /* 饼图 */
          const piePlot = new Pie('mountNode', {
            appendPadding: 10,
            data: usedmemory.value,
            angleField: 'value',
            legend: false, // 关闭图例
            colorField: 'name',
            radius: 0.9,
            label: {
              type: 'outer',
              content: '{name}',
            },
            interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
          });
          const gauge = new Gauge('usedmemory', {
            percent: parseFloat(res.info.used_memory_human.replace('K')),
            range: {
              color: '#30BF78',
            },
            indicator: {
              pointer: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
              pin: {
                style: {
                  stroke: '#D0D0D0',
                },
              },
            },
            axis: {
              label: {
                formatter(v) {
                  return Number(v) * 1000;
                },
              },
              subTickLine: {
                count: 3,
              },
            },
            statistic: {
              content: {
                formatter: ({ percent }) => `内存消耗: ${percent}K`,
                style: {
                  color: 'rgba(0,0,0,0.65)',
                  fontSize: 24,
                },
              },
            },
          });

          gauge.render();
          piePlot.render();
        });
      });

      return {
        loading,
        cache,
        usedmemory,
      };
    },
  });
</script>
