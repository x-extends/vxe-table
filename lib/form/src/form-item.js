"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

var _conf = _interopRequireDefault(require("../../conf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function renderPrefixIcon(h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [h('i', {
    class: titlePrefix.icon || _conf.default.icon.formPrefix
  })]);
}

function renderSuffixIcon(h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [h('i', {
    class: titleSuffix.icon || _conf.default.icon.formSuffix
  })]);
}

function renderTitle(h, _vm) {
  var title = _vm.title,
      titlePrefix = _vm.titlePrefix,
      titleSuffix = _vm.titleSuffix;
  var titles = [];

  if (titlePrefix) {
    titles.push(titlePrefix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titlePrefix.message),
        enterable: titlePrefix.enterable,
        theme: titlePrefix.theme
      }
    }, [renderPrefixIcon(h, titlePrefix)]) : renderPrefixIcon(h, titlePrefix));
  }

  titles.push(h('span', {
    class: 'vxe-form--item-title-label'
  }, _tools.UtilTools.getFuncText(title)));

  if (titleSuffix) {
    titles.push(titleSuffix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titleSuffix.message),
        enterable: titleSuffix.enterable,
        theme: titleSuffix.theme
      }
    }, [renderSuffixIcon(h, titleSuffix)]) : renderSuffixIcon(h, titleSuffix));
  }

  return titles;
}

var _default = {
  name: 'VxeFormItem',
  props: {
    title: String,
    field: String,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    titlePrefix: Object,
    titleSuffix: Object,
    resetValue: {
      default: null
    },
    visibleMethod: Function,
    folding: Boolean,
    collapseNode: Boolean,
    itemRender: Object
  },
  inject: {
    $vxeform: {
      default: null
    }
  },
  data: function data() {
    return {
      showError: false,
      showRule: null
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    },
    isRequired: function isRequired() {
      var $vxeform = this.$vxeform,
          field = this.field;

      if ($vxeform && $vxeform.rules) {
        var rules = $vxeform.rules[field];

        if (rules) {
          return rules.some(function (rule) {
            return rule.required;
          });
        }
      }

      return false;
    },
    errRule: function errRule() {
      var $vxeform = this.$vxeform,
          field = this.field;

      if ($vxeform) {
        return $vxeform.invalids.find(function (_ref) {
          var property = _ref.property;
          return field === property;
        });
      }

      return null;
    }
  },
  watch: {
    errRule: function errRule(value) {
      var _this = this;

      clearTimeout(this.showErrTimeout);
      this.showError = false;

      if (value) {
        this.showRule = value.rule;
        setTimeout(function () {
          _this.showError = true;
        }, 30);
      } else {
        this.showErrTimeout = setTimeout(function () {
          _this.showRule = null;
        }, 350);
      }
    }
  },
  render: function render(h) {
    var $scopedSlots = this.$scopedSlots,
        $vxeform = this.$vxeform,
        title = this.title,
        folding = this.folding,
        visibleMethod = this.visibleMethod,
        field = this.field,
        collapseNode = this.collapseNode,
        itemRender = this.itemRender,
        isRequired = this.isRequired,
        showError = this.showError,
        showRule = this.showRule;
    var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;
    var span = this.span || $vxeform.span;
    var align = this.align || $vxeform.align;
    var titleAlign = this.titleAlign || $vxeform.titleAlign;
    var titleWidth = this.titleWidth || $vxeform.titleWidth;
    var collapseAll = $vxeform.collapseAll;
    var itemVisibleMethod = visibleMethod;

    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod;
    }

    return h('div', {
      class: ['vxe-form--item', span ? "vxe-col--".concat(span, " is--span") : null, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod({
          data: $vxeform.data,
          property: field,
          $form: $vxeform
        }),
        'is--error': showError
      }]
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null
    }, renderTitle(h, this)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, (compConf && compConf.renderItem ? compConf.renderItem.call(this, h, itemRender, {
      data: $vxeform.data,
      property: field,
      $form: $vxeform
    }, {
      $form: $vxeform
    }) : $scopedSlots.default ? $scopedSlots.default.call(this, {
      data: $vxeform.data,
      property: field,
      $form: $vxeform
    }) : []).concat([collapseNode ? h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: this.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.formFolding : _conf.default.icon.formUnfolding]
    })]) : null, showRule ? h('div', {
      class: 'vxe-form--item-valid',
      style: showRule.maxWidth ? {
        width: "".concat(showRule.maxWidth, "px")
      } : null
    }, showRule.message) : null]))])]);
  },
  methods: {
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      var $form = this.$vxeform;
      $form.$emit('toggle-collapse', {
        collapse: !$form.collapseAll,
        data: $form.data,
        $form: $form
      }, evnt);
      $form.toggleCollapse();
    }
  }
};
exports.default = _default;