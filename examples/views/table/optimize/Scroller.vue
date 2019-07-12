<template>
  <div>
    <p class="red">问题现象：当表格数据量较大时，由于数据量越大表格的渲染就会越慢</p>
    <p>Vue 响应机制：由于 vue 会对数据源进行 set / get 双向绑定，所以对于数据量海量的情况下耗时会很久</p>
    <p class="red">问题所在：数据量过大、页面渲染 Element 节点太多导致页面卡顿</p>
    <p>优化方案1：如果数据量超大 500+ 条，通过<router-link class="link" :to="{name: 'TableScroll'}">虚拟滚动方式</router-link>按需加载，比如将数组拆分成可视区 100 条；由于只渲染了可视区，所以渲染会很快</p>
    <p>优化方案2：不要使用数据源的双向绑定，使用函数式的 loadData / reloadData 进行数据加载，可以跳过 vue 的双向绑定，这对于大数据量提升很大</p>
  </div>
</template>

<style lang="scss" scoped>
p {
  font-size: 16px;
}
</style>
