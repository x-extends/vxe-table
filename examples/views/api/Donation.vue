<template>
  <div>
    <p class="tip">{{ $t('app.footer.donationDesc') }}</p>
    <div class="upgrade">
      <a class="link" href="https://github.com/xuliangzhan/vxe-table/issues/712">
        <span>{{ $t('app.body.other.compatibility') }}</span>
      </a>
      <a class="link" href="https://github.com/xuliangzhan/vxe-table/releases">
        <span>{{ $t('app.body.other.releases') }}</span>
      </a>
    </div>
    <div class="desc">
      <div class="title">🐬 计划</div>
      <ul class="plan">
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v1') }}</li>
        <li><i class="fa fa-battery-4"></i>{{ $t('app.body.other.plan.v2') }}</li>
        <li><i class="fa fa-battery-2"></i>{{ $t('app.body.other.plan.v3') }}</li>
        <li><i class="fa fa-battery-0"></i>{{ $t('app.body.other.plan.v4') }}</li>
      </ul>
    </div>
    <div class="content">
      <p>💰{{ $t('app.body.label.through') }} <a href="https://gitee.com/xuliangzhan_admin/vxe-table#donation" target="_blank">Gitee {{ $t('app.body.other.donation') }}</a>{{ $t('app.body.other.donationTitle') }}</p>
      <div>
        <img src="static/donation/pay.jpg">
      </div>
      <div>
        <p style="padding-top: 40px">QQ群<br>{{ $t('app.body.other.issuesTitle') }}<a href="https://github.com/xuliangzhan/vxe-table/issues/438" target="_blank">New issues</a></p>
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
