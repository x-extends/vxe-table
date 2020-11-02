"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _conf = _interopRequireDefault(require("../../conf"));

var _size = _interopRequireDefault(require("../../mixins/size"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

var _util = require("./util");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.min,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }

  _createClass(Rule, [{
    key: "message",
    get: function get() {
      return _tools.UtilTools.getFuncText(this.$options.message);
    }
  }]);

  return Rule;
}();

function getResetValue(value, resetValue) {
  if (_ctor.default.isArray(value)) {
    resetValue = [];
  }

  return resetValue;
}

function renderPrefixIcon(h, titlePrefix) {
  return h('span', {
    class: 'vxe-form--item-title-prefix'
  }, [h('i', {
    class: titlePrefix.icon || _conf.default.icon.FORM_PREFIX
  })]);
}

function renderSuffixIcon(h, titleSuffix) {
  return h('span', {
    class: 'vxe-form--item-title-suffix'
  }, [h('i', {
    class: titleSuffix.icon || _conf.default.icon.FORM_SUFFIX
  })]);
}

function renderTitle(h, _vm, item) {
  var titlePrefix = item.titlePrefix,
      titleSuffix = item.titleSuffix;
  var tss = [];

  if (titlePrefix) {
    tss.push(titlePrefix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titlePrefix.message),
        enterable: titlePrefix.enterable,
        theme: titlePrefix.theme
      }
    }, [renderPrefixIcon(h, titlePrefix)]) : renderPrefixIcon(h, titlePrefix));
  }

  tss.push(h('span', {
    class: 'vxe-form--item-title-label'
  }, _tools.UtilTools.getFuncText(item.title)));

  if (titleSuffix) {
    tss.push(titleSuffix.message ? h('vxe-tooltip', {
      props: {
        content: _tools.UtilTools.getFuncText(titleSuffix.message),
        enterable: titleSuffix.enterable,
        theme: titleSuffix.theme
      }
    }, [renderSuffixIcon(h, titleSuffix)]) : renderSuffixIcon(h, titleSuffix));
  }

  return tss;
}

function renderItems(h, _vm) {
  var rules = _vm.rules,
      formItems = _vm.formItems,
      data = _vm.data,
      collapseAll = _vm.collapseAll;
  return formItems.map(function (item, index) {
    var slots = item.slots,
        title = item.title,
        folding = item.folding,
        visibleMethod = item.visibleMethod,
        field = item.field,
        collapseNode = item.collapseNode,
        itemRender = item.itemRender,
        showError = item.showError,
        errRule = item.errRule;
    var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;
    var span = item.span || _vm.span;
    var align = item.align || _vm.align;
    var titleAlign = item.titleAlign || _vm.titleAlign;
    var titleWidth = item.titleWidth || _vm.titleWidth;
    var itemVisibleMethod = visibleMethod;
    var params = {
      data: data,
      property: field,
      $form: _vm
    };

    if (!itemVisibleMethod && compConf && compConf.itemVisibleMethod) {
      itemVisibleMethod = compConf.itemVisibleMethod;
    }

    var isRequired;

    if (rules) {
      var itemRules = rules[field];

      if (itemRules) {
        isRequired = itemRules.some(function (rule) {
          return rule.required;
        });
      }
    }

    return h('div', {
      class: ['vxe-form--item', item.id, span ? "vxe-col--".concat(span, " is--span") : null, {
        'is--title': title,
        'is--required': isRequired,
        'is--hidden': folding && collapseAll,
        'is--active': !itemVisibleMethod || itemVisibleMethod(params),
        'is--error': showError
      }],
      key: index
    }, [h('div', {
      class: 'vxe-form--item-inner'
    }, [title ? h('div', {
      class: ['vxe-form--item-title', titleAlign ? "align--".concat(titleAlign) : null],
      style: titleWidth ? {
        width: isNaN(titleWidth) ? titleWidth : "".concat(titleWidth, "px")
      } : null
    }, renderTitle(h, _vm, item)) : null, h('div', {
      class: ['vxe-form--item-content', align ? "align--".concat(align) : null]
    }, (compConf && compConf.renderItem ? compConf.renderItem.call(_vm, h, itemRender, params) : slots && slots.default ? slots.default.call(_vm, params, h) : []).concat([collapseNode ? h('div', {
      class: 'vxe-form--item-trigger-node',
      on: {
        click: _vm.toggleCollapseEvent
      }
    }, [h('span', {
      class: 'vxe-form--item-trigger-text'
    }, collapseAll ? _conf.default.i18n('vxe.form.unfolding') : _conf.default.i18n('vxe.form.folding')), h('i', {
      class: ['vxe-form--item-trigger-icon', collapseAll ? _conf.default.icon.FORM_FOLDING : _conf.default.icon.FORM_UNFOLDING]
    })]) : null, errRule ? h('div', {
      class: 'vxe-form--item-valid',
      style: errRule.maxWidth ? {
        width: "".concat(errRule.maxWidth, "px")
      } : null
    }, errRule.message) : null]))])]);
  });
}

var _default2 = {
  name: 'VxeForm',
  mixins: [_size.default],
  props: {
    loading: Boolean,
    data: Object,
    size: {
      type: String,
      default: function _default() {
        return _conf.default.form.size || _conf.default.size;
      }
    },
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    titleColon: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.titleColon;
      }
    },
    titleAsterisk: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.titleAsterisk;
      }
    },
    items: Array,
    rules: Object,
    preventSubmit: {
      type: Boolean,
      default: function _default() {
        return _conf.default.form.preventSubmit;
      }
    },
    validConfig: Object
  },
  data: function data() {
    return {
      collapseAll: true,
      collectItem: [],
      formItems: []
    };
  },
  provide: function provide() {
    return {
      $xeform: this
    };
  },
  computed: {
    validOpts: function validOpts() {
      return Object.assign({}, _conf.default.form.validConfig, this.validConfig);
    }
  },
  created: function created() {
    var items = this.items;

    if (items) {
      this.loadItem(items);
    }
  },
  watch: {
    collectItem: function collectItem(value) {
      this.formItems = value;
    },
    items: function items(value) {
      this.loadItem(value);
    }
  },
  render: function render(h) {
    var _ref;

    var loading = this.loading,
        vSize = this.vSize;
    return h('form', {
      class: ['vxe-form', 'vxe-row', (_ref = {}, _defineProperty(_ref, "size--".concat(vSize), vSize), _defineProperty(_ref, 'is--colon', this.titleColon), _defineProperty(_ref, 'is--asterisk', this.titleAsterisk), _defineProperty(_ref, 'is--loading', loading), _ref)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, renderItems(h, this).concat([h('div', {
      class: 'vxe-form-slots',
      ref: 'hideItem'
    }, this.$slots.default), h('div', {
      class: ['vxe-loading', {
        'is--visible': loading
      }]
    }, [h('div', {
      class: 'vxe-loading--spinner'
    })])]));
  },
  methods: {
    loadItem: function loadItem(list) {
      var _this = this;

      var $scopedSlots = this.$scopedSlots;
      list.forEach(function (item) {
        if (item.slots) {
          _ctor.default.each(item.slots, function (func, name, slots) {
            if (!_ctor.default.isFunction(func)) {
              if ($scopedSlots[func]) {
                slots[name] = $scopedSlots[func];
              } else {
                slots[name] = null;

                _tools.UtilTools.error('vxe.error.notSlot', [func]);
              }
            }
          });
        }
      });
      this.collectItem = list.map(function (item) {
        return (0, _util.createItem)(_this, item);
      });
      return this.$nextTick();
    },
    getItems: function getItems() {
      return this.formItems.slice(0);
    },
    toggleCollapse: function toggleCollapse() {
      this.collapseAll = !this.collapseAll;
      return this.$nextTick();
    },
    toggleCollapseEvent: function toggleCollapseEvent(evnt) {
      this.toggleCollapse();
      this.$emit('toggle-collapse', {
        collapse: !this.collapseAll,
        data: this.data,
        $form: this,
        $event: evnt
      }, evnt);
    },
    submitEvent: function submitEvent(evnt) {
      var _this2 = this;

      evnt.preventDefault();

      if (!this.preventSubmit) {
        this.beginValidate().then(function () {
          _this2.$emit('submit', {
            data: _this2.data,
            $form: _this2,
            $event: evnt
          });
        }).catch(function (errMap) {
          _this2.$emit('submit-invalid', {
            data: _this2.data,
            errMap: errMap,
            $form: _this2,
            $event: evnt
          });
        });
      }
    },
    reset: function reset() {
      var _this3 = this;

      var data = this.data,
          formItems = this.formItems;

      if (data) {
        formItems.forEach(function (item) {
          var field = item.field,
              resetValue = item.resetValue,
              itemRender = item.itemRender;

          if (field) {
            _ctor.default.set(data, field, resetValue === null ? getResetValue(_ctor.default.get(data, field), undefined) : resetValue);

            var compConf = itemRender ? _vXETable.default.renderer.get(itemRender.name) : null;

            if (compConf && compConf.itemResetMethod) {
              compConf.itemResetMethod({
                data: data,
                property: field,
                $form: _this3
              });
            }
          }
        });
      }

      return this.clearValidate();
    },
    resetEvent: function resetEvent(evnt) {
      evnt.preventDefault();
      this.reset();
      this.$emit('reset', {
        data: this.this,
        $form: this,
        $event: evnt
      });
    },
    clearValidate: function clearValidate(field) {
      var formItems = this.formItems;

      if (field) {
        var item = formItems.find(function (item) {
          return item.field === field;
        });

        if (item) {
          item.showError = false;
        }
      } else {
        formItems.forEach(function (item) {
          item.showError = false;
        });
      }

      return this.$nextTick();
    },
    validate: function validate(callback) {
      return this.beginValidate(callback);
    },
    beginValidate: function beginValidate(type, callback) {
      var _this4 = this;

      var data = this.data,
          formRules = this.rules,
          formItems = this.formItems,
          validOpts = this.validOpts;
      var validRest = {};
      var validFields = [];
      var itemValids = [];
      this.clearValidate();
      clearTimeout(this.showErrTime);

      if (data && formRules) {
        formItems.forEach(function (item) {
          var field = item.field;

          if (field) {
            itemValids.push(_this4.validItemRules(type || 'all', field).then(function () {
              item.errRule = null;
            }).catch(function (_ref2) {
              var rule = _ref2.rule,
                  rules = _ref2.rules;
              var rest = {
                rule: rule,
                rules: rules,
                data: data,
                property: field,
                $form: _this4
              };

              if (!validRest[field]) {
                validRest[field] = [];
              }

              validRest[field].push(rest);
              validFields.push(field);
              item.errRule = rule;
              return Promise.reject(rest);
            }));
          }
        });
        return Promise.all(itemValids).then(function () {
          if (callback) {
            callback();
          }
        }).catch(function () {
          _this4.showErrTime = setTimeout(function () {
            formItems.forEach(function (item) {
              if (item.errRule) {
                item.showError = true;
              }
            });
          }, 20);

          if (callback) {
            callback(validRest);
          }

          if (validOpts.autoPos !== false) {
            _this4.$nextTick(function () {
              _this4.handleFocus(validFields);
            });
          }

          return Promise.reject(validRest);
        });
      }

      if (callback) {
        callback();
      }

      return Promise.resolve();
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者 Promise<(ErrMap 校验不通过列的信息)>
     * 如果是传回调方式这返回一个 (ErrMap 校验不通过列的信息)
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ itemValue, rule, rules, data, property }) 自定义校验，接收一个 Promise
     *  trigger=change 触发方式
     */
    validItemRules: function validItemRules(type, property, val) {
      var _this5 = this;

      var data = this.data,
          formRules = this.rules;
      var errorRules = [];
      var syncVailds = [];

      if (property && formRules) {
        var rules = _ctor.default.get(formRules, property);

        if (rules) {
          var itemValue = _ctor.default.isUndefined(val) ? _ctor.default.get(data, property) : val;
          rules.forEach(function (rule) {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
              if (_ctor.default.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  itemValue: itemValue,
                  rule: rule,
                  rules: rules,
                  data: data,
                  property: property,
                  $form: _this5
                });

                if (customValid) {
                  if (_ctor.default.isError(customValid)) {
                    errorRules.push(new Rule({
                      type: 'custom',
                      trigger: rule.trigger,
                      message: customValid.message,
                      rule: new Rule(rule)
                    }));
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(customValid.catch(function (e) {
                      errorRules.push(new Rule({
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e ? e.message : rule.message,
                        rule: new Rule(rule)
                      }));
                    }));
                  }
                }
              } else {
                var isNumber = rule.type === 'number';
                var numVal = isNumber ? _ctor.default.toNumber(itemValue) : _ctor.default.getSize(itemValue);

                if (itemValue === null || itemValue === undefined || itemValue === '') {
                  if (rule.required) {
                    errorRules.push(new Rule(rule));
                  }
                } else if (isNumber && isNaN(itemValue) || !isNaN(rule.min) && numVal < parseFloat(rule.min) || !isNaN(rule.max) && numVal > parseFloat(rule.max) || rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue)) {
                  errorRules.push(new Rule(rule));
                }
              }
            }
          });
        }
      }

      return Promise.all(syncVailds).then(function () {
        if (errorRules.length) {
          var rest = {
            rules: errorRules,
            rule: errorRules[0]
          };
          return Promise.reject(rest);
        }
      });
    },
    handleFocus: function handleFocus(fields) {
      var $el = this.$el,
          formItems = this.formItems;
      fields.some(function (property) {
        var item = formItems.find(function (item) {
          return item.field === property;
        });

        if (item && item.itemRender) {
          var itemRender = item.itemRender;

          var compConf = _vXETable.default.renderer.get(itemRender.name);

          var inputElem; // 如果指定了聚焦 class

          if (itemRender.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(itemRender.autofocus));
          } // 渲染器的聚焦处理


          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(".".concat(item.id, " ").concat(compConf.autofocus));
          }

          if (inputElem) {
            inputElem.focus(); // 保持一致行为，光标移到末端

            if (_tools.DomTools.browse.msie) {
              var textRange = inputElem.createTextRange();
              textRange.collapse(false);
              textRange.select();
            }

            return true;
          }
        }
      });
    },

    /**
     * 更新项状态
     * 如果组件值 v-model 发生 change 时，调用改函数用于更新某一项编辑状态
     * 如果单元格配置了校验规则，则会进行校验
     */
    updateStatus: function updateStatus(scope, itemValue) {
      var _this6 = this;

      var property = scope.property;

      if (property) {
        this.validItemRules('change', property, itemValue).then(function () {
          _this6.clearValidate(property);
        }).catch(function (_ref3) {
          var rule = _ref3.rule;

          var item = _this6.formItems.find(function (item) {
            return item.field === property;
          });

          if (item) {
            item.showError = true;
            item.errRule = rule;
          }
        });
      }
    }
  }
};
exports.default = _default2;