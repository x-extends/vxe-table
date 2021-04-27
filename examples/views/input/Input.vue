<template>
  <div>
    <h2>{{ $t('app.aside.nav.input') }}</h2>
    <p class="tip">
      输入框、选择器，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'input'}}">API</router-link><br>
      <span class="red">（注：输入组件只能是字符串类型，其他类型谨慎使用）</span>
    </p>

    <p>
      <vxe-input v-model="demo1.value100" placeholder="默认尺寸"></vxe-input>
      <vxe-input v-model="demo1.value101" placeholder="中等尺寸" size="medium"></vxe-input>
      <vxe-input v-model="demo1.value102" placeholder="小型尺寸" size="small"></vxe-input>
      <vxe-input v-model="demo1.value103" placeholder="超小尺寸" size="mini"></vxe-input>
    </p>

    <p>
      <vxe-input v-model="demo1.value200" placeholder="可清除" clearable></vxe-input>
      <vxe-input v-model="demo1.value201" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
      <vxe-input v-model="demo1.value202" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
      <vxe-input v-model="demo1.value203" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
    </p>

    <p>
      <vxe-input v-model="demo1.value300" placeholder="搜索类型" type="search"></vxe-input>
      <vxe-input v-model="demo1.value301" placeholder="可清除" type="search" clearable></vxe-input>
      <vxe-input v-model="demo1.value302" placeholder="密码类型" type="password"></vxe-input>
      <vxe-input v-model="demo1.value303" placeholder="可清除" type="password" clearable></vxe-input>
    </p>

    <p>
      <vxe-input v-model="demo1.value400" placeholder="日期选择" type="date" parse-format="yyyy-dd-MM"></vxe-input>
      <vxe-input v-model="demo1.value401" placeholder="周选择" type="week" clearable></vxe-input>
      <vxe-input v-model="demo1.value402" placeholder="月选择" type="month" valueFormat="yyyy-MM-dd"></vxe-input>
      <vxe-input v-model="demo1.value403" placeholder="季选择" type="quarter" clearable></vxe-input>
      <vxe-input v-model="demo1.value404" placeholder="年选择" type="year" clearable></vxe-input>
      <vxe-input v-model="demo1.value405" placeholder="时间选择" type="time" clearable></vxe-input>
      <vxe-input v-model="demo1.value406" placeholder="日期和时间选择" type="datetime" transfer></vxe-input>
      <vxe-input v-model="demo1.value407" placeholder="禁用日期" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
      <vxe-input v-model="demo1.value408" placeholder="小圆点" type="date" :festival-method="festivalNoticeMethod" transfer></vxe-input>
      <vxe-input v-model="demo1.value409" placeholder="农历节日" type="date" :festival-method="festivalCalendarMethod" transfer></vxe-input>
    </p>

    <p>
      <vxe-input v-model="demo1.value500" placeholder="数值类型" type="number"></vxe-input>
      <vxe-input v-model="demo1.value501" placeholder="数值间隔 1.4" type="number" step="1.4" clearable></vxe-input>
      <vxe-input v-model="demo1.value502" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
      <vxe-input v-model="demo1.value503" placeholder="小数类型" type="float"></vxe-input>
      <vxe-input v-model="demo1.value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
      <vxe-input v-model="demo1.value505" placeholder="小数范围限制 0-50" type="float" min="0" max="50" clearable></vxe-input>
      <vxe-input v-model="demo1.value506" placeholder="整数类型" type="integer"></vxe-input>
      <vxe-input v-model="demo1.value507" placeholder="整数间隔 5" type="integer" step="5" clearable></vxe-input>
      <vxe-input v-model="demo1.value508" placeholder="整数范围限制 0-100" type="integer" min="0" max="100" clearable></vxe-input>
    </p>

    <p>
      <vxe-input v-model="demo1.value600" placeholder="自定义前缀图标">
        <template #prefix>
          <i class="fa fa-search my-red"></i>
        </template>
      </vxe-input>
      <vxe-input v-model="demo1.value601" placeholder="自定义后缀图标">
        <template #suffix>
          <i class="fa fa-search my-green"></i>
        </template>
      </vxe-input>
      <vxe-input v-model="demo1.value602" class="my-domain" placeholder="自定义前缀模板">
        <template #prefix>
          <span>Http://</span>
        </template>
      </vxe-input>
      <vxe-input v-model="demo1.value603" class="my-search" placeholder="自定义后缀模板">
        <template #suffix>
          <i class="fa fa-search"></i>
        </template>
      </vxe-input>
    </p>

    <pre>
      <pre-code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Arrow Up ↑ | 展开下拉面板、如果已展开则向上移动（用于日期类型...等） |
        | Arrow Down ↓ | 展开下拉面板、如果已展开则向下移动（用于日期类型...等） |
        | Arrow Left ← | 如果已展开则向左移动（用于日期类型...等） |
        | Arrow Right → | 如果已展开则向右移动（用于日期类型...等） |
        | Enter | 展开下拉面板、确定选中日期...等（用于日期类型...等） |
        | Page Up | 向前翻页（用于日期类型...等） |
        | Page Down | 向后翻页（用于日期类型...等） |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="typescript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[2] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { VxeInputPropTypes, VxeInputDefines } from '../../../types/index'
import XEUtils from 'xe-utils'

export default defineComponent({
  setup  () {
    const demo1 = reactive({
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
      value400: '',
      value401: '',
      value402: '',
      value403: '',
      value404: '',
      value405: '',
      value406: '',
      value407: '',
      value408: '2020-10-01',
      value409: '2020-10-01',
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
    })

    const disabledDateMethod: VxeInputPropTypes.DisabledMethod = (params) => {
      const { date } = params
      const dd = date.getDate()
      return dd > 15
    }

    // 渲染日期小圆点
    const noticeMaps: { [key: string]: VxeInputDefines.DateFestivalInfo } = {
      20200910: {
        notice: true, // 显示小圆点事件通知
        important: true, // 是否标记为重要节日
        label: '活动'
      },
      20201015: {
        notice: true,
        important: true,
        label: '聚餐'
      },
      20201108: {
        notice: true,
        label: '爬山'
      },
      20201222: {
        notice: true,
        label: '游泳'
      }
    }
    const festivalNoticeMethod: VxeInputPropTypes.FestivalMethod = (params) => {
      const { date, viewType } = params
      if (viewType === 'day') {
        const ymd = XEUtils.toDateString(date, 'yyyyMMdd')
        return noticeMaps[ymd] || { label: '无' }
      }
    }

    // 显示日期农历节假日
    const calendarMaps: { [key: string]: VxeInputDefines.DateFestivalInfo } = {
      20200930: {
        label: '十四' // 显示节日名称
      },
      20201001: {
        label: '国庆节,中秋节', // 如果同一天拥有多个节日重叠，用逗号分开
        important: true, // 是否标记为重要节日
        extra: '休' // 右上角额外显示的名称
      },
      20201002: {
        label: '十六',
        extra: '休'
      },
      20201003: {
        label: '十七',
        extra: '休'
      },
      20201004: {
        label: '十八',
        extra: '休'
      },
      20201005: {
        label: '十九',
        extra: '休'
      },
      20201006: {
        label: '二十',
        extra: '休'
      },
      20201007: {
        label: '廿一',
        extra: '休'
      },
      20201008: {
        label: '寒霜',
        important: true,
        extra: '休'
      },
      20201009: {
        label: '廿三'
      },
      20201010: {
        label: '廿四',
        extra: {
          label: '班',
          important: true // 是否标记为重要节日
        }
      }
    }
    const festivalCalendarMethod: VxeInputPropTypes.FestivalMethod = (params) => {
      const { date, viewType } = params
      if (viewType === 'day') {
        const ymd = XEUtils.toDateString(date, 'yyyyMMdd')
        return calendarMaps[ymd] || { label: '无' }
      }
    }

    return {
      demo1,
      disabledDateMethod,
      festivalNoticeMethod,
      festivalCalendarMethod,
      demoCodes: [
        `
        <p>
          <vxe-input v-model="demo1.value100" placeholder="默认尺寸"></vxe-input>
          <vxe-input v-model="demo1.value101" placeholder="中等尺寸" size="medium"></vxe-input>
          <vxe-input v-model="demo1.value102" placeholder="小型尺寸" size="small"></vxe-input>
          <vxe-input v-model="demo1.value103" placeholder="超小尺寸" size="mini"></vxe-input>
        </p>

        <p>
          <vxe-input v-model="demo1.value200" placeholder="可清除" clearable></vxe-input>
          <vxe-input v-model="demo1.value201" placeholder="带图标" prefix-icon="fa fa-user" suffix-icon="fa fa-search" clearable></vxe-input>
          <vxe-input v-model="demo1.value202" placeholder="只读的" suffix-icon="fa fa-search" readonly></vxe-input>
          <vxe-input v-model="demo1.value203" placeholder="禁用的" prefix-icon="fa fa-user-o" disabled></vxe-input>
        </p>

        <p>
          <vxe-input v-model="demo1.value300" placeholder="搜索类型" type="search"></vxe-input>
          <vxe-input v-model="demo1.value301" placeholder="可清除" type="search" clearable></vxe-input>
          <vxe-input v-model="demo1.value302" placeholder="密码类型" type="password"></vxe-input>
          <vxe-input v-model="demo1.value303" placeholder="可清除" type="password" clearable></vxe-input>
        </p>

        <p>
          <vxe-input v-model="demo1.value400" placeholder="日期选择" type="date" parse-format="yyyy-dd-MM"></vxe-input>
          <vxe-input v-model="demo1.value401" placeholder="周选择" type="week" clearable></vxe-input>
          <vxe-input v-model="demo1.value402" placeholder="月选择" type="month" valueFormat="yyyy-MM-dd"></vxe-input>
          <vxe-input v-model="demo1.value403" placeholder="季选择" type="quarter" clearable></vxe-input>
          <vxe-input v-model="demo1.value404" placeholder="年选择" type="year" clearable></vxe-input>
          <vxe-input v-model="demo1.value405" placeholder="时间选择" type="time" clearable></vxe-input>
          <vxe-input v-model="demo1.value406" placeholder="日期和时间选择" type="datetime" transfer></vxe-input>
          <vxe-input v-model="demo1.value407" placeholder="禁用日期" type="date" :disabled-method="disabledDateMethod" transfer></vxe-input>
          <vxe-input v-model="demo1.value408" placeholder="小圆点" type="date" :festival-method="festivalNoticeMethod" transfer></vxe-input>
          <vxe-input v-model="demo1.value409" placeholder="农历节日" type="date" :festival-method="festivalCalendarMethod" transfer></vxe-input>
        </p>

        <p>
          <vxe-input v-model="demo1.value500" placeholder="数值类型" type="number"></vxe-input>
          <vxe-input v-model="demo1.value501" placeholder="数值间隔 1.4" type="number" step="1.4" clearable></vxe-input>
          <vxe-input v-model="demo1.value502" placeholder="数值范围限制 0-10" type="number" min="0" max="10" clearable></vxe-input>
          <vxe-input v-model="demo1.value503" placeholder="小数类型" type="float"></vxe-input>
          <vxe-input v-model="demo1.value504" placeholder="小数间隔 2.3" type="float" step="2.3" clearable></vxe-input>
          <vxe-input v-model="demo1.value505" placeholder="小数范围限制 0-50" type="float" min="0" max="50" clearable></vxe-input>
          <vxe-input v-model="demo1.value506" placeholder="整数类型" type="integer"></vxe-input>
          <vxe-input v-model="demo1.value507" placeholder="整数间隔 5" type="integer" step="5" clearable></vxe-input>
          <vxe-input v-model="demo1.value508" placeholder="整数范围限制 0-100" type="integer" min="0" max="100" clearable></vxe-input>
        </p>

        <p>
          <vxe-input v-model="demo1.value600" placeholder="自定义前缀图标">
            <template #prefix>
              <i class="fa fa-search my-red"></i>
            </template>
          </vxe-input>
          <vxe-input v-model="demo1.value601" placeholder="自定义后缀图标">
            <template #suffix>
              <i class="fa fa-search my-green"></i>
            </template>
          </vxe-input>
          <vxe-input v-model="demo1.value602" class="my-domain" placeholder="自定义前缀模板">
            <template #prefix>
              <span>Http://</span>
            </template>
          </vxe-input>
          <vxe-input v-model="demo1.value603" class="my-search" placeholder="自定义后缀模板">
            <template #suffix>
              <i class="fa fa-search"></i>
            </template>
          </vxe-input>
        </p>
        `,
        `
        import { defineComponent, reactive } from 'vue'
        import { VxeInputPropTypes, VxeInputDefines } from 'vxe-table'
        import XEUtils from 'xe-utils'

        export default defineComponent({
          setup  () {
            const demo1 = reactive({
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
              value400: '',
              value401: '',
              value402: '',
              value403: '',
              value404: '',
              value405: '',
              value406: '',
              value407: '',
              value408: '2020-10-01',
              value409: '2020-10-01',
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
            })

            const disabledDateMethod: VxeInputPropTypes.DisabledMethod = (params) => {
              const { date } = params
              const dd = date.getDate()
              return dd > 15
            }

            // 渲染日期小圆点
            const noticeMaps: { [key: string]: VxeInputDefines.DateFestivalInfo } = {
              20200910: {
                notice: true, // 显示小圆点事件通知
                important: true, // 是否标记为重要节日
                label: '活动'
              },
              20201015: {
                notice: true,
                important: true,
                label: '聚餐'
              },
              20201108: {
                notice: true,
                label: '爬山'
              },
              20201222: {
                notice: true,
                label: '游泳'
              }
            }
            const festivalNoticeMethod: VxeInputPropTypes.FestivalMethod = (params) => {
              const { date, viewType } = params
              if (viewType === 'day') {
                const ymd = XEUtils.toDateString(date, 'yyyyMMdd')
                return noticeMaps[ymd] || { label: '无' }
              }
            }

            // 显示日期农历节假日
            const calendarMaps: { [key: string]: VxeInputDefines.DateFestivalInfo } = {
              20200930: {
                label: '十四' // 显示节日名称
              },
              20201001: {
                label: '国庆节,中秋节', // 如果同一天拥有多个节日重叠，用逗号分开
                important: true, // 是否标记为重要节日
                extra: '休' // 右上角额外显示的名称
              },
              20201002: {
                label: '十六',
                extra: '休'
              },
              20201003: {
                label: '十七',
                extra: '休'
              },
              20201004: {
                label: '十八',
                extra: '休'
              },
              20201005: {
                label: '十九',
                extra: '休'
              },
              20201006: {
                label: '二十',
                extra: '休'
              },
              20201007: {
                label: '廿一',
                extra: '休'
              },
              20201008: {
                label: '寒霜',
                important: true,
                extra: '休'
              },
              20201009: {
                label: '廿三'
              },
              20201010: {
                label: '廿四',
                extra: {
                  label: '班',
                  important: true // 是否标记为重要节日
                }
              }
            }
            const festivalCalendarMethod: VxeInputPropTypes.FestivalMethod = (params) => {
              const { date, viewType } = params
              if (viewType === 'day') {
                const ymd = XEUtils.toDateString(date, 'yyyyMMdd')
                return calendarMaps[ymd] || { label: '无' }
              }
            }

            return {
              demo1,
              disabledDateMethod,
              festivalNoticeMethod,
              festivalCalendarMethod
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
        .my-domain.vxe-input .vxe-input--prefix {
          width: 60px;
          height: 32px;
          top: 1px;
          text-align: center;
          border-right: 1px solid #dcdfe6;
          background-color: #f5f7fa;
        }
        .my-domain.vxe-input .vxe-input--inner {
          padding-left: 72px;
          border: 1px solid #dcdfe6;
        }
        .my-search.vxe-input {
          height: 34px;
          width: 300px;
        }
        .my-search.vxe-input .vxe-input--suffix {
          width: 60px;
          height: 32px;
          top: 1px;
          text-align: center;
          border-left: 1px solid #dcdfe6;
          background-color: #f5f7fa;
          cursor: pointer;
        }
        .my-search.vxe-input .vxe-input--inner {
          padding-right: 72px;
          border: 1px solid #dcdfe6;
        }
        `
      ]
    }
  }
})
</script>

<style lang="scss" scoped>
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
.my-domain.vxe-input:deep() .vxe-input--prefix {
  width: 60px;
  height: 32px;
  top: 1px;
  text-align: center;
  border-right: 1px solid #dcdfe6;
  background-color: #f5f7fa;
}
.my-domain.vxe-input:deep() .vxe-input--inner {
  padding-left: 72px;
  border: 1px solid #dcdfe6;
}
.my-search.vxe-input {
  height: 34px;
  width: 300px;
}
.my-search.vxe-input:deep() .vxe-input--suffix {
  width: 60px;
  height: 32px;
  top: 1px;
  text-align: center;
  border-left: 1px solid #dcdfe6;
  background-color: #f5f7fa;
  cursor: pointer;
}
.my-search.vxe-input:deep() .vxe-input--inner {
  padding-right: 72px;
  border: 1px solid #dcdfe6;
}
</style>
