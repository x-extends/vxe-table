"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _vXETable = _interopRequireDefault(require("../../v-x-e-table"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Rule =
/*#__PURE__*/
function () {
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
  if (_xeUtils.default.isString(value)) {
    resetValue = '';
  } else if (_xeUtils.default.isArray(value)) {
    resetValue = [];
  } else if (_xeUtils.default.isBoolean(value)) {
    resetValue = false;
  }

  return resetValue;
}

var _default = {
  name: 'VxeForm',
  props: {
    data: Object,
    size: String,
    span: [String, Number],
    align: String,
    titleAlign: String,
    titleWidth: [String, Number],
    rules: Object
  },
  data: function data() {
    return {
      collapseAll: true,
      invalids: []
    };
  },
  provide: function provide() {
    return {
      $vxeform: this
    };
  },
  computed: {
    vSize: function vSize() {
      return this.size || this.$parent.size || this.$parent.vSize;
    }
  },
  render: function render(h) {
    return h('form', {
      class: ['vxe-form', 'vxe-row', _defineProperty({}, "size--".concat(this.vSize), this.vSize)],
      on: {
        submit: this.submitEvent,
        reset: this.resetEvent
      }
    }, this.$slots.default);
  },
  methods: {
    toggleCollapse: function toggleCollapse() {
      this.collapseAll = !this.collapseAll;
      return this.$nextTick();
    },
    submitEvent: function submitEvent(evnt) {
      var _this = this;

      evnt.preventDefault();
      this.beginValidate().then(function () {
        _this.$emit('submit', {
          data: _this.data,
          $form: _this
        }, evnt);
      }).catch(function (errMap) {
        _this.$emit('submit-invalid', errMap, evnt);
      });
    },
    resetEvent: function resetEvent(evnt) {
      evnt.preventDefault();
      var data = this.data;

      if (data) {
        this.$children.forEach(function (_ref2) {
          var field = _ref2.field,
              resetValue = _ref2.resetValue;

          if (field) {
            _xeUtils.default.set(data, field, resetValue === null ? getResetValue(_xeUtils.default.get(data, field), resetValue) : resetValue);
          }
        });
      }

      this.clearValidate();
      this.$emit('reset', {
        data: data,
        $form: this
      }, evnt);
    },
    clearValidate: function clearValidate(field) {
      if (field) {
        _xeUtils.default.remove(this.invalids, function (_ref3) {
          var property = _ref3.property;
          return property === field;
        });
      } else {
        this.invalids = [];
      }

      return this.$nextTick();
    },
    validate: function validate(callback) {
      return this.beginValidate(callback);
    },
    beginValidate: function beginValidate(type, callback) {
      var _this2 = this;

      var data = this.data,
          formRules = this.rules;
      var validRest = {};
      var validFields = [];
      var itemValids = [];
      var status = true;
      this.clearValidate();

      if (data && formRules) {
        this.$children.forEach(function (_ref4) {
          var field = _ref4.field;

          if (field) {
            itemValids.push(new Promise(function (resolve, reject) {
              _this2.validItemRules(type || 'all', field).then(resolve).catch(function (_ref5) {
                var rule = _ref5.rule,
                    rules = _ref5.rules;
                var rest = {
                  rule: rule,
                  rules: rules,
                  property: field
                };

                if (!validRest[field]) {
                  validRest[field] = [];
                }

                validRest[field].push(rest);
                validFields.push(field);

                _this2.invalids.push(rest);

                return reject(rest);
              });
            }));
          }
        });
        return Promise.all(itemValids).then(function () {
          if (callback) {
            callback(status);
          }
        }).catch(function () {
          status = false;

          if (callback) {
            callback(status, validRest);
          }

          _this2.$nextTick(function () {
            _this2.handleFocus(validFields);
          });

          return Promise.reject(validRest);
        });
      }

      if (callback) {
        callback(status);
      }

      return Promise.resolve();
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise，结果返回一个 Boolean 值
     * 如果是传回调方式这返回一个 Boolean 值和校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function(rule, value, callback, {rules, property}) 自定义校验
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validItemRules: function validItemRules(type, property, val) {
      var data = this.data,
          formRules = this.rules;
      var errorRules = [];
      var itemVailds = [];

      if (property && formRules) {
        var rules = _xeUtils.default.get(formRules, property);

        if (rules) {
          var itemValue = _xeUtils.default.isUndefined(val) ? _xeUtils.default.get(data, property) : val;
          rules.forEach(function (rule) {
            itemVailds.push(new Promise(function (resolve) {
              if (type === 'all' || !rule.trigger || type === rule.trigger) {
                if (_xeUtils.default.isFunction(rule.validator)) {
                  rule.validator(rule, itemValue, function (e) {
                    if (_xeUtils.default.isError(e)) {
                      var cusRule = {
                        type: 'custom',
                        trigger: rule.trigger,
                        message: e.message,
                        rule: new Rule(rule)
                      };
                      errorRules.push(new Rule(cusRule));
                    }

                    return resolve();
                  }, {
                    rules: rules,
                    property: property
                  });
                } else {
                  var isNumber = rule.type === 'number';
                  var numVal = isNumber ? _xeUtils.default.toNumber(itemValue) : _xeUtils.default.getSize(itemValue);

                  if (itemValue === null || itemValue === undefined || itemValue === '') {
                    if (rule.required) {
                      errorRules.push(new Rule(rule));
                    }
                  } else if (isNumber && isNaN(itemValue) || !isNaN(rule.min) && numVal < parseFloat(rule.min) || !isNaN(rule.max) && numVal > parseFloat(rule.max) || rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(itemValue)) {
                    errorRules.push(new Rule(rule));
                  }

                  resolve();
                }
              } else {
                resolve();
              }
            }));
          });
        }
      }

      return Promise.all(itemVailds).then(function () {
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
      var $children = this.$children;
      fields.some(function (property) {
        var comp = $children.find(function (item) {
          return item.field === property;
        });

        if (comp && comp.itemRender) {
          var $el = comp.$el,
              itemRender = comp.itemRender;

          var compConf = _vXETable.default.renderer.get(itemRender.name);

          var inputElem; // 如果指定了聚焦 class

          if (itemRender.autofocus) {
            inputElem = $el.querySelector(itemRender.autofocus);
          } // 渲染器的聚焦处理


          if (!inputElem && compConf && compConf.autofocus) {
            inputElem = $el.querySelector(compConf.autofocus);
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
      var _this3 = this;

      var property = scope.property;

      if (property) {
        this.validItemRules('change', property, itemValue).then(function () {
          _this3.clearValidate(property);
        }).catch(function (_ref6) {
          var rule = _ref6.rule,
              rules = _ref6.rules;

          var rest = _this3.invalids.find(function (rest) {
            return rest.property === property;
          });

          if (rest) {
            rest.rule = rule;
            rest.rules = rules;
          } else {
            _this3.invalids.push({
              rule: rule,
              rules: rules,
              property: property
            });
          }
        });
      }
    }
  }
};
exports.default = _default;