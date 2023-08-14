<template>
  <div>
    <p class="tip">
      虚拟滚动<span class="orange">（最大可以支撑 10w 列、30w 行）</span><br>
      高性能的虚拟渲染，默认情况下，如果设置了 <table-api-link prop="height"/>、<table-api-link prop="max-height"/> 则会根据触发规则自动启用虚拟渲染，触发规则由 <table-api-link prop="scroll-x"/>.<table-api-link prop="gt"/> | <table-api-link prop="scroll-y"/>.<table-api-link prop="gt"/> 设置。虚拟滚动启用后只会渲染指定范围内的可视区数据，其他的数据将被卷去收起，当滚动到可视区时才被渲染出来<br>
      <span class="red">（注：启用虚拟滚动后：<table-api-link prop="show-overflow"/>，<table-api-link prop="show-header-overflow"/>，<table-api-link prop="show-footer-overflow"/> 参数将根据不同场景各自触发生效，无法取消；如果需要支持，将虚拟滚动关闭即可）</span><br>
      <span class="green">（性能优化：横向虚拟滚动由列宽决定性能，每一列的列宽越大就越流畅；纵向虚拟滚动由行高决定性能，每一行的高度越高就越流畅）</span>
    </p>

    <vxe-table
      border
      show-overflow
      highlight-hover-row
      ref="xTable1"
      height="300"
      :scroll-y="{enabled: true}">
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" sortable></vxe-column>
      <vxe-column field="role" title="Role"></vxe-column>
      <vxe-column field="sex" title="Sex"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
    </pre>

    <p class="tip">
      手动调优，对于低性能的浏览器可以通过设置 <table-api-link prop="oSize"/> 偏移量来缓解渲染次数，偏移量越大渲染次数就越少，但是每次渲染的耗时就越久<br>
      通过指定 <table-api-link prop="scroll-x"/>={gt: 20} 或 <table-api-link prop="scroll-y"/>={gt: 40} 适合的参数可以手动调优，如果设置 <table-api-link prop="enabled"/>=false 则关闭虚拟滚动<br>
    </p>

    <vxe-table
      border
      show-overflow
      show-header-overflow
      show-footer-overflow
      show-footer
      ref="xTable2"
      height="300"
      :footer-method="footerMethod"
      :scroll-x="{enabled: true, gt: 10}"
      :scroll-y="{enabled: true, gt: 100}">
      <vxe-column type="seq" width="100"></vxe-column>
      <vxe-column field="name" title="Name" width="150" sortable></vxe-column>
      <vxe-column field="attr1" title="Attr1" width="100"></vxe-column>
      <vxe-column field="attr2" title="Attr2" width="100"></vxe-column>
      <vxe-column field="attr3" title="Attr3" width="100"></vxe-column>
      <vxe-column field="attr4" title="Attr4" width="100"></vxe-column>
      <vxe-column field="attr5" title="Attr5" width="150" sortable></vxe-column>
      <vxe-column field="attr6" title="Attr6" width="100"></vxe-column>
      <vxe-column field="attr7" title="Attr7" width="100"></vxe-column>
      <vxe-column field="attr8" title="Attr8" width="200" show-overflow></vxe-column>
      <vxe-column field="attr9" title="Attr9" width="100"></vxe-column>
      <vxe-column field="attr10" title="Attr10" width="100"></vxe-column>
      <vxe-column field="attr11" title="Attr11" width="100"></vxe-column>
      <vxe-column field="attr12" title="Attr12" width="100"></vxe-column>
      <vxe-column field="attr13" title="Attr13" width="150" sortable></vxe-column>
      <vxe-column field="attr14" title="Attr14" width="100"></vxe-column>
      <vxe-column field="attr15" title="Attr15" width="100"></vxe-column>
    </vxe-table>

    <pre>
      <pre-code>
        | Arrow Up ↑ | 匀速向上滚动数据 |
        | Arrow Down ↓ | 匀速向下滚动数据 |
        | Arrow Left ← | 匀速向左滚动数据 |
        | Arrow Right → | 匀速向右滚动数据 |
        | Page Up | 向上翻页滚动 |
        | Page Down | 向下翻页滚动 |
        | Spacebar | 翻页滚动 |
        | Home | 滚动到顶部 |
        | End | 滚动到底部 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[2] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[3] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from 'vue'
import { VxeTableInstance } from '../../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup () {
    const mockList1: any = []
    for (let index = 0; index < 200; index++) {
      mockList1.push({
        name: 'Test' + index,
        role: 'Developer',
        sex: '男'
      })
    }

    const xTable1 = ref({} as VxeTableInstance)

    onMounted(() => {
      nextTick(() => {
        const $table = xTable1.value
        if ($table) {
          $table.loadData(XEUtils.clone(mockList1, true))
        }
      })
    })

    const mockList2: any = []
    for (let index = 0; index < 200; index++) {
      mockList2.push({
        name: 'Test' + index,
        attr1: index,
        attr2: 'a2-' + index,
        attr3: 'a3-' + index,
        attr4: 'a4-' + index,
        attr5: 'a5-' + index,
        attr6: 'a6-' + index,
        attr7: 'a7-' + index,
        attr8: 'a8-' + index,
        attr9: 'a9-' + index,
        attr10: 'a10-' + index,
        attr11: 'a11-' + index,
        attr12: 'a12-' + index,
        attr13: 'a13-' + index,
        attr14: 'a14-' + index
      })
    }

    const xTable2 = ref({} as VxeTableInstance)

    onMounted(() => {
      nextTick(() => {
        const $table = xTable2.value
        if ($table) {
          $table.loadData(XEUtils.clone(mockList2, true))
        }
      })
    })

    const sumNum = (list: any[], field: string) => {
      let count = 0
      list.forEach(item => {
        count += Number(item[field])
      })
      return count
    }

    const footerMethod = ({ columns, data }: any) => {
      // 返回一个二维数组的表尾合计
      const footData = [
        columns.map((column: any, columnIndex: any) => {
          if (columnIndex === 0) {
            return '平均'
          }
          switch (column.property) {
            case 'attr1':
              return sumNum(data, 'attr1')
          }
          return '-'
        })
      ]
      return footData
    }

    return {
      xTable1,
      xTable2,
      footerMethod,
      demoCodes: [
        `
        <vxe-table
          border
          show-overflow
          highlight-hover-row
          ref="xTable1"
          height="300">
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" sortable></vxe-column>
          <vxe-column field="role" title="Role"></vxe-column>
          <vxe-column field="sex" title="Sex"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, onMounted, nextTick } from 'vue'
        import { VxeTableInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const mockList1: any = []
            for (let index = 0; index < 200; index++) {
              mockList1.push({
                name: 'Test' + index,
                role: 'Developer',
                sex: '男'
              })
            }

            const xTable1 = ref({} as VxeTableInstance)

            onMounted(() => {
              nextTick(() => {
                const $table = xTable1.value
                if ($table) {
                  $table.loadData(XEUtils.clone(mockList1, true))
                }
              })
            })

            return {
              xTable1
            }
          }
        })
        `,
        `
        <vxe-table
          border
          show-overflow
          show-header-overflow
          show-footer-overflow
          show-footer
          ref="xTable2"
          height="300"
          :footer-method="footerMethod"
          :scroll-x="{gt: 10}"
          :scroll-y="{gt: 100}">
          <vxe-column type="seq" width="100"></vxe-column>
          <vxe-column field="name" title="Name" width="150" sortable></vxe-column>
          <vxe-column field="attr1" title="Attr1" width="100"></vxe-column>
          <vxe-column field="attr2" title="Attr2" width="100"></vxe-column>
          <vxe-column field="attr3" title="Attr3" width="100"></vxe-column>
          <vxe-column field="attr4" title="Attr4" width="100"></vxe-column>
          <vxe-column field="attr5" title="Attr5" width="150" sortable></vxe-column>
          <vxe-column field="attr6" title="Attr6" width="100"></vxe-column>
          <vxe-column field="attr7" title="Attr7" width="100"></vxe-column>
          <vxe-column field="attr8" title="Attr8" width="200" show-overflow></vxe-column>
          <vxe-column field="attr9" title="Attr9" width="100"></vxe-column>
          <vxe-column field="attr10" title="Attr10" width="100"></vxe-column>
          <vxe-column field="attr11" title="Attr11" width="100"></vxe-column>
          <vxe-column field="attr12" title="Attr12" width="100"></vxe-column>
          <vxe-column field="attr13" title="Attr13" width="150" sortable></vxe-column>
          <vxe-column field="attr14" title="Attr14" width="100"></vxe-column>
          <vxe-column field="attr15" title="Attr15" width="100"></vxe-column>
        </vxe-table>
        `,
        `
        import { defineComponent, ref, onMounted, nextTick } from 'vue'
        import { VxeTableInstance } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup () {
            const mockList2: any = []
            for (let index = 0; index < 200; index++) {
              mockList2.push({
                name: 'Test' + index,
                attr1: index,
                attr2: 'a2-' + index,
                attr3: 'a3-' + index,
                attr4: 'a4-' + index,
                attr5: 'a5-' + index,
                attr6: 'a6-' + index,
                attr7: 'a7-' + index,
                attr8: 'a8-' + index,
                attr9: 'a9-' + index,
                attr10: 'a10-' + index,
                attr11: 'a11-' + index,
                attr12: 'a12-' + index,
                attr13: 'a13-' + index,
                attr14: 'a14-' + index
              })
            }

            const xTable2 = ref({} as VxeTableInstance)

            onMounted(() => {
              nextTick(() => {
                const $table = xTable2.value
                if ($table) {
                  $table.loadData(XEUtils.clone(mockList2, true))
                }
              })
            })

            const sumNum = (list: any[], field: string) => {
              let count = 0
              list.forEach(item => {
                count += Number(item[field])
              })
              return count
            }

            const footerMethod = ({ columns, data }: any) => {
              // 返回一个二维数组的表尾合计
              const footData = [
                columns.map((column: any, columnIndex: any) => {
                  if (columnIndex === 0) {
                    return '平均'
                  }
                  switch (column.property) {
                    case 'attr1':
                      return sumNum(data, 'attr1')
                  }
                  return '-'
                })
              ]
              return footData
            }

            return {
              xTable2,
              footerMethod
            }
          }
        })
        `
      ]
    }
  }
})
</script>
