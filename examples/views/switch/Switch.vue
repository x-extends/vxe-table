<template>
  <div>
    <h2>{{ $t('app.aside.nav.switch') }}</h2>
    <p class="tip">开关按钮</p>

    <p>
      <vxe-switch v-model="demo1.value1"></vxe-switch>
      <vxe-switch v-model="demo1.value2" size="medium"></vxe-switch>
      <vxe-switch v-model="demo1.value3" size="small"></vxe-switch>
      <vxe-switch v-model="demo1.value4" size="mini"></vxe-switch>
    </p>

    <p>
      <vxe-switch v-model="demo1.value5" open-label="是" close-label="否"></vxe-switch>
      <vxe-switch v-model="demo1.value6" size="medium" open-label="是" close-label="否"></vxe-switch>
      <vxe-switch v-model="demo1.value7" size="small" open-label="开" close-label="关"></vxe-switch>
      <vxe-switch v-model="demo1.value8" size="mini" open-label="开" close-label="关"></vxe-switch>
    </p>

    <p>
      <vxe-switch v-model="demo1.value9" open-label="开" on-value="Y" close-label="关" close-value="N"></vxe-switch>
      <vxe-switch v-model="demo1.value10" open-label="打开" :on-value="1" close-label="关闭" :close-value="0"></vxe-switch>
      <vxe-switch v-model="demo1.value11" disabled></vxe-switch>
      <vxe-switch v-model="demo1.value12" open-label="是" close-label="否" disabled></vxe-switch>
    </p>

    <p>
      <vxe-switch v-model="demo1.value13" open-icon="fa fa-check" close-icon="fa fa-close"></vxe-switch>
      <vxe-switch v-model="demo1.value14" open-label="app.body.label.on" close-label="app.body.label.off" open-icon="fa fa-bell" close-icon="fa fa-bell-slash"></vxe-switch>
      <vxe-switch v-model="demo1.value15" open-label="app.body.label.on" close-label="app.body.label.off" class="my-switch1"></vxe-switch>
      <vxe-switch v-model="demo1.value16" open-label="app.body.label.on" close-label="app.body.label.off" class="my-switch2"></vxe-switch>
      <vxe-switch v-model="demo1.value17" open-label="ON" close-label="OFF" class="my-switch3"></vxe-switch>
    </p>

    <pre>
      <pre-code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Spacebar | 按下点击 |
        | Enter | 点击 |
      </pre-code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="html">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'

export default defineComponent({
  setup  () {
    const demo1 = reactive({
      value1: null,
      value2: null,
      value3: null,
      value4: null,
      value5: true,
      value6: null,
      value7: null,
      value8: null,
      value9: 'Y',
      value10: 1,
      value11: false,
      value12: true,
      value13: false,
      value14: false,
      value15: true,
      value16: false,
      value17: false
    })
    return {
      demo1,
      demoCodes: [
        `
        <p>
          <vxe-switch v-model="demo1.value1"></vxe-switch>
          <vxe-switch v-model="demo1.value2" size="medium"></vxe-switch>
          <vxe-switch v-model="demo1.value3" size="small"></vxe-switch>
          <vxe-switch v-model="demo1.value4" size="mini"></vxe-switch>
        </p>

        <p>
          <vxe-switch v-model="demo1.value5" open-label="是" close-label="否"></vxe-switch>
          <vxe-switch v-model="demo1.value6" size="medium" open-label="是" close-label="否"></vxe-switch>
          <vxe-switch v-model="demo1.value7" size="small" open-label="开" close-label="关"></vxe-switch>
          <vxe-switch v-model="demo1.value8" size="mini" open-label="开" close-label="关"></vxe-switch>
        </p>

        <p>
          <vxe-switch v-model="demo1.value9" open-label="开" on-value="Y" close-label="关" close-value="N"></vxe-switch>
          <vxe-switch v-model="demo1.value10" open-label="打开" :on-value="1" close-label="关闭" :close-value="0"></vxe-switch>
          <vxe-switch v-model="demo1.value11" disabled></vxe-switch>
          <vxe-switch v-model="demo1.value12" open-label="是" close-label="否" disabled></vxe-switch>
        </p>

        <p>
          <vxe-switch v-model="demo1.value13" open-icon="fa fa-check" close-icon="fa fa-close"></vxe-switch>
          <vxe-switch v-model="demo1.value14" open-label="app.body.label.on" close-label="app.body.label.off" open-icon="fa fa-bell" close-icon="fa fa-bell-slash"></vxe-switch>
          <vxe-switch v-model="demo1.value15" open-label="app.body.label.on" close-label="app.body.label.off" class="my-switch1"></vxe-switch>
          <vxe-switch v-model="demo1.value16" open-label="app.body.label.on" close-label="app.body.label.off" class="my-switch2"></vxe-switch>
          <vxe-switch v-model="demo1.value17" open-label="ON" close-label="OFF" class="my-switch3"></vxe-switch>
        </p>
        `,
        `
        import { defineComponent, reactive } from 'vue'

        export default defineComponent({
          setup  () {
            const demo1 = reactive({
              value1: null,
              value2: null,
              value3: null,
              value4: null,
              value5: true,
              value6: null,
              value7: null,
              value8: null,
              value9: 'Y',
              value10: 1,
              value11: false,
              value12: true,
              value13: false,
              value14: false,
              value15: true,
              value16: false,
              value17: false
            })
            return {
              demo1
            }
          }
        })
        `,
        `
        .my-switch1.vxe-switch .vxe-switch--button {
          background-color: #13ce66;
        }
        .my-switch2.vxe-switch.is--on .vxe-switch--button {
          background-color: #13ce66;
        }
        .my-switch2.vxe-switch.is--off .vxe-switch--button {
          background-color: #ff4949;
        }
        .my-switch3.vxe-switch .vxe-switch--button {
          background-color: #7b7b48;
        }
        .my-switch3.vxe-switch .vxe-switch--icon {
          background-color: rgba(0,0,0,.5);
        }
        .my-switch3.vxe-switch .vxe-switch--label {
          color: #c0c4cc;
        }
        `
      ]
    }
  }
})
</script>

<style>
.my-switch1.vxe-switch .vxe-switch--button {
  background-color: #13ce66;
}
.my-switch2.vxe-switch.is--on .vxe-switch--button {
  background-color: #13ce66;
}
.my-switch2.vxe-switch.is--off .vxe-switch--button {
  background-color: #ff4949;
}
.my-switch3.vxe-switch .vxe-switch--button {
  background-color: #7b7b48;
}
.my-switch3.vxe-switch .vxe-switch--icon {
  background-color: rgba(0,0,0,.5);
}
.my-switch3.vxe-switch .vxe-switch--label {
  color: #c0c4cc;
}
</style>
