"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isItem = isItem;
exports.getItemConfig = getItemConfig;
exports.createItem = createItem;
exports.destroyItem = destroyItem;
exports.assemItem = assemItem;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var ItemConfig = /*#__PURE__*/function () {
  function ItemConfig($xeform, _vm) {
    _classCallCheck(this, ItemConfig);

    Object.assign(this, {
      id: _ctor.default.uniqueId('item_'),
      title: _vm.title,
      field: _vm.field,
      span: _vm.span,
      align: _vm.align,
      titleAlign: _vm.titleAlign,
      titleWidth: _vm.titleWidth,
      titlePrefix: _vm.titlePrefix,
      titleSuffix: _vm.titleSuffix,
      resetValue: _vm.resetValue,
      visibleMethod: _vm.visibleMethod,
      folding: _vm.folding,
      collapseNode: _vm.collapseNode,
      itemRender: _vm.itemRender,
      // 渲染属性
      showError: false,
      errRule: null,
      slots: _vm.slots
    });
  }

  _createClass(ItemConfig, [{
    key: "update",
    value: function update(name, value) {
      this[name] = value;
    }
  }]);

  return ItemConfig;
}();

function isItem(option) {
  return option instanceof ItemConfig;
}

function getItemConfig($xeform, _vm, options) {
  return isItem(_vm) ? _vm : new ItemConfig($xeform, _vm, options);
}

function createItem($xeform, _vm) {
  return getItemConfig($xeform, _vm);
}

function destroyItem(_vm) {
  var $xeform = _vm.$xeform,
      itemConfig = _vm.itemConfig;

  var matchObj = _ctor.default.findTree($xeform.collectItem, function (option) {
    return option === itemConfig;
  });

  if (matchObj) {
    matchObj.items.splice(matchObj.index, 1);
  }
}

function assemItem(_vm) {
  var $el = _vm.$el,
      $xeform = _vm.$xeform,
      itemConfig = _vm.itemConfig;
  itemConfig.slots = _vm.$scopedSlots;
  $xeform.collectItem.splice([].indexOf.call($xeform.$refs.hideItem.children, $el), 0, itemConfig);
}