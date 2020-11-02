"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Modal = exports.ModalController = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _modal = _interopRequireDefault(require("./src/modal"));

var _activities = _interopRequireDefault(require("./src/activities"));

var _vXETable = _interopRequireDefault(require("../v-x-e-table"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/* eslint-disable @typescript-eslint/no-use-before-define */
var ModalClass = null;

function openModal(opts) {
  var options = Object.assign({}, opts, {
    transfer: true
  });
  return new Promise(function (resolve) {
    if (options && options.id && _activities.default.some(function (comp) {
      return comp.id === options.id;
    })) {
      resolve('exist');
    } else {
      var events = options.events || {};
      options.events = Object.assign({}, events, {
        hide: function hide(params) {
          if (events.hide) {
            events.hide.call(this, params);
          }

          setTimeout(function () {
            return $modal.$destroy();
          }, $modal.isMsg ? 500 : 100);
          resolve(params.type);
        }
      });
      var $modal = new ModalClass({
        el: document.createElement('div'),
        propsData: options
      });
      setTimeout(function () {
        if ($modal.isDestroy) {
          $modal.close();
        } else {
          $modal.open();
        }
      });
    }
  });
}
/**
 * 全局关闭动态的活动窗口（只能用于关闭动态的创建的活动窗口）
 * 如果传 id 则关闭指定的窗口
 * 如果不传则关闭所有窗口
 */


function closeModal(id) {
  var modals = arguments.length ? [getModal(id)] : _activities.default;
  modals.forEach(function ($modal) {
    if ($modal) {
      $modal.isDestroy = true;
      $modal.close('close');
    }
  });
  return Promise.resolve();
}

function getModal(id) {
  return _ctor.default.find(_activities.default, function ($modal) {
    return $modal.id === id;
  });
}

var ModalController = {
  get: getModal,
  close: closeModal,
  open: openModal
};
exports.ModalController = ModalController;
var shortcutTypes = ['alert', 'confirm', 'message'];
shortcutTypes.forEach(function (type, index) {
  var defOpts = index === 2 ? {
    mask: false,
    lockView: false,
    showHeader: false
  } : {
    showFooter: true
  };
  defOpts.type = type;
  defOpts.dblclickZoom = false;

  if (index === 1) {
    defOpts.status = 'question';
  }

  ModalController[type] = function (message, title, options) {
    var opts;

    if (_ctor.default.isObject(message)) {
      opts = message;
    } else {
      if (title) {
        opts = index === 2 ? {
          status: title
        } : {
          title: title
        };
      }
    }

    return openModal(Object.assign({
      message: _ctor.default.toString(message),
      type: type
    }, defOpts, opts, options));
  };
});

_modal.default.install = function (Vue) {
  _vXETable.default._modal = 1;
  Vue.component(_modal.default.name, _modal.default);
  ModalClass = Vue.extend(_modal.default);
  _vXETable.default.modal = ModalController;

  if (!Vue.prototype.$vxe) {
    Vue.prototype.$vxe = {
      modal: ModalController
    };
  } else {
    Vue.prototype.$vxe.modal = ModalController;
  }
};

var Modal = _modal.default;
exports.Modal = Modal;
var _default = _modal.default;
exports.default = _default;