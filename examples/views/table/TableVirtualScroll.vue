<template>
  <div class="virtual-scroll-demo">
    <div class="demo-desc">
      <strong>自动行高 + 溢出气泡共存</strong>：表格级和列级都不写 <code>show-overflow</code>，
      因此 <code>.vxe-cell</code> 走 <code>min-height</code> 分支；单元格内 <code>&lt;p&gt;</code> 数量按固定序列在 1~4 行之间循环，
      行高各不相同，并随下方尺寸档位整体缩放，不用真随机也能复现不定高。<br />
      每个 <code>&lt;p&gt;</code> 自己用 <code>nowrap + ellipsis</code> 制造真实横向溢出；
      <code>tooltip-config</code> 用 <code>showAll: true</code> 让 hover 进入触发链（它不参与 <code>hasEllipsis</code> 计算，所以不会把单元格改成固定 height），
      再由 <code>contentMethod</code> 判断溢出行数，未溢出返回 <code>false</code> 抑制气泡。<br />
      四张表仅虚拟滚动开关不同；开启虚拟滚动时行高取自实测缓存，仍是每行不定高。偶数行含一条超长文本（会弹气泡），奇数行全部为短文本（不弹）。<br />
      尺寸档位沿用 TableSizeAdaptive 示例的做法：补齐 line-height / font-size / padding 与 row-height 变量，切换后调用 <code>recalculate(true)</code> 重新测量。
    </div>

    <div class="demo-bar">
      <vxe-radio-group v-model="size" :options="sizeOptions" type="button"></vxe-radio-group>
      <span>当前档位「{{ preset.label }}」：最小行高 {{ preset.rowHeight }}px · 行高 {{ preset.lineHeight }}px · 字号 {{ preset.fontSize }}px</span>
      <vxe-button size="mini" @click="recalculateEvent">重新计算布局</vxe-button>
    </div>

    <div class="demo-bar">
      <span>contentMethod 调用 {{ callCount }} 次</span>
      <span>最近判定：<b :class="lastCheck.ok ? 'is-ok' : 'is-no'">{{ lastCheck.text }}</b></span>
      <vxe-button size="mini" @click="resetStat">清空计数</vxe-button>
    </div>

    <template v-for="(mode, index) in tableModes" :key="mode.title">
      <h4 class="table-title">{{ mode.title }}<span class="table-subtitle">{{ mode.desc }}</span></h4>
      <vxe-table
        :ref="tableRefFns[index]"
        border
        height="260"
        :size="size"
        :cell-config="cellConfig"
        :data="tableData"
        :row-config="{ keyField: 'id', isHover: true }"
        :column-config="{ resizable: true }"
        :tooltip-config="tooltipConfig"
        :scrollbar-config="scrollbarConfig"
        :virtual-x-config="mode.virtualX"
        :virtual-y-config="mode.virtualY"
      >
        <vxe-column type="seq" width="60" fixed="left"></vxe-column>
        <vxe-column field="name" title="名称" width="110" fixed="left"></vxe-column>
        <!-- 关键：不开 show-overflow，改用自定义 slot 渲染多行内容 -->
        <vxe-column field="lines" title="多行说明（1~4 行，溢出才弹气泡）" width="260">
          <template #default="{ row }">
            <div class="multi-cell">
              <p v-for="(line, i) in row.lines" :key="i">{{ line }}</p>
            </div>
          </template>
        </vxe-column>
        <vxe-column v-for="col in dynColumns" :key="col.field" :field="col.field" :title="col.title" :width="col.width"></vxe-column>
      </vxe-table>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch, nextTick } from 'vue'

// 数据规模：调整这两个值即可控制列数与行数，用于对比不同虚拟滚动模式
const COL_COUNT = 20
const ROW_COUNT = 50

// 尺寸档位（与 TableSizeAdaptive 一致）：库内 .size--* 只改字号与内边距，
// line-height 恒为 22px，必须按档位补齐，多行内容才会跟着缩放
type DemoSizeType = 'small' | 'medium' | 'large'
interface DemoSizePreset {
  label: string
  rowHeight: number
  lineHeight: number
  fontSize: number
  verticalPadding: boolean
}

const SIZE_PRESET: Record<DemoSizeType, DemoSizePreset> = {
  small: { label: '小', rowHeight: 20, lineHeight: 16, fontSize: 12, verticalPadding: false },
  medium: { label: '中', rowHeight: 30, lineHeight: 18, fontSize: 13, verticalPadding: true },
  large: { label: '大', rowHeight: 40, lineHeight: 22, fontSize: 14, verticalPadding: true }
}

const size = ref<DemoSizeType>('medium')
const preset = computed(() => SIZE_PRESET[size.value])
const sizeOptions = [
  { label: SIZE_PRESET.small.label, value: 'small' },
  { label: SIZE_PRESET.medium.label, value: 'medium' },
  { label: SIZE_PRESET.large.label, value: 'large' }
]

// 只调整内边距，不设 height / maxHeight，避免破坏自动行高
const cellConfig = computed(() => ({
  padding: preset.value.verticalPadding ? true : { top: false, bottom: false }
}))

const callCount = ref(0)
const lastCheck = reactive({ text: '—', ok: false })

const resetStat = () => {
  callCount.value = 0
  lastCheck.text = '—'
  lastCheck.ok = false
}

const tableModes = [
  {
    title: '① 普通表格',
    desc: '横竖虚拟都关闭，.vxe-cell 为 min-height（标准自动行高）',
    virtualX: { enabled: false },
    virtualY: { enabled: false }
  },
  {
    title: '② 仅横向虚拟',
    desc: 'virtual-x-config 按列窗口渲染',
    virtualX: { enabled: true, gt: 0 },
    virtualY: { enabled: false }
  },
  {
    title: '③ 仅纵向虚拟',
    desc: 'virtual-y-config 按行窗口渲染，行高来自实测缓存',
    virtualX: { enabled: false },
    virtualY: { enabled: true, gt: 0 }
  },
  {
    title: '④ 双向虚拟',
    desc: '横竖虚拟同时启用',
    virtualX: { enabled: true, gt: 0 },
    virtualY: { enabled: true, gt: 0 }
  }
]

// 尺寸切换后 rowHeightStore 需要重新测量，四张表各持一个实例 ref
const tableRefs: any[] = []
const tableRefFns = tableModes.map((_, index) => (el: any) => {
  if (el) {
    tableRefs[index] = el
  }
})

const recalculateEvent = () => {
  tableRefs.forEach($table => {
    if ($table && $table.recalculate) {
      $table.recalculate(true)
    }
  })
}

watch(size, () => {
  nextTick(() => recalculateEvent())
})

const dynColumns = Array.from({ length: COL_COUNT }, (_, index) => ({
  field: `col${index}`,
  title: `普通列 ${index + 1}`,
  width: 140
}))

const shortLine = '简短说明，未溢出'
const longLine = '这是一条很长很长的说明文字，用来演示单行省略之后鼠标悬停弹出完整内容的效果，后面还有很多很多文字用于确保超出列宽'

// 伪随机但可复现：每行 <p> 数量按此序列循环，行高因此各不相同
const LINE_COUNT_PATTERN = [3, 1, 4, 2, 3, 2, 4, 1]

const tableData = ref<any[]>(
  Array.from({ length: ROW_COUNT }, (_, rowIndex) => {
    const lineCount = LINE_COUNT_PATTERN[rowIndex % LINE_COUNT_PATTERN.length]
    // 偶数行放一条超长文本，固定在第 2 条（只有 1 行时就是第 1 条）
    const longIndex = rowIndex % 2 === 0 ? Math.min(1, lineCount - 1) : -1
    const row: Record<string, any> = {
      id: 1000 + rowIndex,
      name: `行 ${rowIndex + 1}`,
      lines: Array.from({ length: lineCount }, (_, lineIndex) =>
        `第 ${rowIndex + 1} 行 · 第${lineIndex + 1}条${lineIndex === longIndex ? '（超长）：' + longLine : '：' + shortLine}`
      )
    }
    dynColumns.forEach((col, colIndex) => {
      row[col.field] = `值 ${rowIndex + 1}-${colIndex + 1}`
    })
    return row
  })
)

const escapeHtml = (text: string) => {
  const map: Record<string, string> = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }
  return text.replace(/[&<>"']/g, s => map[s])
}

/**
 * 取多行单元格里的所有行，用于判断是否有任意一行被省略号截断。
 * 溢出来源是自定义 <p> 自身的 nowrap + ellipsis，与表格的 show-overflow 无关。
 */
const getCellLines = (cell: HTMLElement) => Array.from(cell.querySelectorAll<HTMLElement>('.multi-cell p'))

const scrollbarConfig = { overscrollBehavior: 'contain' as const }

// showAll 保证 hover 进入 tooltip 触发流程，contentMethod 自行决定是否显示
const tooltipConfig = {
  showAll: true,
  enterable: true,
  useHtml: true,
  defaultPlacement: 'top' as const,
  contentMethod (params: any) {
    callCount.value++
    const { cell, column, row } = params
    if (column.field !== 'lines') {
      lastCheck.text = `${column.field || column.type}：非多行列，不弹`
      lastCheck.ok = false
      return false
    }
    const lineEls = getCellLines(cell)
    const overLines = lineEls.filter(el => el.scrollWidth > el.clientWidth + 1)
    if (!overLines.length) {
      lastCheck.text = `行 ${row.id - 999}：${lineEls.length} 行均未溢出，不弹`
      lastCheck.ok = false
      return false
    }
    lastCheck.text = `行 ${row.id - 999}：${overLines.length} 行溢出，显示气泡`
    lastCheck.ok = true
    return row.lines.map((line: string) => `<div style="line-height:22px">${escapeHtml(line)}</div>`).join('')
  }
}
</script>

<style scoped>
.virtual-scroll-demo {
  padding: 4px;
  /* 三档最小行高会被 .vxe-table-vars 测量进 rowHeightStore */
  --vxe-ui-table-row-height-small: 20px;
  --vxe-ui-table-row-height-medium: 30px;
  --vxe-ui-table-row-height-large: 40px;
  --vxe-ui-table-row-height-default: 30px;
}

.virtual-scroll-demo .vxe-table.size--small {
  --vxe-ui-table-current-row-line-height: 16px;
  --vxe-ui-table-current-font-size: 12px;
  --vxe-ui-table-current-cell-padding: 8px;
}

.virtual-scroll-demo .vxe-table.size--medium {
  --vxe-ui-table-current-row-line-height: 18px;
  --vxe-ui-table-current-font-size: 13px;
  --vxe-ui-table-current-cell-padding: 4px;
}

.virtual-scroll-demo .vxe-table.size--large {
  --vxe-ui-table-current-row-line-height: 22px;
  --vxe-ui-table-current-font-size: 14px;
  --vxe-ui-table-current-cell-padding: 7px;
}

.demo-bar {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 10px;
  color: #666;
}

.demo-bar .is-ok {
  color: #18913a;
}

.demo-bar .is-no {
  color: #999;
}

.demo-desc {
  margin-bottom: 12px;
  color: #666;
  line-height: 1.8;
}

.demo-desc code {
  padding: 1px 4px;
  border-radius: 3px;
  background: #f2f3f5;
  color: #c7254e;
}

.table-title {
  margin: 18px 0 8px;
  font-size: 14px;
}

.table-subtitle {
  margin-left: 10px;
  font-weight: normal;
  color: #999;
}

/* 单元格保持自动高度，行截断交给每一行自己处理；行高跟随尺寸档位 */
.multi-cell p {
  margin: 0;
  line-height: var(--vxe-ui-table-current-row-line-height, 22px);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
