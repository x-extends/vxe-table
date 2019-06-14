"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.MessageBox = MessageBox;
exports.default = void 0;

var _message = _interopRequireDefault(require("./src/message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var AlertController = null;

function MessageBox(options) {
  return new Promise(function (resolve, reject) {
    var $alert = new AlertController({
      el: document.createElement('div'),
      propsData: options
    });

    $alert._handleCustom = function (type) {
      $alert.$destroy();

      if (type === 'confirm') {
        resolve(type);
      } else {
        reject(type);
      }
    };

    setTimeout(function () {
      return $alert.open();
    });
  });
}

['alert', 'confirm'].forEach(function (type) {
  MessageBox[type] = function (message, title, options) {
    var opts = {
      message: message,
      type: type
    };

    if (typeof message === 'string') {
      if (title) {
        opts.title = title;
      }
    } else {
      opts = message;
    }

    return MessageBox(Object.assign({}, opts, options));
  };
});

MessageBox.install = function (Vue) {
  AlertController = Vue.extend(_message.default);
  Vue.prototype.$XMsg = MessageBox;
};

var _default = MessageBox;
exports.default = _default;