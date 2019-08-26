"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Modal = Modal;
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _modal = _interopRequireDefault(require("./src/modal"));

var _queue = _interopRequireDefault(require("./src/queue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertController = null;

function Modal(options) {
  return new Promise(function (resolve) {
    if (options && options.id && _queue.default.some(function (comp) {
      return comp.id === options.id;
    })) {
      resolve('exist');
    } else {
      var $alert = new AlertController({
        el: document.createElement('div'),
        propsData: options
      });

      $alert._handleCustom = function (type) {
        $alert.$destroy();
        resolve(type);
      };

      setTimeout(function () {
        return $alert.open();
      });
    }
  });
}

['alert', 'confirm', 'message'].forEach(function (type, index) {
  var defOpts = index === 2 ? {
    mask: false,
    lockView: false
  } : {};
  defOpts.type = type;

  if (index === 1) {
    defOpts.status = 'question';
  }

  Modal[type] = function (message, title, options) {
    var opts;

    if (_xeUtils.default.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = {
          title: title
        };
      }
    }

    return Modal(Object.assign({
      message: _xeUtils.default.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

Modal.install = function (Vue) {
  Vue.component('vxe-message', _modal.default);
  Vue.component(_modal.default.name, _modal.default);
  AlertController = Vue.extend(_modal.default);
  Vue.prototype.$XMsg = Modal;
  Vue.prototype.$XModal = Modal;
};

var _default = Modal;
exports.default = _default;