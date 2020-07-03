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
    <div class="desc">
      <div class="title">
        <img src="logo.png" width="18">
        <span style="vertical-align: middle;padding-left: 0.4em;">{{ $t('app.body.label.plan') }}</span>
      </div>
      <ul class="plan">
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v1') }}</li>
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v2') }}</li>
        <li><i class="fa fa-battery-2"></i>{{ $t('app.body.other.plan.v3') }}</li>
        <li><i class="fa fa-battery-0"></i>{{ $t('app.body.other.plan.v4') }}</li>
      </ul>
    </div>
    <div class="content" style="padding-top: 50px">
      <div style="display: inline-block;text-align: left;">
        <div>
          <div>😘<span v-html="$t('app.body.other.donationTitle')"></span></div>
          <ul>
            <li>1. <span v-html="$t('app.body.other.ways.alipay')"></span></li>
            <li>2. <span v-html="$t('app.body.other.ways.wechat')"></span></li>
            <li>3. <span v-html="$t('app.body.other.ways.gitee')"></span></li>
          </ul>
        </div>
        <div>
          <img src="static/donation/pay.jpg">
        </div>
      </div>
      <div style="display: inline-block;margin-left: 20em;">
        <div>
          <span style="font-size: 22px;font-weight: 700;">QQ群</span>
          <br>
          <span v-html="$t('app.body.other.issuesTitle')"></span>
        </div>
        <img src="static/donation/qq.png">
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
