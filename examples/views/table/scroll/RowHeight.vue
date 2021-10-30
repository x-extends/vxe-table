<template>
  <div>
    <p class="tip">虚拟滚动启用后需要等行高，可以通过 <table-api-link prop="row-config"/>.height 修改行的高度</p>

    <vxe-table
      border
      resizable
      show-overflow
      ref="xTable"
      height="500"
      :row-config="{height: 120}"
      :scroll-y="{gt: 0}"
      :loading="loading">
      <vxe-column type="seq" title="序号" width="100"></vxe-column>
      <vxe-column title="图片" width="140" align="center">
        <template #default>
          <img src="/vxe-table/static/other/img1.gif" style="width: 100px;">
        </template>
      </vxe-column>
      <vxe-column title="基本信息">
        <template #default="{ row }">
          <div class="label-ellipsis">{{ row.name }}</div>
          <div class="label-ellipsis">{{ row.num }}</div>
          <div class="label-ellipsis">{{ row.address }}</div>
        </template>
      </vxe-column>
      <vxe-column field="num" title="Num" width="200"></vxe-column>
      <vxe-column field="time" title="Time" width="200"></vxe-column>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <pre-code class="xml">{{ demoCodes[0] }}</pre-code>
      <pre-code class="javascript">{{ demoCodes[1] }}</pre-code>
      <pre-code class="css">{{ demoCodes[1] }}</pre-code>
    </pre>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false,
      demoCodes: [
        `
        <vxe-table
          border
          resizable
          show-overflow
          ref="xTable"
          height="500"
          :row-config="{height: 120}"
          :scroll-y="{gt: 0}"
          :loading="loading">
          <vxe-column type="seq" title="序号" width="100"></vxe-column>
          <vxe-column title="图片" width="140" align="center">
            <template #default>
              <img src="/vxe-table/static/other/img1.gif" style="width: 100px;">
            </template>
          </vxe-column>
          <vxe-column title="基本信息">
            <template #default="{ row }">
              <div class="label-ellipsis">{{ row.name }}</div>
              <div class="label-ellipsis">{{ row.num }}</div>
              <div class="label-ellipsis">{{ row.address }}</div>
            </template>
          </vxe-column>
          <vxe-column field="num" title="Num" width="200"></vxe-column>
          <vxe-column field="time" title="Time" width="200"></vxe-column>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          mounted () {
            this.loading = true
            this.$nextTick(() => {
              const $table = this.$refs.xTable
              this.mockList(1000).then(data => {
                this.loading = false
                if ($table) {
                  $table.loadData(data)
                }
              })
            })
          },
          methods: {
            mockList (size) {
              return new Promise(resolve => {
                const list = []
                for (let index = 0; index < size; index++) {
                  list.push({
                    name: \`名称\${index} 名称名称 名称名称 名称名称名称名称名称名称 名称名称名称名称 名称名称名称名称名称名称\`,
                    time: '2021-01-01 10:20:30',
                    num: 20,
                    address: 'shenzhen shenzhen shenzhen shenzhen shenzhen'
                  })
                }
                resolve(list)
              })
            }
          }
        }
        `,
        `
        .label-ellipsis {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        `
      ]
    }
  },
  mounted () {
    this.loading = true
    this.$nextTick(() => {
      const $table = this.$refs.xTable
      this.mockList(1000).then(data => {
        this.loading = false
        if ($table) {
          $table.loadData(data)
        }
      })
    })
  },
  methods: {
    mockList (size) {
      return new Promise(resolve => {
        const list = []
        for (let index = 0; index < size; index++) {
          list.push({
            name: `名称${index} 名称名称 名称名称 名称名称名称名称名称名称 名称名称名称名称 名称名称名称名称名称名称`,
            time: '2021-01-01 10:20:30',
            num: 20,
            address: 'shenzhen shenzhen shenzhen shenzhen shenzhen'
          })
        }
        resolve(list)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.label-ellipsis {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
</style>
