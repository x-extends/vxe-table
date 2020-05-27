<template>
  <div>
    <p class="tip">表格搜索功能，非常简单就可以实现表格内容搜索<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName1" type="search" placeholder="试试全表搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      border
      height="300"
      :data="list1">
      <vxe-table-column type="seq" width="80"></vxe-table-column>
      <vxe-table-column field="name" title="Name" type="html"></vxe-table-column>
      <vxe-table-column field="role" title="Role" type="html"></vxe-table-column>
      <vxe-table-column field="age" title="Age" type="html"></vxe-table-column>
      <vxe-table-column field="address" title="Address" type="html"></vxe-table-column>
      <template v-slot:empty>
        <span style="color: red;">
          <img src="static/other/img2.gif">
          <p>没有更多数据了！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="scss">{{ demoCodes[2] }}</code>
    </pre>

    <p class="tip">树表格搜索功能，非常简单就可以实现树表格内容搜索<span class="red">（具体请自行实现，该示例仅供参考）</span></p>

    <vxe-toolbar>
      <template v-slot:buttons>
        <vxe-input v-model="filterName2" type="search" placeholder="试试全表搜索"></vxe-input>
      </template>
    </vxe-toolbar>

    <vxe-table
      tree-config
      ref="xTree"
      max-height="400"
      :data="list2">
      <vxe-table-column type="seq" width="220" title="序号" tree-node></vxe-table-column>
      <vxe-table-column field="name" title="Name" type="html"></vxe-table-column>
      <vxe-table-column field="size" title="Size" type="html"></vxe-table-column>
      <vxe-table-column field="type" title="Type" type="html"></vxe-table-column>
      <vxe-table-column field="date" title="Date" type="html"></vxe-table-column>
      <template v-slot:empty>
        <span style="color: red;">
          <img src="static/other/img1.gif">
          <p>搜索不到数据，可能输入的关键字姿势不对！</p>
        </span>
      </template>
    </vxe-table>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="xml">{{ demoCodes[3] }}</code>
      <code class="javascript">{{ demoCodes[4] }}</code>
      <code class="scss">{{ demoCodes[5] }}</code>
    </pre>
  </div>
</template>

<script>
import XEUtils from 'xe-utils'
import hljs from 'highlight.js'

export default {
  data () {
    return {
      filterName1: '',
      tableData1: [],
      filterName2: '',
      tableData2: [],
      demoCodes: [
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          border
          height="300"
          :data="list">
          <vxe-table-column type="seq" width="80"></vxe-table-column>
          <vxe-table-column field="name" title="Name" type="html"></vxe-table-column>
          <vxe-table-column field="role" title="Role" type="html"></vxe-table-column>
          <vxe-table-column field="age" title="Age" type="html"></vxe-table-column>
          <vxe-table-column field="address" title="Address" type="html"></vxe-table-column>
          <template v-slot:empty>
            <span style="color: red;">
              <img src="static/other/img2.gif">
              <p>没有更多数据了！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              filterName: '',
              tableData: []
            }
          },
          computed: {
            list () {
              const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
              if (filterName) {
                const filterRE = new RegExp(filterName, 'gi')
                const searchProps = ['name', 'role', 'age', 'address']
                const rest = this.tableData.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
                return rest.map(row => {
                  const item = Object.assign({}, row)
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                  return item
                })
              }
              return this.tableData
            }
          },
          created () {
            this.tableData = window.MOCK_DATA_LIST.slice(0, 50)
          }
        }
        `,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `,
        `
        <vxe-toolbar>
          <template v-slot:buttons>
            <vxe-input v-model="filterName" type="search" placeholder="试试全表搜索"></vxe-input>
          </template>
        </vxe-toolbar>

        <vxe-table
          tree-config
          ref="xTree"
          max-height="400"
          :data="list">
          <vxe-table-column type="seq" width="220" title="序号" tree-node></vxe-table-column>
          <vxe-table-column field="name" title="Name" type="html"></vxe-table-column>
          <vxe-table-column field="size" title="Size" type="html"></vxe-table-column>
          <vxe-table-column field="type" title="Type" type="html"></vxe-table-column>
          <vxe-table-column field="date" title="Date" type="html"></vxe-table-column>
          <template v-slot:empty>
            <span style="color: red;">
              <img src="static/other/img1.gif">
              <p>搜索不到数据，可能输入的关键字姿势不对！</p>
            </span>
          </template>
        </vxe-table>
        `,
        `
        export default {
          data () {
            return {
              filterName: '',
              tableData: []
            }
          },
          computed: {
            list () {
              const filterName = XEUtils.toString(this.filterName).trim().toLowerCase()
              if (filterName) {
                const filterRE = new RegExp(filterName, 'gi')
                const options = { children: 'children' }
                const searchProps = ['name', 'size', 'type', 'date']
                const rest = XEUtils.searchTree(this.tableData, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
                XEUtils.eachTree(rest, item => {
                  searchProps.forEach(key => {
                    item[key] = XEUtils.toString(item[key]).replace(filterRE, match => \`<span class="keyword-lighten">\${match}</span>\`)
                  })
                }, options)
                // 搜索之后默认展开所有子节点
                this.$nextTick(() => {
                  this.$refs.xTree.setAllTreeExpansion(true)
                })
                return rest
              }
              return this.tableData
            }
          },
          created () {
            this.tableData = window.MOCK_TREE_DATA_LIST
          }
        }`,
        `
        .keyword-lighten {
          color: #000;
          background-color: #FFFF00;
        }
        `
      ]
    }
  },
  computed: {
    list1 () {
      const filterName = XEUtils.toString(this.filterName1).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const searchProps = ['name', 'role', 'age', 'address']
        const rest = this.tableData1.filter(item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1))
        return rest.map(row => {
          const item = Object.assign({}, row)
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
          return item
        })
      }
      return this.tableData1
    },
    list2 () {
      const filterName = XEUtils.toString(this.filterName2).trim().toLowerCase()
      if (filterName) {
        const filterRE = new RegExp(filterName, 'gi')
        const options = { children: 'children' }
        const searchProps = ['name', 'size', 'type', 'date']
        const rest = XEUtils.searchTree(this.tableData2, item => searchProps.some(key => XEUtils.toString(item[key]).toLowerCase().indexOf(filterName) > -1), options)
        XEUtils.eachTree(rest, item => {
          searchProps.forEach(key => {
            item[key] = XEUtils.toString(item[key]).replace(filterRE, match => `<span class="keyword-lighten">${match}</span>`)
          })
        }, options)
        // 搜索之后默认展开所有子节点
        this.$nextTick(() => {
          this.$refs.xTree.setAllTreeExpansion(true)
        })
        return rest
      }
      return this.tableData2
    }
  },
  created () {
    this.tableData1 = window.MOCK_DATA_LIST.slice(0, 50)
    this.tableData2 = XEUtils.clone(window.MOCK_TREE_DATA_LIST, true)
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>
