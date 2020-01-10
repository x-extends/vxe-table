import VXETable from '../../../../packages/v-x-e-table'

VXETable.renderer.add('myToolbar', {
  renderButtons (h, renderOpts, { $grid }) {
    return [
      <vxe-button onClick={ e => $grid.print() }>打印</vxe-button>
    ]
  }
})
