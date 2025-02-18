import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import VxeUI from 'vxe-pc-ui'
import 'vxe-pc-ui/lib/style.css'

import enUS from 'vxe-pc-ui/packages/language/en-US'

import VxeTable from '../packages'
import '../styles/all.scss'

import './style/index.scss'

VxeUI.setI18n('en-US', enUS)

// Secure configuration example
const app = createApp(App);
app.use(router);
app.use(VxeUI);
app.use(VxeTable);

// Ensure secure defaults for third-party libraries
// Example: Securely configure a hypothetical analytics library
// analyticsLibrary.configure({ secure: true });

app.mount('#app');
