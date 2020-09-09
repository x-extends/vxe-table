<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">
      输入框、选择器，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'input'}}">API</router-link><br>
      <span class="red">（注：输入组件只能是字符串类型，其他类型谨慎使用）</span>
    </p>

    <p>
      <vxe-input v-model="value100" placeholder="默认尺寸"></vxe-input>
      <vxe-input v-model="value101" placeholder="中等尺寸" size="medium"></vxe-input>
      <vxe-input v-model="value102" placeholder="小型尺寸" size="small"></vxe-input>
      <vxe-input v-model="value103" placeholder="超小尺寸" size="mini"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value200" placeholder="可清除" clearable></vxe-input>
      <vxe-input v-model="value201" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
      <vxe-input v-model="value202" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
      <vxe-input v-model="value203" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value300" placeholder="搜索类型" type="search"></vxe-input>
      <vxe-input v-model="value301" placeholder="可清除" type="search" clearable></vxe-input>
      <vxe-input v-model="value302" placeholder="密码类型" type="password"></vxe-input>
      <vxe-input v-model="value303" placeholder="可清除" type="password" clearable></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value400" placeholder="日期选择" type="date"></vxe-input>
      <vxe-input v-model="value401" placeholder="周选择" type="week" clearable></vxe-input>
      <vxe-input v-model="value402" placeholder="月选择" type="month" valueFormat="yyyy-MM-dd"></vxe-input>
      <vxe-input v-model="value403" placeholder="年选择" type="year" clearable></vxe-input>
      <vxe-input v-model="value404" placeholder="时间选择" type="time"></vxe-input>
      <vxe-input v-model="value405" placeholder="日期和时间选择" type="datetime" transfer></vxe-input>
      <vxe-input v-model="value406" placeholder="禁用日期" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value500" placeholder="数值类型" type="number"></vxe-input>
      <vxe-input v-model="value501" placeholder="数值间隔 1.4" type="number" step="1.4" clearable></vxe-input>
      <vxe-input v-model="value502" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
      <vxe-input v-model="value503" placeholder="小数类型" type="float"></vxe-input>
      <vxe-input v-model="value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
      <vxe-input v-model="value505" placeholder="小数范围限制 0-50" type="float" min="0" max="50" clearable></vxe-input>
      <vxe-input v-model="value506" placeholder="整数类型" type="integer"></vxe-input>
      <vxe-input v-model="value507" placeholder="整数间隔 5" type="integer" step="5" clearable></vxe-input>
      <vxe-input v-model="value508" placeholder="整数范围限制 0-100" type="integer" min="0" max="100" clearable></vxe-input>
    </p>

    <p>
      <vxe-input v-model="value600" placeholder="自定义前缀图标">
        <template v-slot:prefix>
          <i class="fa fa-search my-red"></i>
        </template>
      </vxe-input>
      <vxe-input v-model="value601" placeholder="自定义后缀图标">
        <template v-slot:suffix>
          <i class="fa fa-search my-green"></i>
        </template>
      </vxe-input>
      <vxe-input v-model="value602" class="my-domain" placeholder="自定义前缀模板">
        <template v-slot:prefix>
          <span>Http://</span>
        </template>
      </vxe-input>
      <vxe-input v-model="value603" class="my-search" placeholder="自定义后缀模板">
        <template v-slot:suffix>
          <i class="fa fa-search"></i>
        </template>
      </vxe-input>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Arrow Up ↑ | 展开下拉面板、如果已展开则向上移动（用于日期类型...等） |
        | Arrow Down ↓ | 展开下拉面板、如果已展开则向下移动（用于日期类型...等） |
        | Arrow Left ← | 如果已展开则向左移动（用于日期类型...等） |
        | Arrow Right → | 如果已展开则向右移动（用于日期类型...等） |
        | Enter | 展开下拉面板、确定选中日期...等（用于日期类型...等） |
        | Page Up | 向前翻页（用于日期类型...等） |
        | Page Down | 向后翻页（用于日期类型...等） |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      value100: '',
      value101: '',
      value102: '',
      value103: '',
      value200: '',
      value201: '',
      value202: '',
      value203: '',
      value300: '',
      value301: '',
      value302: '',
      value303: '',
      value400: '2018-01-09',
      value401: '',
      value402: '',
      value403: '',
      value404: '',
      value405: '',
      value406: '',
      value500: '22',
      value501: '',
      value502: '',
      value503: '33.33',
      value504: '',
      value505: '',
      value506: '44',
      value507: '',
      value508: '',
      value600: '',
      value601: '',
      value602: '',
      value603: '',
      demoCodes: [
        `
        <p>
          <vxe-input v-model="value100" placeholder="默认尺寸"></vxe-input>
          <vxe-input v-model="value101" placeholder="中等尺寸" size="medium"></vxe-input>
          <vxe-input v-model="value102" placeholder="小型尺寸" size="small"></vxe-input>
          <vxe-input v-model="value103" placeholder="超小尺寸" size="mini"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value200" placeholder="可清除" clearable></vxe-input>
          <vxe-input v-model="value201" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
          <vxe-input v-model="value202" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
          <vxe-input v-model="value203" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value300" placeholder="搜索类型" type="search"></vxe-input>
          <vxe-input v-model="value301" placeholder="可清除" type="search" clearable></vxe-input>
          <vxe-input v-model="value302" placeholder="密码类型" type="password"></vxe-input>
          <vxe-input v-model="value303" placeholder="可清除" type="password" clearable></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value400" placeholder="日期选择" type="date"></vxe-input>
          <vxe-input v-model="value401" placeholder="周选择" type="week" clearable></vxe-input>
          <vxe-input v-model="value402" placeholder="月选择" type="month" valueFormat="yyyy-MM-dd"></vxe-input>
          <vxe-input v-model="value403" placeholder="年选择" type="year" clearable></vxe-input>
          <vxe-input v-model="value404" placeholder="时间选择" type="time"></vxe-input>
          <vxe-input v-model="value405" placeholder="日期和时间选择" type="datetime" transfer></vxe-input>
          <vxe-input v-model="value406" placeholder="禁用日期" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value500" placeholder="数值类型" type="number"></vxe-input>
          <vxe-input v-model="value501" placeholder="数值间隔 1.4" type="number" step="1.4" clearable></vxe-input>
          <vxe-input v-model="value502" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
          <vxe-input v-model="value503" placeholder="小数类型" type="float"></vxe-input>
          <vxe-input v-model="value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
          <vxe-input v-model="value505" placeholder="小数范围限制 0-50" type="float" min="0" max="50" clearable></vxe-input>
          <vxe-input v-model="value506" placeholder="整数类型" type="integer"></vxe-input>
          <vxe-input v-model="value507" placeholder="整数间隔 5" type="integer" step="5" clearable></vxe-input>
          <vxe-input v-model="value508" placeholder="整数范围限制 0-100" type="integer" min="0" max="100" clearable></vxe-input>
        </p>

        <p>
          <vxe-input v-model="value600" placeholder="自定义前缀图标">
            <template v-slot:prefix>
              <i class="fa fa-search my-red"></i>
            </template>
          </vxe-input>
          <vxe-input v-model="value601" placeholder="自定义后缀图标">
            <template v-slot:suffix>
              <i class="fa fa-search my-green"></i>
            </template>
          </vxe-input>
          <vxe-input v-model="value602" class="my-domain" placeholder="自定义前缀模板">
            <template v-slot:prefix>
              <span>Http://</span>
            </template>
          </vxe-input>
          <vxe-input v-model="value603" class="my-search" placeholder="自定义后缀模板">
            <template v-slot:suffix>
              <i class="fa fa-search"></i>
            </template>
          </vxe-input>
        </p>
        `,
        `
        export default {
          data () {
            return {
              value100: '',
              value101: '',
              value102: '',
              value103: '',
              value200: '',
              value201: '',
              value202: '',
              value203: '',
              value300: '',
              value301: '',
              value302: '',
              value303: '',
              value400: '2018-01-09',
              value401: '',
              value402: '',
              value403: '',
              value404: '',
              value405: '',
              value406: '',
              value500: '22',
              value501: '',
              value502: '',
              value503: '33.33',
              value504: '',
              value505: '',
              value506: '44',
              value507: '',
              value508: '',
              value600: '',
              value601: '',
              value602: '',
              value603: ''
            }
          },
          methods: {
            disabledDateMethod ({ date }) {
              const dd = date.getDate()
              return dd > 15
            }
          }
        }
        `,
        `
        .my-red {
          color: red;
        }
        .my-green {
          color: green;
        }
        .my-domain.vxe-input {
          height: 34px;
          width: 300px;
        }
        .my-domain.vxe-input >>> .vxe-input--prefix {
          width: 60px;
          height: 32px;
          top: 1px;
          text-align: center;
          border-right: 1px solid #dcdfe6;
          background-color: #f5f7fa;
        }
        .my-domain.vxe-input >>> .vxe-input--inner {
          padding-left: 72px;
          border: 1px solid #dcdfe6;
        }
        .my-search.vxe-input {
          height: 34px;
          width: 300px;
        }
        .my-search.vxe-input >>> .vxe-input--suffix {
          width: 60px;
          height: 32px;
          top: 1px;
          text-align: center;
          border-left: 1px solid #dcdfe6;
          background-color: #f5f7fa;
          cursor: pointer;
        }
        .my-search.vxe-input >>> .vxe-input--inner {
          padding-right: 72px;
          border: 1px solid #dcdfe6;
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

<style scoped>
.my-red {
  color: red;
}
.my-green {
  color: green;
}
.my-domain.vxe-input {
  height: 34px;
  width: 300px;
}
.my-domain.vxe-input >>> .vxe-input--prefix {
  width: 60px;
  height: 32px;
  top: 1px;
  text-align: center;
  border-right: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}
.my-domain.vxe-input >>> .vxe-input--inner {
  padding-left: 72px;
  border: 1px solid #dcdfe6;
}
.my-search.vxe-input {
  height: 34px;
  width: 300px;
}
.my-search.vxe-input >>> .vxe-input--suffix {
  width: 60px;
  height: 32px;
  top: 1px;
  text-align: center;
  border-left: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  cursor: pointer;
}
.my-search.vxe-input >>> .vxe-input--inner {
  padding-right: 72px;
  border: 1px solid #dcdfe6;
}
</style>
