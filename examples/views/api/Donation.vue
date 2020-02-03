<template>
  <div>
    <p class="tip">{{ $t('app.footer.donationDesc') }}</p>
    <div class="desc">
      <div class="title">🐬 计划</div>
      <ul class="plan">
        <li><i class="fa fa-battery-4"></i>v1 实现表格的一切实用的功能</li>
        <li><i class="fa fa-battery-3"></i>v2 性能优化，同时兼具功能与性能</li>
        <li><i class="fa fa-battery-0"></i>v3 内部重构，面向现代浏览器吗，不再支持 IE，渲染性能提升</li>
        <li><i class="fa fa-battery-0"></i>v4 基于 <a class="link" href="https://github.com/vuejs/vue-next" target="_blank">vue3</a> 重构，渲染性能提升</li>
      </ul>
    </div>
    <div class="content">
      <img src="static/donation/pay.jpg">
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
