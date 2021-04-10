<template>
  <div>
    <p class="tip">{{ $t('app.footer.donationDesc') }}</p>
    <div class="upgrade">
      <a class="link" href="https://github.com/x-extends/vxe-table/issues/712">
        <span>😱{{ $t('app.body.other.compatibility') }}</span>
      </a>
      <a class="link" href="https://github.com/x-extends/vxe-table/releases">
        <span>👀{{ $t('app.body.other.releases') }}</span>
      </a>
    </div>
    <!-- <div class="desc">
      <div class="title">
        <span style="vertical-align: middle;padding-left: 0.4em;">🔥{{ $t('app.body.label.plan') }}</span>
      </div>
      <ul class="plan">
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v1') }}</li>
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v2') }}</li>
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v3') }}</li>
        <li><i class="fa fa-battery-3"></i>{{ $t('app.body.other.plan.v4') }}</li>
      </ul>
    </div> -->
    <div class="content" style="padding-top: 50px">
      <div style="float: left;padding-left: 5em;">
        <div style="padding: 15px 0;">
          <div style="font-size: 22px;font-weight: 700;">QQ交流群</div>
          <div style="padding-top: 15px;">该群供大家交流問題，如果群人数已满，将会不定期剔除不活跃的，<br>如果有 bug 建议通过 <a class="link" href="https://github.com/x-extends/vxe-table">issues</a> 反馈</div>
        </div>
        <img src="/vxe-table/static/donation/qq.png">
      </div>
      <div style="float: right;padding-right: 5em;">
        <div style="padding: 15px 0;width: 500px;">
          <vxe-radio-group v-model="supportAuthor">
            <vxe-radio label="1" content="支持作者"></vxe-radio>
            <vxe-radio label="2" content="赞助作者"></vxe-radio>
          </vxe-radio-group>
          <div style="padding-top: 15px;">
            <span v-if="supportAuthor === '1'">如果该项目帮助了您，请作者喝杯咖啡吧</span>
            <a v-else class="link" href="https://xuliangzhan_admin.gitee.io/vxe-table/plugins/#/support" target="_blank">点击赞助作者并加入支官方持群</a>
          </div>
        </div>
        <img v-if="supportAuthor === '1'" src="/vxe-table/static/donation/pay.jpg">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup () {
    const supportAuthor = ref('1')
    return {
      supportAuthor
    }
  }
})
</script>

<style lang="scss" scoped>
.desc {
  padding-left: 40px;
  .title {
    padding: 5px 0;
    font-weight: 700;
  }
  .plan {
    margin: 0;
    padding: 0;
    i {
      color: #409eff;
      margin-right: 5px;
    }
  }
}
.content {
  text-align: center;
}
</style>
