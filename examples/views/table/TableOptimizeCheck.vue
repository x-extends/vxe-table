<template>
  <div class="opt-check-demo">
    <div class="demo-desc">
      行高测量优化的兼容性验证：树表（<code>showLine</code>）、展开行、合并单元格（<code>spanMethod</code>）、虚拟滚动 + 自动行高 + tooltip、惯性/触摸滚动、行高相关 API。<br />
      三张表都不设 <code>show-overflow</code>，多行内容由自定义 <code>&lt;p&gt;</code> 撑开自动行高；行数按固定序列在 1~4 之间变化。
    </div>

    <div class="demo-bar">
      <vxe-button size="mini" @click="toggleTreeEvent">展开/折叠全部树节点</vxe-button>
      <vxe-button size="mini" @click="toggleExpandEvent">展开/折叠首行</vxe-button>
      <vxe-button size="mini" @click="recalcEvent">recalculate(true)</vxe-button>
      <vxe-button size="mini" @click="recalcRowHeightEvent">recalcRowHeight(首行)</vxe-button>
      <vxe-button size="mini" @click="momentumEvent">模拟惯性/触摸滚动</vxe-button>
      <span class="status">{{ status.text }}</span>
    </div>

    <h4>① 树形表格：showLine + 自动行高（非虚拟树）</h4>
    <vxe-table
      ref="treeRef"
      border
      height="240"
      :data="treeData"
      :row-config="{ keyField: 'id' }"
      :column-config="{ resizable: true }"
      :tree-config="{ childrenField: 'children', showLine: true }"
      :tooltip-config="tooltipConfig"
    >
      <vxe-column field="name" title="节点" tree-node width="200"></vxe-column>
      <vxe-column field="lines" title="多行内容（溢出弹气泡）" width="260">
        <template #default="{ row }">
          <div class="multi-cell">
            <p v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="code" title="编码" width="140"></vxe-column>
    </vxe-table>

    <h4>② 展开行：纵向虚拟 + 自动行高</h4>
    <vxe-table
      ref="expandRef"
      border
      height="240"
      :data="expandData"
      :row-config="{ keyField: 'id' }"
      :expand-config="{ showIcon: true }"
      :virtual-y-config="{ enabled: true, gt: 0 }"
      :tooltip-config="tooltipConfig"
    >
      <vxe-column type="expand" width="60">
        <template #content="{ row }">
          <div class="expand-content">{{ row.detail }}</div>
        </template>
      </vxe-column>
      <vxe-column field="name" title="名称" width="120"></vxe-column>
      <vxe-column field="lines" title="多行内容（溢出弹气泡）" width="260">
        <template #default="{ row }">
          <div class="multi-cell">
            <p v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
          </div>
        </template>
      </vxe-column>
    </vxe-table>

    <h4>③ 横向虚拟 + 纵向原生滚动：惯性滚动与 tooltip</h4>
    <vxe-table
      ref="scrollRef"
      border
      height="240"
      :data="scrollData"
      :row-config="{ keyField: 'id' }"
      :column-config="{ resizable: true }"
      :edit-config="{ trigger: 'click', mode: 'cell' }"
      :virtual-x-config="{ enabled: true, gt: 0 }"
      :virtual-y-config="{ enabled: false }"
      :tooltip-config="tooltipConfig"
    >
      <vxe-column type="seq" width="60" fixed="left"></vxe-column>
      <vxe-column field="name" title="名称（点击可编辑）" width="160" fixed="left" :edit-render="{ name: 'input' }"></vxe-column>
      <vxe-column field="lines" title="多行内容（溢出弹气泡）" width="260">
        <template #default="{ row }">
          <div class="multi-cell">
            <p v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
          </div>
        </template>
      </vxe-column>
      <vxe-column v-for="col in dynCols" :key="col.field" :field="col.field" :title="col.title" :width="col.width"></vxe-column>
    </vxe-table>

    <h4>④ 合并单元格：spanMethod + 纵向虚拟 + 自动行高</h4>
    <vxe-table
      ref="mergeRef"
      border
      height="260"
      :data="mergeData"
      :row-config="{ keyField: 'id' }"
      :span-method="mergeMethod"
      :virtual-y-config="{ enabled: true, gt: 0 }"
    >
      <vxe-column type="seq" width="60"></vxe-column>
      <vxe-column field="name" title="名称" width="120"></vxe-column>
      <vxe-column field="lines" title="多行内容" width="260">
        <template #default="{ row }">
          <div class="multi-cell">
            <p v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
          </div>
        </template>
      </vxe-column>
      <vxe-column field="merged" title="合并列（每 2 行合并）" width="220">
        <template #default="{ row }">
          <div class="merge-content">{{ row.merged }}</div>
        </template>
      </vxe-column>
    </vxe-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, nextTick } from 'vue'

const SHORT = '简短说明，未溢出'
const LONG = '这是一条很长很长的说明文字，用来验证单行省略之后鼠标悬停弹出完整内容，后面还有很多很多文字用于确保超出列宽'
const LINE_PATTERN = [3, 1, 4, 2, 3, 2, 4, 1]

const makeLines = (index: number) => {
  const count = LINE_PATTERN[index % LINE_PATTERN.length]
  const longIndex = index % 2 === 0 ? Math.min(1, count - 1) : -1
  return Array.from({ length: count }, (_, i) =>
    `第 ${index + 1} 行 · 第${i + 1}条${i === longIndex ? '（超长）：' + LONG : '：' + SHORT}`
  )
}

const treeData = ref<any[]>(
  Array.from({ length: 3 }, (_, p) => ({
    id: `p${p}`,
    name: `父节点 ${p + 1}`,
    code: `P-${p + 1}`,
    lines: makeLines(p),
    children: Array.from({ length: 3 }, (_, c) => {
      const idx = p * 4 + c + 1
      return {
        id: `p${p}-c${c}`,
        name: `子节点 ${p + 1}-${c + 1}`,
        code: `C-${idx}`,
        lines: makeLines(idx)
      }
    })
  }))
)

const expandData = ref<any[]>(
  Array.from({ length: 10 }, (_, i) => ({
    id: 2000 + i,
    name: `行 ${i + 1}`,
    lines: makeLines(i),
    detail: `展开内容 ${i + 1}：第一行明细\n第二行明细\n第三行明细`
  }))
)

const dynCols = Array.from({ length: 8 }, (_, i) => ({
  field: `col${i}`,
  title: `列 ${i + 1}`,
  width: 140
}))

const scrollData = ref<any[]>(
  Array.from({ length: 30 }, (_, i) => {
    const row: Record<string, any> = {
      id: 3000 + i,
      name: `行 ${i + 1}`,
      lines: makeLines(i)
    }
    dynCols.forEach((col, j) => {
      row[col.field] = `值 ${i + 1}-${j + 1}`
    })
    return row
  })
)

const mergeData = ref<any[]>(
  Array.from({ length: 12 }, (_, i) => ({
    id: 4000 + i,
    name: `行 ${i + 1}`,
    lines: makeLines(i),
    merged: `合并块 ${Math.floor(i / 2) + 1} · ${i % 2 === 0 ? '跨两行的合并内容' : '被合并行'}`
  }))
)

// merged 列每两行合并一次，用来验证跨行合并单元格的高度计算
const mergeMethod = ({ rowIndex, column }: any) => {
  if (column.field === 'merged') {
    return rowIndex % 2 === 0 ? { rowspan: 2, colspan: 1 } : { rowspan: 0, colspan: 0 }
  }
  return { rowspan: 1, colspan: 1 }
}

const escapeHtml = (text: string) => {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return text.replace(/[&<>"']/g, s => map[s])
}

const tooltipConfig = {
  showAll: true,
  enterable: true,
  useHtml: true,
  defaultPlacement: 'top' as const,
  contentMethod ({ cell, column, row }: any) {
    if (column.field !== 'lines') {
      return false
    }
    const lineEls = Array.from(cell.querySelectorAll<HTMLElement>('.multi-cell p'))
    if (!lineEls.some(el => el.scrollWidth > el.clientWidth + 1)) {
      return false
    }
    return (row.lines || []).map((line: string) => `<div style="line-height:22px">${escapeHtml(line)}</div>`).join('')
  }
}

const treeRef = ref<any>()
const expandRef = ref<any>()
const scrollRef = ref<any>()
const mergeRef = ref<any>()
const status = reactive({ text: '—' })

let treeOpen = false
const toggleTreeEvent = async () => {
  treeOpen = !treeOpen
  await treeRef.value?.setAllTreeExpand(treeOpen)
  await nextTick()
  status.text = `树节点已${treeOpen ? '展开' : '折叠'}`
}

const toggleExpandEvent = async () => {
  const row = expandData.value[0]
  await expandRef.value?.toggleRowExpand(row)
  await nextTick()
  status.text = `首行展开状态：${expandRef.value?.isRowExpandByRow(row)}`
}

const recalcEvent = async () => {
  await treeRef.value?.recalculate(true)
  await expandRef.value?.recalculate(true)
  await scrollRef.value?.recalculate(true)
  await mergeRef.value?.recalculate(true)
  status.text = 'recalculate(true) 完成'
}

const recalcRowHeightEvent = async () => {
  const rest = await scrollRef.value?.recalcRowHeight(scrollData.value[0])
  status.text = `recalcRowHeight 返回 status=${rest?.status}`
}

// 模拟触摸惯性滚动：逐帧递减位移触发原生 scroll 事件，最后停止
const momentumEvent = async () => {
  const tables = document.querySelectorAll('.vxe-table')
  const sc = tables[2]?.querySelector<HTMLElement>('.vxe-table--body-inner-wrapper')
  if (!sc) {
    status.text = '未找到滚动容器'
    return
  }
  const maxTop = sc.scrollHeight - sc.clientHeight
  sc.scrollTop = 0
  let speed = 90
  for (let i = 0; i < 28; i++) {
    sc.scrollTop = Math.min(maxTop, sc.scrollTop + speed)
    speed = Math.max(4, speed * 0.88)
    await new Promise(resolve => requestAnimationFrame(resolve))
  }
  await new Promise(resolve => setTimeout(resolve, 700))
  status.text = `惯性滚动结束 scrollTop=${Math.round(sc.scrollTop)}`
}
</script>

<style scoped>
.opt-check-demo {
  padding: 8px;
}

.demo-desc {
  margin-bottom: 10px;
  color: #666;
  line-height: 1.8;
}

.demo-desc code {
  padding: 1px 4px;
  border-radius: 3px;
  background: #f2f3f5;
  color: #c7254e;
}

.demo-bar {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.status {
  color: #18913a;
}

h4 {
  margin: 16px 0 8px;
  font-size: 14px;
}

.multi-cell p {
  margin: 0;
  line-height: 22px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expand-content {
  padding: 8px;
  white-space: pre-line;
  line-height: 22px;
}

.merge-content {
  line-height: 22px;
}
</style>
