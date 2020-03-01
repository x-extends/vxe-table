<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'input'}}">API</router-link></p>

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
      <vxe-input v-model="value11" placeholder="月份" type="month"></vxe-input>
      <vxe-input v-model="value12" placeholder="年份" type="year"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value13" placeholder="数值类型" type="number"></vxe-input>
      <vxe-input v-model="value14" placeholder="步数控制" type="number" step="1.4"></vxe-input>
      <vxe-input v-model="value15" placeholder="整数类型" type="integer"></vxe-input>
      <vxe-input v-model="value16" placeholder="步数控制" type="integer" step="5"></vxe-input>
    </p>

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
          <vxe-input v-model="value10" placeholder="密码类型" type="password"></vxe-input>
          <vxe-input v-model="value9" placeholder="数字类型" type="number"></vxe-input>
          <vxe-input v-model="value11" placeholder="日期类型" type="date"></vxe-input>
          <input v-model="value11" placeholder="日期类型" type="date">
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
              value10: '',
              value11: ''
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
  }
}
</script>
