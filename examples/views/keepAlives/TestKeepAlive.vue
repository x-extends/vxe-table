<template>
  <div>
    <el-tabs v-model="activeTab">
      <el-tab-pane label="Table 1" name="table1">
        <keep-alive>
          <component :is="'TestTable1'" v-if="activeTab === 'table1'" :key="'table1'" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="Table 2" name="table2">
        <keep-alive>
          <component :is="'TestTable2'" v-if="activeTab === 'table2'" :key="'table2'" />
        </keep-alive>
      </el-tab-pane>
      <el-tab-pane label="Table 3" name="table3">
        <keep-alive>
          <component :is="'TestTable3'" v-if="activeTab === 'table3'" :key="'table3'" />
        </keep-alive>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import TestTable1 from './pages/TestTable1.vue'
import TestTable2 from './pages/TestTable2.vue'
import TestTable3 from './pages/TestTable3.vue'

const activeTab = ref('table1')
</script>