import Vue from 'vue'
import TableAPILink from '../components/TableAPILink.vue'
import TableColumnAPILink from '../components/TableColumnAPILink.vue'
import PagerAPILink from '../components/PagerAPILink.vue'
import ToolbarAPILink from '../components/ToolbarAPILink.vue'
import GridAPILink from '../components/GridAPILink.vue'

import './highlight.js'
import './element.js'
import './iview.js'
import './antd.js'
import './echarts'
import './xtable'

Vue.component(TableAPILink.name, TableAPILink)
Vue.component(TableColumnAPILink.name, TableColumnAPILink)
Vue.component(PagerAPILink.name, PagerAPILink)
Vue.component(ToolbarAPILink.name, ToolbarAPILink)
Vue.component(GridAPILink.name, GridAPILink)
