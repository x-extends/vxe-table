"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Message = Message;
exports.default = void 0;

var _xeUtils = _interopRequireDefault(require("xe-utils"));

var _message = _interopRequireDefault(require("./src/message"));

var _msgQueue = _interopRequireDefault(require("./src/msgQueue"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertController = null;

function Message(options) {
  return new Promise(function (resolve, reject) {
    if (options && options.id && _msgQueue.default.some(function (comp) {
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

        if (type === 'confirm' || options.type === 'message') {
          resolve(type);
        } else {
          reject(type);
        }
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
    lockView: false,
    lockScroll: false
  } : {};
  defOpts.type = type;

  if (index === 1) {
    defOpts.status = 'question';
  }

  Message[type] = function (message, title, options) {
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

    return Message(Object.assign({
      message: _xeUtils.default.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

Message.install = function (Vue) {
  AlertController = Vue.extend(_message.default);
  Vue.prototype.$XMsg = Message;
};

var _default = Message;
exports.default = _default;