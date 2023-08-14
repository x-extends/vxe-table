<template>
  <div>
    <p class="tip">虚拟树表格，虚拟树与虚拟列表行为完全一致，区别是需要设置 <table-api-link prop="transform"/> 开启自动将列表转成树结构</p>

    <vxe-toolbar>
      <template #buttons>
        <vxe-button @click="$refs.xTable.setAllTreeExpand(true)">展开所有</vxe-button>
        <vxe-button @click="$refs.xTable.setAllTreeExpand(false)">收起所有</vxe-button>
      </template>
    </vxe-toolbar>

    <vxe-table
      show-overflow
      height="500"
      ref="xTable"
      :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
      :scroll-y="{enabled: true, gt: 0}"
      :data="demo1.tableData">
      <vxe-column type="seq" width="200" tree-node></vxe-column>
      <vxe-column field="name" title="Name"></vxe-column>
      <vxe-column field="size" title="Size"></vxe-column>
      <vxe-column field="type" title="Type"></vxe-column>
      <vxe-column field="date" title="Date"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import { VxeTableInstance } from '../../../../types/index'

export default defineComponent({
  setup () {
    const xTable = ref({} as VxeTableInstance)

    const demo1 = reactive({
      tableData: [
        { id: 110000, parentId: null, name: 'vxe-table test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
        { id: 111000, parentId: 110000, name: 'vxe-table test abc2', type: 'html', size: 600, date: '2021-04-01' },
        { id: 111100, parentId: 111000, name: 'vxe-table test abc3', type: 'html', size: 600, date: '2021-04-01' },
        { id: 111110, parentId: 111100, name: 'vxe-table test abc4', type: 'html', size: 600, date: '2021-04-01' },
        { id: 111111, parentId: 111110, name: 'vxe-table test abc5', type: 'html', size: 600, date: '2021-04-01' },
        { id: 111112, parentId: 111110, name: 'vxe-table test abc6', type: 'html', size: 600, date: '2021-04-01' },
        { id: 120000, parentId: null, name: 'Test7', type: 'mp4', size: null, date: '2021-04-01' },
        { id: 121000, parentId: 120000, name: 'Test8', type: 'avi', size: 1024, date: '2020-03-01' },
        { id: 121100, parentId: 121000, name: 'vxe-table test abc9', type: 'html', size: 600, date: '2021-04-01' },
        { id: 121200, parentId: 121000, name: 'vxe-table test abc10', type: 'avi', size: null, date: '2021-04-01' },
        { id: 121300, parentId: 121000, name: 'vxe-table test abc11', type: 'txt', size: 25, date: '2021-10-01' },
        { id: 121310, parentId: 121300, name: 'Test12', type: 'pdf', size: 512, date: '2020-01-01' },
        { id: 121320, parentId: 121310, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 130000, parentId: null, name: 'Test14', type: 'xlsx', size: 2048, date: '2020-11-01' },
        { id: 140000, parentId: null, name: 'vue 从入门到精通15', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 141000, parentId: 140000, name: 'Test16', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 142000, parentId: 140000, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 143000, parentId: 140000, name: 'Test78', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 150000, parentId: null, name: 'vue 从入门到精通19', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 160000, parentId: null, name: 'vue 从入门到精通20', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 161000, parentId: 160000, name: 'Test21', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 162000, parentId: 160000, name: 'Test22', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163000, parentId: 160000, name: 'Test23', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163100, parentId: 164000, name: 'Test24', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163200, parentId: 164000, name: 'Test25', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163300, parentId: 164000, name: 'Test26', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163400, parentId: 164000, name: 'Test27', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163500, parentId: 164000, name: 'Test28', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 163600, parentId: 164000, name: 'vxe-table test abc29', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164000, parentId: 160000, name: 'Test30', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164100, parentId: 164000, name: 'Test31', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164200, parentId: 164000, name: 'Test32', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164300, parentId: 164000, name: 'vxe-table test abc33', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164400, parentId: 164000, name: 'Test34', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164500, parentId: 164000, name: 'Test35', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164600, parentId: 164000, name: 'Test36', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164700, parentId: 164000, name: 'Test37', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164800, parentId: 164000, name: 'Test38', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 164900, parentId: 164000, name: 'vxe-table test abc40', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 165000, parentId: 160000, name: 'Test41', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 166000, parentId: 160000, name: 'Test42', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 167000, parentId: 160000, name: 'Test43', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 168000, parentId: 160000, name: 'Test44', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 169000, parentId: 160000, name: 'Test45', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 170000, parentId: null, name: 'vue 从入门到精通46', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 180000, parentId: null, name: 'vue 从入门到精通47', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 181000, parentId: 180000, name: 'Test48', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 182000, parentId: 180000, name: 'Test49', type: 'js', size: 1024, date: '2021-06-14' },
        { id: 184000, parentId: 180000, name: 'Test50', type: 'js', size: 1024, date: '2021-06-23' },
        { id: 185000, parentId: 180000, name: 'Test51', type: 'js', size: 1024, date: '2021-06-11' },
        { id: 186000, parentId: 180000, name: 'Test52', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 190000, parentId: null, name: 'vue 从入门到精通53', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 191000, parentId: 190000, name: 'Test54', type: 'js', size: 1024, date: '2021-06-04' },
        { id: 192000, parentId: 190000, name: 'Test55', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 193000, parentId: 190000, name: 'Test56', type: 'js', size: 1024, date: '2021-06-03' },
        { id: 194000, parentId: 190000, name: 'Test57', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 200000, parentId: null, name: 'vue 从入门到精通58', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 201000, parentId: 200000, name: 'Test59', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 202000, parentId: 200000, name: 'Test60', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 203000, parentId: 200000, name: 'Test61', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 204000, parentId: 200000, name: 'Test62', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 205000, parentId: 200000, name: 'Test63', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 206000, parentId: 200000, name: 'Test64', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 210000, parentId: null, name: 'vue 从入门到精通65', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 220000, parentId: null, name: 'vue 从入门到精通66', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 230000, parentId: null, name: 'vxe-table test abc67', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 240000, parentId: null, name: 'vue 从入门到精通68', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 250000, parentId: null, name: 'vue 从入门到精通69', type: 'avi', size: 224, date: '2020-01-01' },
        { id: 251000, parentId: 250000, name: 'Test70', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 252000, parentId: 250000, name: 'Test71', type: 'js', size: 1024, date: '2021-08-02' },
        { id: 253000, parentId: 250000, name: 'Test72', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254000, parentId: 250000, name: 'Test73', type: 'js', size: 1024, date: '2021-06-03' },
        { id: 254100, parentId: 254000, name: 'Test74', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254200, parentId: 254000, name: 'vxe-table test abc75', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254300, parentId: 254000, name: 'Test76', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254310, parentId: 254300, name: 'Test76', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254320, parentId: 254300, name: 'Test78', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254321, parentId: 254320, name: 'Test79', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254322, parentId: 254320, name: 'Test80', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254323, parentId: 254320, name: 'vxe-table test abc81', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254324, parentId: 254320, name: 'Test82', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254325, parentId: 254320, name: 'Test83', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254326, parentId: 254320, name: 'Test84', type: 'js', size: 1024, date: '2021-06-07' },
        { id: 254327, parentId: 254320, name: 'Test85', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254330, parentId: 254300, name: 'Test86', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254340, parentId: 254300, name: 'vxe-table test abc87', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254350, parentId: 254300, name: 'Test88', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254360, parentId: 254300, name: 'Test89', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254370, parentId: 254300, name: 'vxe-table test abc90', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254400, parentId: 254000, name: 'Test91', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254500, parentId: 254000, name: 'Test92', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 254600, parentId: 254000, name: 'vxe-table test abc93', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 255000, parentId: 250000, name: 'Test94', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 256000, parentId: 250000, name: 'Test95', type: 'js', size: 1024, date: '2021-06-08' },
        { id: 257000, parentId: 250000, name: 'Test96', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 258000, parentId: 250000, name: 'Test97', type: 'js', size: 1024, date: '2021-06-01' },
        { id: 260000, parentId: null, name: 'vue 从入门到精通98', type: 'avi', size: 224, date: '2020-10-06' },
        { id: 261000, parentId: 260000, name: 'vue 从入门到精通99', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 261100, parentId: 261000, name: 'vue 从入门到精通100', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 261200, parentId: 261000, name: 'vue 从入门到精通101', type: 'avi', size: 224, date: '2020-10-04' },
        { id: 262000, parentId: 260000, name: 'vue 从入门到精通102', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 262100, parentId: 262000, name: 'vxe-table test abc103', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 262200, parentId: 262000, name: 'vue 从入门到精通104', type: 'avi', size: 224, date: '2020-10-03' },
        { id: 262300, parentId: 262000, name: 'vue 从入门到精通105', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 263000, parentId: 260000, name: 'vue 从入门到精通106', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 264000, parentId: 260000, name: 'vxe-table test abc107', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 270000, parentId: null, name: 'vue 从入门到精通108', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 280000, parentId: null, name: 'vue 从入门到精通109', type: 'avi', size: 224, date: '2020-09-01' },
        { id: 290000, parentId: null, name: 'vxe-table test abc110', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 300000, parentId: null, name: 'vue 从入门到精通111', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 310000, parentId: null, name: 'vue 从入门到精通112', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 320000, parentId: null, name: 'vue 从入门到精通113', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 321000, parentId: 320000, name: 'vue 从入门到精通114', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 322000, parentId: 320000, name: 'vue 从入门到精通115', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 323000, parentId: 320000, name: 'vue 从入门到精通116', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 324000, parentId: 320000, name: 'vue 从入门到精通117', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 325000, parentId: 320000, name: 'vxe-table test abc118', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 326000, parentId: 320000, name: 'vue 从入门到精通119', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 327000, parentId: 320000, name: 'vue 从入门到精通120', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 328000, parentId: 320000, name: 'vue 从入门到精通121', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329000, parentId: 320000, name: 'vue 从入门到精通122', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329100, parentId: 329000, name: 'vxe-table test abc123', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329200, parentId: 329000, name: 'vue 从入门到精通124', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329300, parentId: 329000, name: 'vue 从入门到精通125', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329400, parentId: 329000, name: 'vue 从入门到精通125', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329500, parentId: 329000, name: 'vue 从入门到精通126', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329600, parentId: 329000, name: 'vue 从入门到精通127', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329700, parentId: 329000, name: 'vue 从入门到精通128', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329800, parentId: 329000, name: 'vue 从入门到精通129', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329810, parentId: 329800, name: 'vxe-table test abc130', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329820, parentId: 329800, name: 'vue 从入门到精通131', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329830, parentId: 329800, name: 'vue 从入门到精通132', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 329840, parentId: 329800, name: 'vue 从入门到精通133', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 330000, parentId: null, name: 'vue 从入门到精通134', type: 'avi', size: 224, date: '2020-10-01' },
        { id: 331000, parentId: null, name: 'vue 从入门到精通135', type: 'avi', size: 224, date: '2020-10-01' }
      ]
    })

    return {
      demo1,
      xTable,
      demoCodes: [
        `
        <vxe-toolbar>
          <template #buttons>
            <vxe-button @click="$refs.xTable.setAllTreeExpand(true)">展开所有</vxe-button>
            <vxe-button @click="$refs.xTable.setAllTreeExpand(false)">收起所有</vxe-button>
          </template>
        </vxe-toolbar>

        <vxe-table
          show-overflow
          height="500"
          ref="xTable"
          :tree-config="{transform: true, rowField: 'id', parentField: 'parentId'}"
          :scroll-y="{gt: 0}"
          :data="demo1.tableData">
          <vxe-column type="seq" width="200" tree-node></vxe-column>
          <vxe-column field="name" title="Name"></vxe-column>
          <vxe-column field="size" title="Size"></vxe-column>
          <vxe-column field="type" title="Type"></vxe-column>
          <vxe-column field="date" title="Date"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, reactive, ref } from 'vue'
        import { VxeTableInstance } from 'vxe-table'

        export default defineComponent({
          setup () {
            const xTable = ref({} as VxeTableInstance)

            const demo1 = reactive({
              tableData: [
                { id: 110000, parentId: null, name: 'vxe-table test abc1', type: 'mp3', size: 1024, date: '2020-08-01' },
                { id: 111000, parentId: 110000, name: 'vxe-table test abc2', type: 'html', size: 600, date: '2021-04-01' },
                { id: 111100, parentId: 111000, name: 'vxe-table test abc3', type: 'html', size: 600, date: '2021-04-01' },
                { id: 111110, parentId: 111100, name: 'vxe-table test abc4', type: 'html', size: 600, date: '2021-04-01' },
                { id: 111111, parentId: 111110, name: 'vxe-table test abc5', type: 'html', size: 600, date: '2021-04-01' },
                { id: 111112, parentId: 111110, name: 'vxe-table test abc6', type: 'html', size: 600, date: '2021-04-01' },
                { id: 120000, parentId: null, name: 'Test7', type: 'mp4', size: null, date: '2021-04-01' },
                { id: 121000, parentId: 120000, name: 'Test8', type: 'avi', size: 1024, date: '2020-03-01' },
                { id: 121100, parentId: 121000, name: 'vxe-table test abc9', type: 'html', size: 600, date: '2021-04-01' },
                { id: 121200, parentId: 121000, name: 'vxe-table test abc10', type: 'avi', size: null, date: '2021-04-01' },
                { id: 121300, parentId: 121000, name: 'vxe-table test abc11', type: 'txt', size: 25, date: '2021-10-01' },
                { id: 121310, parentId: 121300, name: 'Test12', type: 'pdf', size: 512, date: '2020-01-01' },
                { id: 121320, parentId: 121310, name: 'Test13', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 130000, parentId: null, name: 'Test14', type: 'xlsx', size: 2048, date: '2020-11-01' },
                { id: 140000, parentId: null, name: 'vue 从入门到精通15', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 141000, parentId: 140000, name: 'Test16', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 142000, parentId: 140000, name: 'Test17', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 143000, parentId: 140000, name: 'Test78', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 150000, parentId: null, name: 'vue 从入门到精通19', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 160000, parentId: null, name: 'vue 从入门到精通20', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 161000, parentId: 160000, name: 'Test21', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 162000, parentId: 160000, name: 'Test22', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163000, parentId: 160000, name: 'Test23', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163100, parentId: 164000, name: 'Test24', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163200, parentId: 164000, name: 'Test25', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163300, parentId: 164000, name: 'Test26', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163400, parentId: 164000, name: 'Test27', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163500, parentId: 164000, name: 'Test28', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 163600, parentId: 164000, name: 'vxe-table test abc29', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164000, parentId: 160000, name: 'Test30', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164100, parentId: 164000, name: 'Test31', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164200, parentId: 164000, name: 'Test32', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164300, parentId: 164000, name: 'vxe-table test abc33', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164400, parentId: 164000, name: 'Test34', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164500, parentId: 164000, name: 'Test35', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164600, parentId: 164000, name: 'Test36', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164700, parentId: 164000, name: 'Test37', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164800, parentId: 164000, name: 'Test38', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 164900, parentId: 164000, name: 'vxe-table test abc40', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 165000, parentId: 160000, name: 'Test41', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 166000, parentId: 160000, name: 'Test42', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 167000, parentId: 160000, name: 'Test43', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 168000, parentId: 160000, name: 'Test44', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 169000, parentId: 160000, name: 'Test45', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 170000, parentId: null, name: 'vue 从入门到精通46', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 180000, parentId: null, name: 'vue 从入门到精通47', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 181000, parentId: 180000, name: 'Test48', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 182000, parentId: 180000, name: 'Test49', type: 'js', size: 1024, date: '2021-06-14' },
                { id: 184000, parentId: 180000, name: 'Test50', type: 'js', size: 1024, date: '2021-06-23' },
                { id: 185000, parentId: 180000, name: 'Test51', type: 'js', size: 1024, date: '2021-06-11' },
                { id: 186000, parentId: 180000, name: 'Test52', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 190000, parentId: null, name: 'vue 从入门到精通53', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 191000, parentId: 190000, name: 'Test54', type: 'js', size: 1024, date: '2021-06-04' },
                { id: 192000, parentId: 190000, name: 'Test55', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 193000, parentId: 190000, name: 'Test56', type: 'js', size: 1024, date: '2021-06-03' },
                { id: 194000, parentId: 190000, name: 'Test57', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 200000, parentId: null, name: 'vue 从入门到精通58', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 201000, parentId: 200000, name: 'Test59', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 202000, parentId: 200000, name: 'Test60', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 203000, parentId: 200000, name: 'Test61', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 204000, parentId: 200000, name: 'Test62', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 205000, parentId: 200000, name: 'Test63', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 206000, parentId: 200000, name: 'Test64', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 210000, parentId: null, name: 'vue 从入门到精通65', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 220000, parentId: null, name: 'vue 从入门到精通66', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 230000, parentId: null, name: 'vxe-table test abc67', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 240000, parentId: null, name: 'vue 从入门到精通68', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 250000, parentId: null, name: 'vue 从入门到精通69', type: 'avi', size: 224, date: '2020-01-01' },
                { id: 251000, parentId: 250000, name: 'Test70', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 252000, parentId: 250000, name: 'Test71', type: 'js', size: 1024, date: '2021-08-02' },
                { id: 253000, parentId: 250000, name: 'Test72', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254000, parentId: 250000, name: 'Test73', type: 'js', size: 1024, date: '2021-06-03' },
                { id: 254100, parentId: 254000, name: 'Test74', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254200, parentId: 254000, name: 'vxe-table test abc75', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254300, parentId: 254000, name: 'Test76', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254310, parentId: 254300, name: 'Test76', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254320, parentId: 254300, name: 'Test78', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254321, parentId: 254320, name: 'Test79', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254322, parentId: 254320, name: 'Test80', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254323, parentId: 254320, name: 'vxe-table test abc81', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254324, parentId: 254320, name: 'Test82', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254325, parentId: 254320, name: 'Test83', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254326, parentId: 254320, name: 'Test84', type: 'js', size: 1024, date: '2021-06-07' },
                { id: 254327, parentId: 254320, name: 'Test85', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254330, parentId: 254300, name: 'Test86', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254340, parentId: 254300, name: 'vxe-table test abc87', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254350, parentId: 254300, name: 'Test88', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254360, parentId: 254300, name: 'Test89', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254370, parentId: 254300, name: 'vxe-table test abc90', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254400, parentId: 254000, name: 'Test91', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254500, parentId: 254000, name: 'Test92', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 254600, parentId: 254000, name: 'vxe-table test abc93', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 255000, parentId: 250000, name: 'Test94', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 256000, parentId: 250000, name: 'Test95', type: 'js', size: 1024, date: '2021-06-08' },
                { id: 257000, parentId: 250000, name: 'Test96', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 258000, parentId: 250000, name: 'Test97', type: 'js', size: 1024, date: '2021-06-01' },
                { id: 260000, parentId: null, name: 'vue 从入门到精通98', type: 'avi', size: 224, date: '2020-10-06' },
                { id: 261000, parentId: 260000, name: 'vue 从入门到精通99', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 261100, parentId: 261000, name: 'vue 从入门到精通100', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 261200, parentId: 261000, name: 'vue 从入门到精通101', type: 'avi', size: 224, date: '2020-10-04' },
                { id: 262000, parentId: 260000, name: 'vue 从入门到精通102', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 262100, parentId: 262000, name: 'vxe-table test abc103', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 262200, parentId: 262000, name: 'vue 从入门到精通104', type: 'avi', size: 224, date: '2020-10-03' },
                { id: 262300, parentId: 262000, name: 'vue 从入门到精通105', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 263000, parentId: 260000, name: 'vue 从入门到精通106', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 264000, parentId: 260000, name: 'vxe-table test abc107', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 270000, parentId: null, name: 'vue 从入门到精通108', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 280000, parentId: null, name: 'vue 从入门到精通109', type: 'avi', size: 224, date: '2020-09-01' },
                { id: 290000, parentId: null, name: 'vxe-table test abc110', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 300000, parentId: null, name: 'vue 从入门到精通111', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 310000, parentId: null, name: 'vue 从入门到精通112', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 320000, parentId: null, name: 'vue 从入门到精通113', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 321000, parentId: 320000, name: 'vue 从入门到精通114', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 322000, parentId: 320000, name: 'vue 从入门到精通115', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 323000, parentId: 320000, name: 'vue 从入门到精通116', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 324000, parentId: 320000, name: 'vue 从入门到精通117', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 325000, parentId: 320000, name: 'vxe-table test abc118', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 326000, parentId: 320000, name: 'vue 从入门到精通119', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 327000, parentId: 320000, name: 'vue 从入门到精通120', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 328000, parentId: 320000, name: 'vue 从入门到精通121', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329000, parentId: 320000, name: 'vue 从入门到精通122', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329100, parentId: 329000, name: 'vxe-table test abc123', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329200, parentId: 329000, name: 'vue 从入门到精通124', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329300, parentId: 329000, name: 'vue 从入门到精通125', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329400, parentId: 329000, name: 'vue 从入门到精通125', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329500, parentId: 329000, name: 'vue 从入门到精通126', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329600, parentId: 329000, name: 'vue 从入门到精通127', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329700, parentId: 329000, name: 'vue 从入门到精通128', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329800, parentId: 329000, name: 'vue 从入门到精通129', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329810, parentId: 329800, name: 'vxe-table test abc130', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329820, parentId: 329800, name: 'vue 从入门到精通131', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329830, parentId: 329800, name: 'vue 从入门到精通132', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 329840, parentId: 329800, name: 'vue 从入门到精通133', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 330000, parentId: null, name: 'vue 从入门到精通134', type: 'avi', size: 224, date: '2020-10-01' },
                { id: 331000, parentId: null, name: 'vue 从入门到精通135', type: 'avi', size: 224, date: '2020-10-01' }
              ]
            })

            return {
              demo1,
              xTable
            }
          }
        }
        `
      ]
    }
  }
})
</script>
