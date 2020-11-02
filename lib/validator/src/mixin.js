"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _tools = require("../../tools");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/**
 * 校验规则
 */
var Rule = /*#__PURE__*/function () {
  function Rule(rule) {
    _classCallCheck(this, Rule);

    Object.assign(this, {
      $options: rule,
      required: rule.required,
      min: rule.min,
      max: rule.max,
      type: rule.type,
      pattern: rule.pattern,
      validator: rule.validator,
      trigger: rule.trigger,
      maxWidth: rule.maxWidth
    });
  }
  /**
   * 获取校验不通过的消息
   * 支持国际化翻译
   */


  _createClass(Rule, [{
    key: "message",
    get: function get() {
      return _tools.UtilTools.getFuncText(this.$options.message);
    }
  }]);

  return Rule;
}();

var _default = {
  methods: {
    /**
     * 完整校验，和 validate 的区别就是会给有效数据中的每一行进行校验
     */
    _fullValidate: function _fullValidate(rows, cb) {
      return this.beginValidate(rows, cb, true);
    },

    /**
     * 快速校验，如果存在记录不通过的记录，则返回不再继续校验（异步校验除外）
     */
    _validate: function _validate(rows, cb) {
      return this.beginValidate(rows, cb);
    },

    /**
     * 聚焦到校验通过的单元格并弹出校验错误提示
     */
    handleValidError: function handleValidError(params) {
      var _this = this;

      if (this.validOpts.autoPos === false) {
        this.emitEvent('valid-error', params);
      } else {
        this.handleActived(params, {
          type: 'valid-error',
          trigger: 'call'
        }).then(function () {
          return setTimeout(function () {
            return _this.showValidTooltip(params);
          }, 10);
        });
      }
    },

    /**
     * 对表格数据进行校验
     * 如果不指定数据，则默认只校验临时变动的数据，例如新增或修改
     * 如果传 true 则校验当前表格数据
     * 如果传 row 指定行记录，则只验证传入的行
     * 如果传 rows 为多行记录，则只验证传入的行
     * 如果只传 callback 否则默认验证整个表格数据
     * 返回 Promise 对象，或者使用回调方式
     */
    beginValidate: function beginValidate(rows, cb, isFull) {
      var _this2 = this;

      var validRest = {};
      var editRules = this.editRules,
          afterFullData = this.afterFullData,
          treeConfig = this.treeConfig,
          treeOpts = this.treeOpts;
      var vaildDatas;

      if (rows === true) {
        vaildDatas = afterFullData;
      } else if (rows) {
        if (_ctor.default.isFunction(rows)) {
          cb = rows;
        } else {
          vaildDatas = _ctor.default.isArray(rows) ? rows : [rows];
        }
      }

      if (!vaildDatas) {
        vaildDatas = this.getInsertRecords().concat(this.getUpdateRecords());
      }

      var rowValids = [];
      this.lastCallTime = Date.now();
      this.validRuleErr = false; // 如果为快速校验，当存在某列校验不通过时将终止执行

      this.clearValidate();

      if (editRules) {
        var columns = this.getColumns();

        var handleVaild = function handleVaild(row) {
          if (isFull || !_this2.validRuleErr) {
            var colVailds = [];
            columns.forEach(function (column) {
              if ((isFull || !_this2.validRuleErr) && _ctor.default.has(editRules, column.property)) {
                colVailds.push(_this2.validCellRules('all', row, column).catch(function (_ref) {
                  var rule = _ref.rule,
                      rules = _ref.rules;
                  var rest = {
                    rule: rule,
                    rules: rules,
                    rowIndex: _this2.getRowIndex(row),
                    row: row,
                    columnIndex: _this2.getColumnIndex(column),
                    column: column,
                    $table: _this2
                  };

                  if (!validRest[column.property]) {
                    validRest[column.property] = [];
                  }

                  validRest[column.property].push(rest);

                  if (!isFull) {
                    _this2.validRuleErr = true;
                    return Promise.reject(rest);
                  }
                }));
              }
            });
            rowValids.push(Promise.all(colVailds));
          }
        };

        if (treeConfig) {
          _ctor.default.eachTree(vaildDatas, handleVaild, treeOpts);
        } else {
          vaildDatas.forEach(handleVaild);
        }

        return Promise.all(rowValids).then(function () {
          var ruleProps = Object.keys(validRest);

          if (ruleProps.length) {
            return Promise.reject(validRest[ruleProps[0]][0]);
          }

          if (cb) {
            cb();
          }
        }).catch(function (firstErrParams) {
          return new Promise(function (resolve, reject) {
            var finish = function finish() {
              if (cb) {
                cb(validRest);
                resolve();
              } else {
                reject(validRest);
              }
            };

            var posAndFinish = function posAndFinish() {
              firstErrParams.cell = _this2.getCell(firstErrParams.row, firstErrParams.column);

              _tools.DomTools.toView(firstErrParams.cell);

              _this2.handleValidError(firstErrParams);

              finish();
            };
            /**
             * 当校验不通过时
             * 将表格滚动到可视区
             * 由于提示信息至少需要占一行，定位向上偏移一行
             */


            var row = firstErrParams.row;
            var rowIndex = afterFullData.indexOf(row);
            var locatRow = rowIndex > 0 ? afterFullData[rowIndex - 1] : row;

            if (_this2.validOpts.autoPos === false) {
              finish();
            } else {
              if (treeConfig) {
                _this2.scrollToTreeRow(locatRow).then(posAndFinish);
              } else {
                _this2.scrollToRow(locatRow).then(posAndFinish);
              }
            }
          });
        });
      }

      if (cb) {
        cb();
      }

      return Promise.resolve();
    },
    hasCellRules: function hasCellRules(type, row, column) {
      var editRules = this.editRules;
      var property = column.property;

      if (property && editRules) {
        var rules = _ctor.default.get(editRules, property);

        return rules && _ctor.default.find(rules, function (rule) {
          return type === 'all' || !rule.trigger || type === rule.trigger;
        });
      }

      return false;
    },

    /**
     * 校验数据
     * 按表格行、列顺序依次校验（同步或异步）
     * 校验规则根据索引顺序依次校验，如果是异步则会等待校验完成才会继续校验下一列
     * 如果校验失败则，触发回调或者Promise<不通过列的错误消息>
     * 如果是传回调方式这返回一个校验不通过列的错误消息
     *
     * rule 配置：
     *  required=Boolean 是否必填
     *  min=Number 最小长度
     *  max=Number 最大长度
     *  validator=Function({ cellValue, rule, rules, row, column, rowIndex, columnIndex }) 自定义校验，接收一个 Promise
     *  trigger=blur|change 触发方式（除非特殊场景，否则默认为空就行）
     */
    validCellRules: function validCellRules(type, row, column, val) {
      var _this3 = this;

      var editRules = this.editRules;
      var property = column.property;
      var errorRules = [];
      var syncVailds = [];

      if (property && editRules) {
        var rules = _ctor.default.get(editRules, property);

        if (rules) {
          var cellValue = _ctor.default.isUndefined(val) ? _ctor.default.get(row, property) : val;
          rules.forEach(function (rule) {
            if (type === 'all' || !rule.trigger || type === rule.trigger) {
              if (_ctor.default.isFunction(rule.validator)) {
                var customValid = rule.validator({
                  cellValue: cellValue,
                  rule: rule,
                  rules: rules,
                  row: row,
                  rowIndex: _this3.getRowIndex(row),
                  column: column,
                  columnIndex: _this3.getColumnIndex(column),
                  $table: _this3
                });

                if (customValid) {
                  if (_ctor.default.isError(customValid)) {
                    _this3.validRuleErr = true;
                    errorRules.push(new Rule({
                      type: 'custom',
                      trigger: rule.trigger,
                      message: customValid.message,
                      rule: new Rule(rule)
                    }));
                  } else if (customValid.catch) {
                    // 如果为异步校验（注：异步校验是并发无序的）
                    syncVailds.push(customValid.catch(function (e) {
                      _this3.validRuleErr = true;
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
                var numVal = isNumber ? _ctor.default.toNumber(cellValue) : _ctor.default.getSize(cellValue);

                if (rule.required && (cellValue === null || cellValue === undefined || cellValue === '')) {
                  _this3.validRuleErr = true;
                  errorRules.push(new Rule(rule));
                } else if (isNumber && isNaN(cellValue) || !isNaN(rule.min) && numVal < parseFloat(rule.min) || !isNaN(rule.max) && numVal > parseFloat(rule.max) || rule.pattern && !(rule.pattern.test ? rule.pattern : new RegExp(rule.pattern)).test(cellValue)) {
                  _this3.validRuleErr = true;
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
    _clearValidate: function _clearValidate() {
      var validTip = this.$refs.validTip;
      Object.assign(this.validStore, {
        visible: false,
        row: null,
        column: null,
        content: '',
        rule: null
      });

      if (validTip && validTip.visible) {
        validTip.close();
      }

      return this.$nextTick();
    },

    /**
     * 触发校验
     */
    triggerValidate: function triggerValidate(type) {
      var _this4 = this;

      var editConfig = this.editConfig,
          editStore = this.editStore,
          editRules = this.editRules,
          validStore = this.validStore;
      var actived = editStore.actived;

      if (actived.row && editRules) {
        var _actived$args = actived.args,
            row = _actived$args.row,
            column = _actived$args.column,
            cell = _actived$args.cell;

        if (this.hasCellRules(type, row, column)) {
          return this.validCellRules(type, row, column).then(function () {
            if (editConfig.mode === 'row') {
              if (validStore.visible && validStore.row === row && validStore.column === column) {
                _this4.clearValidate();
              }
            }
          }).catch(function (_ref2) {
            var rule = _ref2.rule;

            // 如果校验不通过与触发方式一致，则聚焦提示错误，否则跳过并不作任何处理
            if (!rule.trigger || type === rule.trigger) {
              var rest = {
                rule: rule,
                row: row,
                column: column,
                cell: cell
              };

              _this4.showValidTooltip(rest);

              return Promise.reject(rest);
            }

            return Promise.resolve();
          });
        }
      }

      return Promise.resolve();
    },

    /**
     * 弹出校验错误提示
     */
    showValidTooltip: function showValidTooltip(params) {
      var _this5 = this;

      var $refs = this.$refs,
          height = this.height,
          tableData = this.tableData,
          validOpts = this.validOpts;
      var rule = params.rule,
          row = params.row,
          column = params.column,
          cell = params.cell;
      var validTip = $refs.validTip;
      var content = rule.message;
      this.$nextTick(function () {
        Object.assign(_this5.validStore, {
          row: row,
          column: column,
          rule: rule,
          content: content,
          visible: true
        });

        if (validTip && (validOpts.message === 'tooltip' || validOpts.message === 'default' && !height && tableData.length < 2)) {
          validTip.toVisible(cell, content);
        }

        _this5.emitEvent('valid-error', params);
      });
    }
  }
};
exports.default = _default;