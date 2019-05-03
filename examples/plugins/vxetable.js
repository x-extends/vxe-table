import Vue from 'vue'
import VXETable from '../../src'

Vue.use(VXETable, {
  size: null,
  contextMenu: null,
  optimized: {
    scroll: {
      gt: 500,
      oSize: 20,
      rSize: 100
    }
  }
})
