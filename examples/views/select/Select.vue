<template>
  <div>
    <h2>{{ $t('app.aside.nav.select') }}</h2>
    <p class="tip">查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'select'}}">API</router-link></p>

    <p>
      <vxe-select v-model="value1" placeholder="默认尺寸">
        <vxe-option v-for="num in 15" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value2" placeholder="中等尺寸" size="medium">
        <vxe-option v-for="num in 10" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value3" placeholder="小型尺寸" size="small">
        <vxe-option v-for="num in 10" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value4" placeholder="超小尺寸" size="mini">
        <vxe-option v-for="num in 10" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
    </p>

    <p>
      <vxe-select v-model="value5" placeholder="请选择" prefix-icon="fa fa-user-o">
        <vxe-option v-for="num in 3" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value6" placeholder="可清除" clearable>
        <vxe-option v-for="num in 5" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value7" placeholder="请选择" clearable>
        <vxe-option v-for="num in 10" :key="num" :value="num" :label="`选项${num}`"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value8" placeholder="分组" clearable>
        <vxe-optgroup label="选项2">
          <vxe-option value="2-1" label="选项2-1"></vxe-option>
          <vxe-option value="2-2" label="选项2-2"></vxe-option>
          <vxe-option value="2-3" label="选项2-3"></vxe-option>
        </vxe-optgroup>
        <vxe-optgroup label="选项3">
          <vxe-option value="3-1" label="选项3-1"></vxe-option>
          <vxe-option value="3-2" label="选项3-2"></vxe-option>
        </vxe-optgroup>
      </vxe-select>
    </p>

    <p>
      <vxe-select v-model="value9" placeholder="禁用" disabled>
        <vxe-option value="1" label="选项1"></vxe-option>
        <vxe-option value="2" label="选项2"></vxe-option>
        <vxe-option value="3" label="选项3"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value10" placeholder="禁用选项" clearable>
        <vxe-option value="1" label="选项1"></vxe-option>
        <vxe-option value="2" label="选项2" disabled></vxe-option>
        <vxe-option value="3" label="选项3"></vxe-option>
      </vxe-select>
      <vxe-select v-model="value11" placeholder="禁用分组" clearable>
        <vxe-optgroup label="选项2" disabled>
          <vxe-option value="2-1" label="选项2-1"></vxe-option>
          <vxe-option value="2-2" label="选项2-2"></vxe-option>
          <vxe-option value="2-3" label="选项2-3"></vxe-option>
        </vxe-optgroup>
        <vxe-optgroup label="选项3">
          <vxe-option value="3-1" label="选项3-1" disabled></vxe-option>
          <vxe-option value="3-2" label="选项3-2"></vxe-option>
        </vxe-optgroup>
        <vxe-optgroup label="选项4">
          <vxe-option value="4-1" label="选项4-1"></vxe-option>
          <vxe-option value="4-2" label="选项4-2"></vxe-option>
          <vxe-option value="4-3" label="选项4-3"></vxe-option>
          <vxe-option value="4-4" label="选项4-4"></vxe-option>
        </vxe-optgroup>
        <vxe-optgroup label="选项5">
          <vxe-option value="5-1" label="选项5-1"></vxe-option>
          <vxe-option value="5-2" label="选项5-2"></vxe-option>
          <vxe-option value="5-3" label="选项5-3"></vxe-option>
          <vxe-option value="5-4" label="选项5-4"></vxe-option>
        </vxe-optgroup>
      </vxe-select>
    </p>

    <p>
      <vxe-select v-model="value12" placeholder="配置式" :options="list12"></vxe-select>
      <vxe-select v-model="value13" placeholder="分组配置式" :option-groups="list13"></vxe-select>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Arrow Up ↑ | 如果已展开下拉面板则移动到上一个选项 |
        | Arrow Down ↓ | 如果已展开下拉面板则移动到下一个选项 |
        | Enter | 展开下拉面板、选中选项 |
        | Esc | 关闭下拉面板 |
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
  data () {
    return {
      value1: 12,
      value2: null,
      value3: null,
      value4: null,
      value5: null,
      value6: null,
      value7: 2,
      value8: null,
      value9: null,
      value10: null,
      value11: null,
      value12: null,
      list12: [
        { label: '男', value: '1' },
        { label: '女', value: '0' }
      ],
      value13: null,
      list13: [
        {
          label: '组1',
          options: [
            { label: '1-1', value: '11' },
            { label: '1-2', value: '10' }
          ]
        },
        {
          label: '组2',
          options: [
            { label: '2-1', value: '21' },
            { label: '2-2', value: '22' }
          ]
        }
      ],
      demoCodes: [
        `
        <p>
          <vxe-select v-model="value1" placeholder="默认尺寸">
            <vxe-option v-for="num in 15" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value2" placeholder="中等尺寸" size="medium">
            <vxe-option v-for="num in 10" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value3" placeholder="小型尺寸" size="small">
            <vxe-option v-for="num in 10" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value4" placeholder="超小尺寸" size="mini">
            <vxe-option v-for="num in 10" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
        </p>

        <p>
          <vxe-select v-model="value5" placeholder="请选择" prefix-icon="fa fa-user-o">
            <vxe-option v-for="num in 3" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value6" placeholder="可清除" clearable>
            <vxe-option v-for="num in 5" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value7" placeholder="请选择" clearable>
            <vxe-option v-for="num in 10" :key="num" :value="num" :label="\`选项\${num}\`"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value8" placeholder="分组" clearable>
            <vxe-optgroup label="选项2">
              <vxe-option value="2-1" label="选项2-1"></vxe-option>
              <vxe-option value="2-2" label="选项2-2"></vxe-option>
              <vxe-option value="2-3" label="选项2-3"></vxe-option>
            </vxe-optgroup>
            <vxe-optgroup label="选项3">
              <vxe-option value="3-1" label="选项3-1"></vxe-option>
              <vxe-option value="3-2" label="选项3-2"></vxe-option>
            </vxe-optgroup>
          </vxe-select>
        </p>

        <p>
          <vxe-select v-model="value9" placeholder="禁用" disabled>
            <vxe-option value="1" label="选项1"></vxe-option>
            <vxe-option value="2" label="选项2"></vxe-option>
            <vxe-option value="3" label="选项3"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value10" placeholder="禁用选项" clearable>
            <vxe-option value="1" label="选项1"></vxe-option>
            <vxe-option value="2" label="选项2" disabled></vxe-option>
            <vxe-option value="3" label="选项3"></vxe-option>
          </vxe-select>
          <vxe-select v-model="value11" placeholder="禁用分组" clearable>
            <vxe-optgroup label="选项2" disabled>
              <vxe-option value="2-1" label="选项2-1"></vxe-option>
              <vxe-option value="2-2" label="选项2-2"></vxe-option>
              <vxe-option value="2-3" label="选项2-3"></vxe-option>
            </vxe-optgroup>
            <vxe-optgroup label="选项3">
              <vxe-option value="3-1" label="选项3-1" disabled></vxe-option>
              <vxe-option value="3-2" label="选项3-2"></vxe-option>
            </vxe-optgroup>
            <vxe-optgroup label="选项4">
              <vxe-option value="4-1" label="选项4-1"></vxe-option>
              <vxe-option value="4-2" label="选项4-2"></vxe-option>
              <vxe-option value="4-3" label="选项4-3"></vxe-option>
              <vxe-option value="4-4" label="选项4-4"></vxe-option>
            </vxe-optgroup>
            <vxe-optgroup label="选项5">
              <vxe-option value="5-1" label="选项5-1"></vxe-option>
              <vxe-option value="5-2" label="选项5-2"></vxe-option>
              <vxe-option value="5-3" label="选项5-3"></vxe-option>
              <vxe-option value="5-4" label="选项5-4"></vxe-option>
            </vxe-optgroup>
          </vxe-select>
        </p>

        <p>
          <vxe-select v-model="value12" placeholder="配置式" :options="list12"></vxe-select>
          <vxe-select v-model="value13" placeholder="分组配置式" :option-groups="list13"></vxe-select>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value1: 12,
              value2: null,
              value3: null,
              value4: null,
              value5: null,
              value6: null,
              value7: 2,
              value8: null,
              value9: null,
              value10: null,
              value11: null,
              value12: null,
              list12: [
                { label: '男', value: '1' },
                { label: '女', value: '0' }
              ],
              value13: null,
              list13: [
                {
                  label: '组1',
                  options: [
                    { label: '1-1', value: '11' },
                    { label: '1-2', value: '10' }
                  ]
                },
                {
                  label: '组2',
                  options: [
                    { label: '2-1', value: '21' },
                    { label: '2-2', value: '22' }
                  ]
                }
              ]
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
