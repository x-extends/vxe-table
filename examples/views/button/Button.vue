<template>
  <div>
    <h2>{{ $t('app.aside.nav.button') }}</h2>
    <p class="tip">标准按钮，文本按钮、下拉按钮</p>

    <p>
      <vxe-button content="默认尺寸"></vxe-button>
      <vxe-button size="medium" content="中等尺寸"></vxe-button>
      <vxe-button size="small" content="小型尺寸"></vxe-button>
      <vxe-button size="mini" content="超小尺寸"></vxe-button>
    </p>

    <p>
      <vxe-button size="mini" content="超小下拉按钮">
        <template v-slot:dropdowns>
          <vxe-button type="text" content="下拉按钮1"></vxe-button>
          <vxe-button type="text" status="primary" content="下拉按钮2"></vxe-button>
          <vxe-button type="text" content="下拉按钮3"></vxe-button>
        </template>
      </vxe-button>
      <vxe-button size="small" content="小型下拉按钮">
        <template v-slot:dropdowns>
          <vxe-button type="text" content="下拉按钮1"></vxe-button>
          <vxe-button type="text" status="success" content="下拉按钮2"></vxe-button>
          <vxe-button type="text" content="下拉按钮3"></vxe-button>
        </template>
      </vxe-button>
      <vxe-button size="medium" content="中等下拉按钮">
        <template v-slot:dropdowns>
          <vxe-button type="text" content="下拉按钮1"></vxe-button>
          <vxe-button type="text" status="warning" content="下拉按钮2"></vxe-button>
          <vxe-button type="text" content="下拉按钮3"></vxe-button>
        </template>
      </vxe-button>
      <vxe-button content="默认下拉按钮">
        <template v-slot:dropdowns>
          <vxe-button type="text" content="下拉按钮1"></vxe-button>
          <vxe-button type="text" status="danger" content="下拉按钮2"></vxe-button>
          <vxe-button type="text" content="下拉按钮3"></vxe-button>
        </template>
      </vxe-button>
    </p>

    <p>
      <vxe-button type="text" content="默认颜色"></vxe-button>
      <vxe-button type="text" status="primary" content="主要颜色"></vxe-button>
      <vxe-button type="text" status="success" content="信息颜色">x</vxe-button>
      <vxe-button type="text" status="info" content="信息颜色"></vxe-button>
      <vxe-button type="text" status="warning" content="警告颜色"></vxe-button>
      <vxe-button type="text" status="danger" content="危险颜色"></vxe-button>
    </p>

    <p>
      <vxe-button type="text" content="默认禁用颜色" disabled></vxe-button>
      <vxe-button type="text" status="primary" content="主要禁用颜色" disabled></vxe-button>
      <vxe-button type="text" status="success" content="成功禁用颜色" disabled></vxe-button>
      <vxe-button type="text" status="info" content="信息禁用颜色" disabled></vxe-button>
      <vxe-button type="text" status="warning" content="警告禁用颜色" disabled></vxe-button>
      <vxe-button type="text" status="danger" content="危险禁用颜色" disabled></vxe-button>
    </p>

    <p>
      <vxe-button type="text" content="默认颜色" loading></vxe-button>
      <vxe-button type="text" status="primary" content="主要颜色" loading></vxe-button>
      <vxe-button type="text" status="success" content="成功颜色" loading></vxe-button>
      <vxe-button type="text" status="info" content="信息颜色" loading></vxe-button>
      <vxe-button type="text" status="warning" content="警告颜色" loading></vxe-button>
      <vxe-button type="text" status="danger" content="危险颜色" loading></vxe-button>
    </p>

    <p>
      <vxe-button content="默认颜色"></vxe-button>
      <vxe-button status="primary" content="主要颜色"></vxe-button>
      <vxe-button status="success" content="成功颜色"></vxe-button>
      <vxe-button status="info" content="信息颜色"></vxe-button>
      <vxe-button status="warning" content="警告颜色"></vxe-button>
      <vxe-button status="danger" content="危险颜色"></vxe-button>
    </p>

    <p>
      <vxe-button content="默认禁用颜色" disabled></vxe-button>
      <vxe-button status="primary" content="主要禁用颜色" disabled></vxe-button>
      <vxe-button status="success" content="成功禁用颜色" disabled></vxe-button>
      <vxe-button status="info" content="信息禁用颜色" disabled></vxe-button>
      <vxe-button status="warning" content="警告禁用颜色" disabled></vxe-button>
      <vxe-button status="danger" content="危险禁用颜色" disabled></vxe-button>
    </p>

    <p>
      <vxe-button content="默认颜色" loading></vxe-button>
      <vxe-button status="primary" content="主要颜色" loading></vxe-button>
      <vxe-button status="success" content="成功颜色" loading></vxe-button>
      <vxe-button status="info" content="信息颜色" loading></vxe-button>
      <vxe-button status="warning" content="警告颜色" loading></vxe-button>
      <vxe-button status="danger" content="危险颜色" loading></vxe-button>
    </p>

    <p>
      <vxe-button transfer>
        <template v-slot>默认颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="primary" transfer>
        <template v-slot>主要颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text" status="primary">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="success" transfer>
        <template v-slot>成功颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text" status="success">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="info" transfer>
        <template v-slot>信息颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text" status="my-purple">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="warning" transfer>
        <template v-slot>警告颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text" status="warning">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
      <vxe-button status="danger" transfer>
        <template v-slot>危险颜色</template>
        <template v-slot:dropdowns>
          <vxe-button type="text">下拉按钮1</vxe-button>
          <vxe-button type="text" status="danger">下拉按钮2</vxe-button>
          <vxe-button type="text">下拉按钮3</vxe-button>
        </template>
      </vxe-button>
    </p>

    <p>
      <vxe-button icon="fa fa-plus">默认图标颜色</vxe-button>
      <vxe-button status="primary" icon="fa fa-save">主要图标颜色</vxe-button>
      <vxe-button status="success" icon="fa fa-check">成功图标颜色</vxe-button>
      <vxe-button status="info" icon="fa fa-info">信息图标颜色</vxe-button>
      <vxe-button status="warning" icon="fa fa-warning">警告图标颜色</vxe-button>
      <vxe-button status="danger" icon="fa fa-trash-o">危险图标颜色</vxe-button>
    </p>

    <p>
      <vxe-button icon="fa fa-download">默认图标颜色</vxe-button>
      <vxe-button icon="fa fa-save my-primary">主要图标颜色</vxe-button>
      <vxe-button icon="fa fa-check my-success">成功图标颜色</vxe-button>
      <vxe-button icon="fa fa-info my-info">信息图标颜色</vxe-button>
      <vxe-button icon="fa fa-warning my-warning">警告图标颜色</vxe-button>
      <vxe-button icon="fa fa-trash-o my-danger">危险图标颜色</vxe-button>
    </p>

    <p>
      <vxe-button round>圆角按钮</vxe-button>
      <vxe-button loading round>圆角按钮</vxe-button>
      <vxe-button status="primary" round>主要颜色</vxe-button>
      <vxe-button status="success" round>成功颜色</vxe-button>
      <vxe-button status="info" round>信息颜色</vxe-button>
      <vxe-button status="warning" round>警告颜色</vxe-button>
      <vxe-button status="danger" round>危险颜色</vxe-button>
    </p>

    <p>
      <vxe-button icon="fa fa-plus" circle></vxe-button>
      <vxe-button loading circle></vxe-button>
      <vxe-button status="primary" icon="fa fa-save" circle></vxe-button>
      <vxe-button status="success" icon="fa fa-check" circle></vxe-button>
      <vxe-button status="info" icon="fa fa-info" circle></vxe-button>
      <vxe-button status="warning" icon="fa fa-warning" circle></vxe-button>
      <vxe-button status="danger" icon="fa fa-trash-o" circle></vxe-button>
    </p>

    <p>
      <vxe-button icon="fa fa-plus"></vxe-button>
      <vxe-button loading></vxe-button>
      <vxe-button status="primary" icon="fa fa-save"></vxe-button>
      <vxe-button status="success" icon="fa fa-check"></vxe-button>
      <vxe-button status="info" icon="fa fa-info"></vxe-button>
      <vxe-button status="warning" icon="fa fa-warning"></vxe-button>
      <vxe-button status="danger" icon="fa fa-trash-o"></vxe-button>
    </p>

    <p>
      <vxe-button type="text" icon="fa fa-plus">默认图标颜色</vxe-button>
      <vxe-button type="text" status="primary" icon="fa fa-save">主要图标颜色</vxe-button>
      <vxe-button type="text" status="success" icon="fa fa-check">成功图标颜色</vxe-button>
      <vxe-button type="text" status="info" icon="fa fa-info">信息图标颜色</vxe-button>
      <vxe-button type="text" status="warning" icon="fa fa-warning">警告图标颜色</vxe-button>
      <vxe-button type="text" status="danger" icon="fa fa-trash-o">危险图标颜色</vxe-button>
    </p>

    <p>
      <vxe-button type="text" icon="fa fa-plus"></vxe-button>
      <vxe-button type="text" icon="fa fa-refresh"></vxe-button>
      <vxe-button status="primary" icon="fa fa-download">图标按钮</vxe-button>
      <vxe-button status="my-purple" icon="fa fa-save">自定义按钮颜色</vxe-button>
      <vxe-button icon="fa fa-graduation-cap my-green">自定义图标颜色</vxe-button>
    </p>

    <pre>
      <code>
        | Tab | 切换到上一个 |
        | Shift Tab | 切换到下一个 |
        | Spacebar | 按下点击 |
        | Enter | 点击 |
      </code>
    </pre>

    <p class="demo-code">{{ $t('app.body.button.showCode') }}</p>

    <pre>
      <code class="html">{{ demoCodes[0] }}</code>
      <code class="css">{{ demoCodes[1] }}</code>
    </pre>
  </div>
</template>

<script>
import hljs from 'highlight.js'

export default {
  data  () {
    return {
      demoCodes: [
        `
        <p>
          <vxe-button content="默认尺寸"></vxe-button>
          <vxe-button size="medium" content="中等尺寸"></vxe-button>
          <vxe-button size="small" content="小型尺寸"></vxe-button>
          <vxe-button size="mini" content="超小尺寸"></vxe-button>
        </p>

        <p>
          <vxe-button size="mini" content="超小下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="下拉按钮1"></vxe-button>
              <vxe-button type="text" status="primary" content="下拉按钮2"></vxe-button>
              <vxe-button type="text" content="下拉按钮3"></vxe-button>
            </template>
          </vxe-button>
          <vxe-button size="small" content="小型下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="下拉按钮1"></vxe-button>
              <vxe-button type="text" status="success" content="下拉按钮2"></vxe-button>
              <vxe-button type="text" content="下拉按钮3"></vxe-button>
            </template>
          </vxe-button>
          <vxe-button size="medium" content="中等下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="下拉按钮1"></vxe-button>
              <vxe-button type="text" status="warning" content="下拉按钮2"></vxe-button>
              <vxe-button type="text" content="下拉按钮3"></vxe-button>
            </template>
          </vxe-button>
          <vxe-button content="默认下拉按钮">
            <template v-slot:dropdowns>
              <vxe-button type="text" content="下拉按钮1"></vxe-button>
              <vxe-button type="text" status="danger" content="下拉按钮2"></vxe-button>
              <vxe-button type="text" content="下拉按钮3"></vxe-button>
            </template>
          </vxe-button>
        </p>

        <p>
          <vxe-button type="text" content="默认颜色"></vxe-button>
          <vxe-button type="text" status="primary" content="主要颜色"></vxe-button>
          <vxe-button type="text" status="success" content="信息颜色">x</vxe-button>
          <vxe-button type="text" status="info" content="信息颜色"></vxe-button>
          <vxe-button type="text" status="warning" content="警告颜色"></vxe-button>
          <vxe-button type="text" status="danger" content="危险颜色"></vxe-button>
        </p>

        <p>
          <vxe-button type="text" content="默认禁用颜色" disabled></vxe-button>
          <vxe-button type="text" status="primary" content="主要禁用颜色" disabled></vxe-button>
          <vxe-button type="text" status="success" content="成功禁用颜色" disabled></vxe-button>
          <vxe-button type="text" status="info" content="信息禁用颜色" disabled></vxe-button>
          <vxe-button type="text" status="warning" content="警告禁用颜色" disabled></vxe-button>
          <vxe-button type="text" status="danger" content="危险禁用颜色" disabled></vxe-button>
        </p>

        <p>
          <vxe-button type="text" content="默认颜色" loading></vxe-button>
          <vxe-button type="text" status="primary" content="主要颜色" loading></vxe-button>
          <vxe-button type="text" status="success" content="成功颜色" loading></vxe-button>
          <vxe-button type="text" status="info" content="信息颜色" loading></vxe-button>
          <vxe-button type="text" status="warning" content="警告颜色" loading></vxe-button>
          <vxe-button type="text" status="danger" content="危险颜色" loading></vxe-button>
        </p>

        <p>
          <vxe-button content="默认颜色"></vxe-button>
          <vxe-button status="primary" content="主要颜色"></vxe-button>
          <vxe-button status="success" content="成功颜色"></vxe-button>
          <vxe-button status="info" content="信息颜色"></vxe-button>
          <vxe-button status="warning" content="警告颜色"></vxe-button>
          <vxe-button status="danger" content="危险颜色"></vxe-button>
        </p>

        <p>
          <vxe-button content="默认禁用颜色" disabled></vxe-button>
          <vxe-button status="primary" content="主要禁用颜色" disabled></vxe-button>
          <vxe-button status="success" content="成功禁用颜色" disabled></vxe-button>
          <vxe-button status="info" content="信息禁用颜色" disabled></vxe-button>
          <vxe-button status="warning" content="警告禁用颜色" disabled></vxe-button>
          <vxe-button status="danger" content="危险禁用颜色" disabled></vxe-button>
        </p>

        <p>
          <vxe-button content="默认颜色" loading></vxe-button>
          <vxe-button status="primary" content="主要颜色" loading></vxe-button>
          <vxe-button status="success" content="成功颜色" loading></vxe-button>
          <vxe-button status="info" content="信息颜色" loading></vxe-button>
          <vxe-button status="warning" content="警告颜色" loading></vxe-button>
          <vxe-button status="danger" content="危险颜色" loading></vxe-button>
        </p>

        <p>
          <vxe-button transfer>
            <template v-slot>默认颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="primary" transfer>
            <template v-slot>主要颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text" status="primary">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="success" transfer>
            <template v-slot>成功颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text" status="success">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="info" transfer>
            <template v-slot>信息颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text" status="my-purple">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="warning" transfer>
            <template v-slot>警告颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text" status="warning">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
          <vxe-button status="danger" transfer>
            <template v-slot>危险颜色</template>
            <template v-slot:dropdowns>
              <vxe-button type="text">下拉按钮1</vxe-button>
              <vxe-button type="text" status="danger">下拉按钮2</vxe-button>
              <vxe-button type="text">下拉按钮3</vxe-button>
            </template>
          </vxe-button>
        </p>

        <p>
          <vxe-button icon="fa fa-plus">默认图标颜色</vxe-button>
          <vxe-button status="primary" icon="fa fa-save">主要图标颜色</vxe-button>
          <vxe-button status="success" icon="fa fa-check">成功图标颜色</vxe-button>
          <vxe-button status="info" icon="fa fa-info">信息图标颜色</vxe-button>
          <vxe-button status="warning" icon="fa fa-warning">警告图标颜色</vxe-button>
          <vxe-button status="danger" icon="fa fa-trash-o">危险图标颜色</vxe-button>
        </p>

        <p>
          <vxe-button icon="fa fa-download">默认图标颜色</vxe-button>
          <vxe-button icon="fa fa-save my-primary">主要图标颜色</vxe-button>
          <vxe-button icon="fa fa-check my-success">成功图标颜色</vxe-button>
          <vxe-button icon="fa fa-info my-info">信息图标颜色</vxe-button>
          <vxe-button icon="fa fa-warning my-warning">警告图标颜色</vxe-button>
          <vxe-button icon="fa fa-trash-o my-danger">危险图标颜色</vxe-button>
        </p>

        <p>
          <vxe-button round>圆角按钮</vxe-button>
          <vxe-button loading round>圆角按钮</vxe-button>
          <vxe-button status="primary" round>主要颜色</vxe-button>
          <vxe-button status="success" round>成功颜色</vxe-button>
          <vxe-button status="info" round>信息颜色</vxe-button>
          <vxe-button status="warning" round>警告颜色</vxe-button>
          <vxe-button status="danger" round>危险颜色</vxe-button>
        </p>

        <p>
          <vxe-button icon="fa fa-plus" circle></vxe-button>
          <vxe-button loading circle></vxe-button>
          <vxe-button status="primary" icon="fa fa-save" circle></vxe-button>
          <vxe-button status="success" icon="fa fa-check" circle></vxe-button>
          <vxe-button status="info" icon="fa fa-info" circle></vxe-button>
          <vxe-button status="warning" icon="fa fa-warning" circle></vxe-button>
          <vxe-button status="danger" icon="fa fa-trash-o" circle></vxe-button>
        </p>

        <p>
          <vxe-button icon="fa fa-plus"></vxe-button>
          <vxe-button loading></vxe-button>
          <vxe-button status="primary" icon="fa fa-save"></vxe-button>
          <vxe-button status="success" icon="fa fa-check"></vxe-button>
          <vxe-button status="info" icon="fa fa-info"></vxe-button>
          <vxe-button status="warning" icon="fa fa-warning"></vxe-button>
          <vxe-button status="danger" icon="fa fa-trash-o"></vxe-button>
        </p>

        <p>
          <vxe-button type="text" icon="fa fa-plus">默认图标颜色</vxe-button>
          <vxe-button type="text" status="primary" icon="fa fa-save">主要图标颜色</vxe-button>
          <vxe-button type="text" status="success" icon="fa fa-check">成功图标颜色</vxe-button>
          <vxe-button type="text" status="info" icon="fa fa-info">信息图标颜色</vxe-button>
          <vxe-button type="text" status="warning" icon="fa fa-warning">警告图标颜色</vxe-button>
          <vxe-button type="text" status="danger" icon="fa fa-trash-o">危险图标颜色</vxe-button>
        </p>

        <p>
          <vxe-button type="text" icon="fa fa-plus"></vxe-button>
          <vxe-button type="text" icon="fa fa-refresh"></vxe-button>
          <vxe-button status="primary" icon="fa fa-download">图标按钮</vxe-button>
          <vxe-button status="my-purple" icon="fa fa-save">自定义按钮颜色</vxe-button>
          <vxe-button icon="fa fa-graduation-cap my-green">自定义图标颜色</vxe-button>
        </p>
        `,
        `
        .vxe-button.type--button.theme--my-purple,
        .vxe-button.type--button.theme--my-purple:hover {
          color: #fff;
        }
        .vxe-button.type--button.theme--my-purple {
          background-color: #800080;
        }
        .vxe-button.type--button.theme--my-purple:active {
          background-color: #a50aa5;
        }
        .my-green {
          color: #008000;
        }
        .my-primary {
          color: #3196ff;
        }
        .my-success {
          color: #67c23a;
        }
        .my-info {
          color: #909399;
        }
        .my-warning {
          color: #e6a23c;
        }
        .my-danger {
          color: #f56c6c;
        }
        `
      ]
    }
  },
  mounted () {
    Array.from(this.$el.querySelectorAll('pre code')).forEach((block) => {
      hljs.highlightBlock(block)
    })
  }
}
</script>

<style>
.vxe-button.type--button.theme--my-purple,
.vxe-button.type--button.theme--my-purple:hover {
  color: #fff;
}
.vxe-button.type--button.theme--my-purple {
  background-color: #800080;
}
.vxe-button.type--button.theme--my-purple:active {
  background-color: #a50aa5;
}
.vxe-button.type--text.theme--my-purple {
  color: #800080;
}
.vxe-button.type--text.theme--my-purple:not(.is--disabled):hover {
  color: #a50aa5;
}
.my-green {
  color: #008000;
}
.my-primary {
  color: #3196ff;
}
.my-success {
  color: #67c23a;
}
.my-info {
  color: #909399;
}
.my-warning {
  color: #e6a23c;
}
.my-danger {
  color: #f56c6c;
}
</style>
