<template>
  <div>
    <vxe-switch v-model="showHeader"></vxe-switch>
    <vxe-switch v-model="showFooter"></vxe-switch>
    <vxe-switch v-model="round"></vxe-switch>

    <vxe-radio-group v-model="borderColor">
      <vxe-radio-button label="" content="默认"></vxe-radio-button>
      <vxe-radio-button label="#ff0000" content="红色"></vxe-radio-button>
      <vxe-radio-button label="#0000ff" content="蓝色"></vxe-radio-button>
    </vxe-radio-group>
    <vxe-radio-group v-model="borderRadius">
      <vxe-radio-button label="" content="4px"></vxe-radio-button>
      <vxe-radio-button label="8px" content="8px"></vxe-radio-button>
      <vxe-radio-button label="16px" content="16px"></vxe-radio-button>
      <vxe-radio-button label="32px" content="32px"></vxe-radio-button>
    </vxe-radio-group>

    <vxe-grid
      v-bind="gridOptions1"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>1</div>
    <vxe-grid
      v-bind="gridOptions2"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>2</div>
    <vxe-grid
      v-bind="gridOptions3"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>3</div>
    <vxe-grid
      v-bind="gridOptions4"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>4</div>
    <vxe-grid
      v-bind="gridOptions5"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>5</div>
    <vxe-grid
      v-bind="gridOptions6"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>6</div>
    <vxe-grid
      v-bind="gridOptions7"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>7</div>
    <vxe-grid
      v-bind="gridOptions8"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>8</div>
    <vxe-grid
      v-bind="gridOptions9"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>9</div>
    <vxe-grid
      v-bind="gridOptions10"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>10</div>
    <vxe-grid
      v-bind="gridOptions11"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>11</div>
    <vxe-grid
      v-bind="gridOptions12"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>12</div>
    <vxe-grid
      v-bind="gridOptions13"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>13</div>
    <vxe-grid
      v-bind="gridOptions14"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>14</div>
    <vxe-grid
      v-bind="gridOptions15"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>15</div>
    <vxe-grid
      v-bind="gridOptions16"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
<div>16</div>
    <vxe-grid
      v-bind="gridOptions17"
      :show-header="showHeader"
      :show-footer="showFooter"
      :round="round"
      :style="{
        '--vxe-ui-table-border-color': borderColor,
        '--vxe-ui-table-border-radius': borderRadius
      }">
    </vxe-grid>
  </div>
</template>

<script setup>
import { ref, reactive, h } from 'vue'
const borderColor = ref('red')
const borderRadius = ref('16px')

const showHeader = ref(true)
const showFooter = ref(true)
const round = ref(true)

const gridOptions1 = reactive({
  border: true,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions2 = reactive({
  border: true,
  height: 300,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions3 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions4 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})

const gridOptions5 = reactive({
  border: true,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions6 = reactive({
  border: true,
  height: 300,
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions7 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions8 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions9 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions10 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    y: {
      position: 'left'
    },
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions11 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    },
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions12 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    },
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions13 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    y: {
      position: 'left'
    },
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions14 = reactive({
  border: true,
  scrollbarConfig: {
    y: {
      position: 'left'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions15 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions16 = reactive({
  border: true,
  height: 300,
  scrollbarConfig: {
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name' },
    { field: 'sex', title: 'Sex' },
    { field: 'age', title: 'Age' }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
const gridOptions17 = reactive({
  border: true,
  scrollbarConfig: {
    x: {
      position: 'top'
    }
  },
  columns: [
    { field: 'seq', type: 'seq', width: 70 },
    { field: 'name', title: 'Name', width: 400 },
    { field: 'sex', title: 'Sex', width: 600 },
    { field: 'age', title: 'Age', width: 400 }
  ],
  data: [
    { id: 10001, name: 'Test1', role: 'Develop', sex: 'Man', age: 28, address: 'test abc' },
    { id: 10002, name: 'Test2', role: 'Test', sex: 'Women', age: 22, address: 'Guangzhou' },
    { id: 10003, name: 'Test3', role: 'PM', sex: 'Man', age: 32, address: 'Shanghai' },
    { id: 10004, name: 'Test4', role: 'Designer', sex: 'Women', age: 24, address: 'Shanghai' }
  ],
  footerData: [
    { seq: '合计', name: '777', sex: '333', age: '111' }
  ]
})
</script>
