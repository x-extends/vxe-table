<template>
  <vxe-form :data="formData" @submit="searchEvent">
    <vxe-form-item field="name" title="名称">
      <template v-slot>
        <vxe-input v-model="formData.name" placeholder="请输入名称" clearable></vxe-input>
      </template>
    </vxe-form-item>
    <vxe-form-item field="sex" title="性别">
      <template v-slot>
        <select class="vxe-select" v-model="formData.sex">
          <option v-for="(item, index) in sexList" :key="index" :value="item.value">{{ item.label }}</option>
        </select>
      </template>
    </vxe-form-item>
    <vxe-form-item field="role" title="角色">
      <template v-slot>
        <vxe-input v-model="formData.role" placeholder="请输入角色" clearable></vxe-input>
      </template>
    </vxe-form-item>
    <vxe-form-item>
      <template v-slot>
        <vxe-button type="submit" status="primary">搜索</vxe-button>
      </template>
    </vxe-form-item>
  </vxe-form>
</template>

<script>
export default {
  name: 'FormSimple',
  props: {
    formData: Object,
    params: Object,
    context: Object
  },
  data () {
    return {
      sexList: [
        { label: '', value: '' },
        { label: '女', value: '0' },
        { label: '男', value: '1' }
      ]
    }
  },
  methods: {
    searchEvent () {
      const { $grid } = this.context
      $grid.commitProxy('reload')
    }
  }
}
</script>
