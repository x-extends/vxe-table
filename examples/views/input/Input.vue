<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'input'}}">API</router-link>，支持：text 文本、number 数值、integer 整数、date 日期、week 周、month 月份、year 年份、password 密码</p>

    <p>
      <vxe-input v-model="value1" placeholder="默认尺寸"></vxe-input>
      <vxe-input v-model="value2" placeholder="中等尺寸" size="medium"></vxe-input>
      <vxe-input v-model="value3" placeholder="小型尺寸" size="small"></vxe-input>
      <vxe-input v-model="value4" placeholder="超小尺寸" size="mini"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value5" placeholder="可清除" clearable></vxe-input>
      <vxe-input v-model="value6" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
      <vxe-input v-model="value7" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
      <vxe-input v-model="value8" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value9" placeholder="密码类型" type="password"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value10" placeholder="日期类型" type="date"></vxe-input>
      <vxe-input v-model="value11" placeholder="周" type="week" clearable></vxe-input>
      <vxe-input v-model="value12" placeholder="月" type="month" :date-config="{valueFormat: 'yyyy-MM-dd'}"></vxe-input>
      <vxe-input v-model="value13" placeholder="年" type="year" clearable></vxe-input>
      <vxe-input v-model="value14" placeholder="禁用日期" type="date" :date-config="{disabledMethod: disabledDateMethod}"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value15" placeholder="数值类型" type="number"></vxe-input>
      <vxe-input v-model="value16" placeholder="数值间隔" type="number" step="1.4" clearable></vxe-input>
      <vxe-input v-model="value17" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
      <vxe-input v-model="value18" placeholder="整数类型" type="integer"></vxe-input>
      <vxe-input v-model="value19" placeholder="数值间隔" type="integer" step="5" clearable></vxe-input>
      <vxe-input v-model="value20" placeholder="数值范围限制 0-100" type="integer" min="0" max="100" step="5" clearable></vxe-input>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Enter | 用于某些特定的功能：展开下拉面板、选中选项...等 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      value1: '',
      value2: '',
      value3: '',
      value4: '',
      value5: '',
      value6: '',
      value7: '',
      value8: '',
      value9: '',
      value10: '2018-01-09',
      value11: '',
      value12: '',
      value13: '',
      value14: '',
      value15: '',
      value16: '',
      value17: '',
      value18: '',
      value19: '',
      value20: '',
      demoCodes: [
        `
        <p>
          <vxe-input v-model="value1" placeholder="默认尺寸"></vxe-input>
          <vxe-input v-model="value2" placeholder="中等尺寸" size="medium"></vxe-input>
          <vxe-input v-model="value3" placeholder="小型尺寸" size="small"></vxe-input>
          <vxe-input v-model="value4" placeholder="超小尺寸" size="mini"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value5" placeholder="可清除" clearable></vxe-input>
          <vxe-input v-model="value6" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
          <vxe-input v-model="value7" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
          <vxe-input v-model="value8" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value9" placeholder="密码类型" type="password"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value10" placeholder="日期类型" type="date"></vxe-input>
          <vxe-input v-model="value11" placeholder="周" type="week" clearable></vxe-input>
          <vxe-input v-model="value12" placeholder="月" type="month" :date-config="{valueFormat: 'yyyy-MM-dd'}"></vxe-input>
          <vxe-input v-model="value13" placeholder="年" type="year" clearable></vxe-input>
          <vxe-input v-model="value14" placeholder="禁用日期" type="date" :date-config="{disabledMethod: disabledDateMethod}"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value15" placeholder="数值类型" type="number"></vxe-input>
          <vxe-input v-model="value16" placeholder="数值间隔" type="number" step="1.4" clearable></vxe-input>
          <vxe-input v-model="value17" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
          <vxe-input v-model="value18" placeholder="整数类型" type="integer"></vxe-input>
          <vxe-input v-model="value19" placeholder="数值间隔" type="integer" step="5" clearable></vxe-input>
          <vxe-input v-model="value20" placeholder="数值范围限制 0-100" type="integer" min="0" max="100" step="5" clearable></vxe-input>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              value2: '',
              value3: '',
              value4: '',
              value5: '',
              value6: '',
              value7: '',
              value8: '',
              value9: '',
              value10: '2018-01-09',
              value11: '',
              value12: '',
              value13: '',
              value14: '',
              value15: '',
              value16: '',
              value17: '',
              value18: '',
              value19: '',
              value20: ''
            }
          },
          methods: {
            disabledDateMethod ({ date }) {
              const dd = date.getDate()
              return dd > 15
            }
          }
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    disabledDateMethod ({ date }) {
      const dd = date.getDate()
      return dd > 15
    }
  }
}
</script>
