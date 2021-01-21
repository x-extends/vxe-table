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
        <div style="margin-bottom: 15px;">
          <span style="font-size: 22px;font-weight: 700;">QQ交流群</span>
          <br>
          <span v-html="$t('app.body.other.issuesTitle')"></span>
        </div>
        <img src="/vxe-table/static/donation/qq.png">
      </div>
      <div style="float: right;padding-right: 5em;">
        <div style="margin-bottom: 15px;">
          <span style="font-size: 22px;font-weight: 700;">支持作者</span>
          <br>
          <span>如果觉得该项目对您有帮助，请作者喝杯咖啡吧</span>
        </div>
        <img src="/vxe-table/static/donation/pay.jpg">
      </div>
    </div>
  </div>
</template>

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
