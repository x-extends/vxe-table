<template>
  <div>
    <h2>{{ $t('app.aside.nav.toolbar') }}</h2>
    <p class="tip">表格的工具栏模块，查看 <router-link class="link" :to="{name: 'VXEAPI', params: {name: 'toolbar'}}">API</router-link>，可以通过 <router-link class="link" :to="{name: 'StartGlobal'}">setup</router-link> 设置全局参数</p>

    <p>
      <vxe-toolbar>
        <template v-slot:buttons>
          <vxe-button>默认尺寸</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
              <vxe-button type="text">按钮3</vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="medium">
        <template v-slot:buttons>
          <vxe-button>中等尺寸</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
              <vxe-button type="text">按钮3</vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="small">
        <template v-slot:buttons>
          <vxe-button>小型尺寸</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
              <vxe-button type="text">按钮3</vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
      <vxe-toolbar size="mini">
        <template v-slot:buttons>
          <vxe-button>超小尺寸</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">按钮1</vxe-button>
              <vxe-button type="text">按钮2</vxe-button>
              <vxe-button type="text">按钮3</vxe-button>
            </template>
          </vxe-button>
        </template>
      </vxe-toolbar>
    </p>

    <p>
      <vxe-toolbar perfect>
        <template v-slot:buttons>
          <vxe-button type="text" icon="fa fa-plus">新增</vxe-button>
          <vxe-button type="text" icon="fa fa-trash-o">删除</vxe-button>
          <vxe-button type="text" icon="fa fa-save">保存</vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar perfect>
        <template v-slot:buttons>
          <vxe-button icon="fa fa-plus" status="perfect">新增</vxe-button>
          <vxe-button icon="fa fa-trash-o" status="perfect">删除</vxe-button>
          <vxe-button icon="fa fa-save" status="perfect">保存</vxe-button>
        </template>
      </vxe-toolbar>

      <vxe-toolbar :refresh="{ query: findList }">
        <template v-slot:buttons>
          <vxe-button>自定义模板</vxe-button>
          <vxe-button>按钮2</vxe-button>
          <vxe-button>按钮3</vxe-button>
          <vxe-button>
            <template>下拉按钮</template>
            <template v-slot:dropdowns>
              <vxe-button>按钮1</vxe-button>
              <vxe-button>按钮2</vxe-button>
              <vxe-button>按钮3</vxe-button>
            </template>
          </vxe-button>
        </template>
        <template v-slot:tools>
          <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
          <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn"></vxe-button>
        </template>
      </vxe-toolbar>
    </p>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="javascript">{{ demoCodes[1] }}</code>
      <code class="css">{{ demoCodes[2] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      loading: false,
      demoCodes: [
        `
        <p>
          <vxe-toolbar>
            <template v-slot:buttons>
              <vxe-button>默认尺寸</vxe-button>
              <vxe-button>
                <template>下拉按钮</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">按钮1</vxe-button>
                  <vxe-button type="text">按钮2</vxe-button>
                  <vxe-button type="text">按钮3</vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="medium">
            <template v-slot:buttons>
              <vxe-button>中等尺寸</vxe-button>
              <vxe-button>
                <template>下拉按钮</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">按钮1</vxe-button>
                  <vxe-button type="text">按钮2</vxe-button>
                  <vxe-button type="text">按钮3</vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="small">
            <template v-slot:buttons>
              <vxe-button>小型尺寸</vxe-button>
              <vxe-button>
                <template>下拉按钮</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">按钮1</vxe-button>
                  <vxe-button type="text">按钮2</vxe-button>
                  <vxe-button type="text">按钮3</vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
          <vxe-toolbar size="mini">
            <template v-slot:buttons>
              <vxe-button>超小尺寸</vxe-button>
              <vxe-button>
                <template>下拉按钮</template>
                <template v-slot:dropdowns>
                  <vxe-button type="text">按钮1</vxe-button>
                  <vxe-button type="text">按钮2</vxe-button>
                  <vxe-button type="text">按钮3</vxe-button>
                </template>
              </vxe-button>
            </template>
          </vxe-toolbar>
        </p>

        <p>
          <vxe-toolbar perfect>
            <template v-slot:buttons>
              <vxe-button type="text" icon="fa fa-plus">新增</vxe-button>
              <vxe-button type="text" icon="fa fa-trash-o">删除</vxe-button>
              <vxe-button type="text" icon="fa fa-save">保存</vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar perfect>
            <template v-slot:buttons>
              <vxe-button icon="fa fa-plus" status="perfect">新增</vxe-button>
              <vxe-button icon="fa fa-trash-o" status="perfect">删除</vxe-button>
              <vxe-button icon="fa fa-save" status="perfect">保存</vxe-button>
            </template>
          </vxe-toolbar>

          <vxe-toolbar :refresh="{ query: findList }">
            <template v-slot:buttons>
              <vxe-button>自定义模板</vxe-button>
              <vxe-button>按钮2</vxe-button>
              <vxe-button>按钮3</vxe-button>
              <vxe-button>
                <template>下拉按钮</template>
                <template v-slot:dropdowns>
                  <vxe-button>按钮1</vxe-button>
                  <vxe-button>按钮2</vxe-button>
                  <vxe-button>按钮3</vxe-button>
                </template>
              </vxe-button>
            </template>
            <template v-slot:tools>
              <vxe-button type="text" icon="vxe-icon--question" class="tool-btn"></vxe-button>
              <vxe-button type="text" icon="vxe-icon--funnel" class="tool-btn"></vxe-button>
            </template>
          </vxe-toolbar>
        </p>
        `,
        `
        export default {
          data () {
            return {
              loading: false
            }
          },
          methods: {
            findList () {
              this.loading = true
              return new Promise(resolve => {
                this.loading = false
                this.$XModal.message({ message: '刷新成功！', status: 'success' })
                setTimeout(resolve, 800)
              })
            }
          }
        }
        `,
        `
        .tool-btn {
          font-size: 20px;
          cursor: pointer;
        }
        .tool-btn:hover {
          color: #409eff;
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  },
  methods: {
    findList () {
      this.loading = true
      return new Promise(resolve => {
        this.loading = false
        this.$XModal.message({ message: '刷新成功！', status: 'success' })
        setTimeout(resolve, 800)
      })
    }
  }
}
</script>

<style scoped>
.tool-btn {
  font-size: 20px;
  cursor: pointer;
}
.tool-btn:hover {
  color: #409eff;
}
</style>
