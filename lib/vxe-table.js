"use strict";

var XEUtils = require('xe-utils/methods/xe-utils');

var Table = require('./table');

var Column = require('./column');

var Header = require('./header');

var Body = require('./body');

var Footer = require('./footer');

var Filter = require('./filter');

var Loading = require('./loading');

var Grid = require('./grid');

var Menu = require('./menu');

var Toolbar = require('./toolbar');

var Pager = require('./pager');

var Checkbox = require('./checkbox');

var Radio = require('./radio');

var Input = require('./input');

var Button = require('./button');

var Modal = require('./modal');

var Tooltip = require('./tooltip');

var Export = require('./export');

var Keyboard = require('./keyboard');

var Resize = require('./resize');

var VXETable = require('./v-x-e-table');

var zhCNLocat = require('./locale/lang/zh-CN'); // 按需加载的组件


var components = [Table, Column, Header, Body, Footer, Filter, Loading, Grid, Menu, Toolbar, Pager, Checkbox, Radio, Input, Button, Modal, Tooltip, Export, Keyboard, Resize]; // 默认安装

function install(Vue, options) {
  if (XEUtils.isPlainObject(options)) {
    VXETable.setup(options);
  }

  components.map(function (component) {
    return Vue.use(component);
  });
} // 默认中文


VXETable.setup({
  i18n: function i18n(key, value) {
    return XEUtils.get(zhCNLocat, key);
  }
});

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

VXETable.install = install;
module.exports = {
  Table: Table,
  Column: Column,
  Header: Header,
  Body: Body,
  Footer: Footer,
  Filter: Filter,
  Loading: Loading,
  Grid: Grid,
  Menu: Menu,
  Toolbar: Toolbar,
  Pager: Pager,
  Checkbox: Checkbox,
  Radio: Radio,
  Input: Input,
  Button: Button,
  Modal: Modal,
  Tooltip: Tooltip,
  Export: Export,
  Keyboard: Keyboard,
  Resize: Resize,
  VXETable: VXETable
};
module.exports.default = VXETable;