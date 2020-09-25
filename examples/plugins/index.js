import Vue from 'vue'
import MyDiv from '../components/MyDiv.vue'
import TableAPILink from '../components/TableAPILink.vue'
import TableColumnAPILink from '../components/TableColumnAPILink.vue'
import PagerAPILink from '../components/PagerAPILink.vue'
import ToolbarAPILink from '../components/ToolbarAPILink.vue'
import GridAPILink from '../components/GridAPILink.vue'
import VirtualTreeAPILink from '../components/VirtualTreeAPILink.vue'
import PreCode from '../components/PreCode.vue'

import './utils'
import './ajax'
import './highlight'
import './element'
import './iview'
import './antd'
import './echarts'
import './xtable'
import './xtable/renderer'
import './xtable/formatter'

Vue.component(MyDiv.name, MyDiv)
Vue.component(TableAPILink.name, TableAPILink)
Vue.component(TableColumnAPILink.name, TableColumnAPILink)
Vue.component(PagerAPILink.name, PagerAPILink)
Vue.component(ToolbarAPILink.name, ToolbarAPILink)
Vue.component(GridAPILink.name, GridAPILink)
Vue.component(VirtualTreeAPILink.name, VirtualTreeAPILink)
Vue.component(PreCode.name, PreCode)
