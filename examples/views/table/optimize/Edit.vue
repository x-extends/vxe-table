<template>
  <div>
    <p class="red">问题现象：当表格数据量较大时，单元格输入卡顿（输入框比较严重，输入后明显感觉会卡顿一会）</p>
    <p>Vue 响应机制：双向绑定对于非数组类型的数据是非常友好的；但对于数组就没那么友好了，特别是数据量大的数组，只要列表中有 input 去修改某个值，就会重新执行 render 函数，这时运算量取决于数据的大小，数组越大，执行越久，卡顿时间也就越久。</p>
    <p class="red">问题所在：由 input 输入改变数组中的值导致 Vue 的 render 频繁执行产生短暂卡顿</p>
    <p>优化方案1：如果数据量超大 500+ 条，通过<router-link class="link" :to="{name: 'TableScroll'}">虚拟滚动方式</router-link>按需加载，比如将数组拆分成可视区 100 条；由于数量的减少所以即使 render 函数执行得再频繁也是很快的</p>
    <p>优化方案2：如果数据量 500 条以下，单元格输入框不要使用任何组件（特别是 v-model ），应该使用原生的输入框，配合<router-link class="link" :to="{name: 'Advanced'}">渲染器</router-link>实现，将 input 事件改成 change 事件，避免 render 函数频繁执行。这样就可以使输入框很流畅了</p>
  </div>
</template>

<style lang="scss" scoped>
p {
  font-size: 16px;
}
</style>
