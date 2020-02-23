<template>
  <div>
    <h2>{{ $t('app.aside.nav.select') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'select'}}">API</router-link></p>

    <p>
      <vxe-select v-model="value1" placeholder="请选择">
        <vxe-option value="0" label="女"></vxe-option>
        <vxe-option value="1" label="男"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value2" placeholder="请选择" clearable>
        <vxe-option value="1" label="选项1"></vxe-option>
        <vxe-option value="2" label="选项2"></vxe-option>
        <vxe-option value="3" label="选项3"></vxe-option>
        <vxe-option value="4" label="选项4"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value3" placeholder="请选择" clearable>
        <vxe-option value="1" label="选项1"></vxe-option>
        <vxe-option value="2" label="选项2"></vxe-option>
        <vxe-option value="3" label="选项3"></vxe-option>
        <vxe-option value="4" label="选项4"></vxe-option>
        <vxe-option value="5" label="选项5"></vxe-option>
        <vxe-option value="6" label="选项6"></vxe-option>
        <vxe-option value="7" label="选项7"></vxe-option>
        <vxe-option value="8" label="选项8"></vxe-option>
        <vxe-option value="9" label="选项9"></vxe-option>
        <vxe-option value="10" label="选项10"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value4" placeholder="请选择" clearable>
        <vxe-option-group label="选项2">
          <vxe-option value="2-1" label="选项2-1"></vxe-option>
          <vxe-option value="2-2" label="选项2-2"></vxe-option>
          <vxe-option value="2-3" label="选项2-3"></vxe-option>
        </vxe-option-group>
        <vxe-option-group label="选项3">
          <vxe-option value="3-1" label="选项3-1"></vxe-option>
          <vxe-option value="3-2" label="选项3-2"></vxe-option>
        </vxe-option-group>
      </vxe-select>
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
  data () {
    return {
      value1: '',
      value2: '2',
      value3: '',
      value4: '',
      demoCodes: [
        `
        <p>
          <vxe-select v-model="value1" placeholder="请选择">
            <vxe-option value="0" label="女"></vxe-option>
            <vxe-option value="1" label="男"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value2" placeholder="请选择" clearable>
            <vxe-option value="1" label="选项1"></vxe-option>
            <vxe-option value="2" label="选项2"></vxe-option>
            <vxe-option value="3" label="选项3"></vxe-option>
            <vxe-option value="4" label="选项4"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value3" placeholder="请选择" clearable>
            <vxe-option value="1" label="选项1"></vxe-option>
            <vxe-option value="2" label="选项2"></vxe-option>
            <vxe-option value="3" label="选项3"></vxe-option>
            <vxe-option value="4" label="选项4"></vxe-option>
            <vxe-option value="5" label="选项5"></vxe-option>
            <vxe-option value="6" label="选项6"></vxe-option>
            <vxe-option value="7" label="选项7"></vxe-option>
            <vxe-option value="8" label="选项8"></vxe-option>
            <vxe-option value="9" label="选项9"></vxe-option>
            <vxe-option value="10" label="选项10"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value4" placeholder="请选择" clearable>
            <vxe-option-group label="选项2">
              <vxe-option value="2-1" label="选项2-1"></vxe-option>
              <vxe-option value="2-2" label="选项2-2"></vxe-option>
              <vxe-option value="2-3" label="选项2-3"></vxe-option>
            </vxe-option-group>
            <vxe-option-group label="选项3">
              <vxe-option value="3-1" label="选项3-1"></vxe-option>
              <vxe-option value="3-2" label="选项3-2"></vxe-option>
            </vxe-option-group>
          </vxe-select>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: '',
              value2: '2',
              value3: ''
              value4: ''
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
