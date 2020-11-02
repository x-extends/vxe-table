"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DomTools = void 0;

var _ctor = _interopRequireDefault(require("xe-utils/ctor"));

var _utils = _interopRequireDefault(require("./utils"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getRowid = _utils.default.getRowid;

var browse = _ctor.default.browse();

var htmlElem = browse.isDoc ? document.querySelector('html') : 0;
var bodyElem = browse.isDoc ? document.body : 0;
var reClsMap = {};

function getClsRE(cls) {
  if (!reClsMap[cls]) {
    reClsMap[cls] = new RegExp("(?:^|\\s)".concat(cls, "(?!\\S)"), 'g');
  }

  return reClsMap[cls];
}

function getNodeOffset(elem, container, rest) {
  if (elem) {
    var parentElem = elem.parentNode;
    rest.top += elem.offsetTop;
    rest.left += elem.offsetLeft;

    if (parentElem && parentElem !== htmlElem && parentElem !== bodyElem) {
      rest.top -= parentElem.scrollTop;
      rest.left -= parentElem.scrollLeft;
    }

    if (container && (elem === container || elem.offsetParent === container) ? 0 : elem.offsetParent) {
      return getNodeOffset(elem.offsetParent, container, rest);
    }
  }

  return rest;
}

function isScale(val) {
  return val && /^\d+%$/.test(val);
}

function hasClass(elem, cls) {
  return elem && elem.className && elem.className.match && elem.className.match(getClsRE(cls));
}

function removeClass(elem, cls) {
  if (elem && hasClass(elem, cls)) {
    elem.className = elem.className.replace(getClsRE(cls), '');
  }
}

function getDomNode() {
  var documentElement = document.documentElement;
  var bodyElem = document.body;
  return {
    scrollTop: documentElement.scrollTop || bodyElem.scrollTop,
    scrollLeft: documentElement.scrollLeft || bodyElem.scrollLeft,
    visibleHeight: documentElement.clientHeight || bodyElem.clientHeight,
    visibleWidth: documentElement.clientWidth || bodyElem.clientWidth
  };
}

var DomTools = {
  browse: browse,
  isPx: function isPx(val) {
    return val && /^\d+(px)?$/.test(val);
  },
  isScale: isScale,
  hasClass: hasClass,
  removeClass: removeClass,
  addClass: function addClass(elem, cls) {
    if (elem && !hasClass(elem, cls)) {
      removeClass(elem, cls);
      elem.className = "".concat(elem.className, " ").concat(cls);
    }
  },
  updateCellTitle: function updateCellTitle(overflowElem, column) {
    var content = column.type === 'html' ? overflowElem.innerText : overflowElem.textContent;

    if (overflowElem.getAttribute('title') !== content) {
      overflowElem.setAttribute('title', content);
    }
  },
  rowToVisible: function rowToVisible($xetable, row) {
    var bodyElem = $xetable.$refs.tableBody.$el;
    var trElem = bodyElem.querySelector("[data-rowid=\"".concat(getRowid($xetable, row), "\"]"));

    if (trElem) {
      var bodyHeight = bodyElem.clientHeight;
      var bodySrcollTop = bodyElem.scrollTop;
      var trOffsetTop = trElem.offsetTop + (trElem.offsetParent ? trElem.offsetParent.offsetTop : 0);
      var trHeight = trElem.clientHeight; // 检测行是否在可视区中

      if (trOffsetTop < bodySrcollTop || trOffsetTop > bodySrcollTop + bodyHeight) {
        // 向上定位
        return $xetable.scrollTo(null, trOffsetTop);
      } else if (trOffsetTop + trHeight >= bodyHeight + bodySrcollTop) {
        // 向下定位
        return $xetable.scrollTo(null, bodySrcollTop + trHeight);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollYLoad) {
        return $xetable.scrollTo(null, ($xetable.afterFullData.indexOf(row) - 1) * $xetable.scrollYStore.rowHeight);
      }
    }

    return Promise.resolve();
  },
  colToVisible: function colToVisible($xetable, column) {
    var bodyElem = $xetable.$refs.tableBody.$el;
    var tdElem = bodyElem.querySelector(".".concat(column.id));

    if (tdElem) {
      var bodyWidth = bodyElem.clientWidth;
      var bodySrcollLeft = bodyElem.scrollLeft;
      var tdOffsetLeft = tdElem.offsetLeft + (tdElem.offsetParent ? tdElem.offsetParent.offsetLeft : 0);
      var tdWidth = tdElem.clientWidth; // 检测行是否在可视区中

      if (tdOffsetLeft < bodySrcollLeft || tdOffsetLeft > bodySrcollLeft + bodyWidth) {
        // 向左定位
        return $xetable.scrollTo(tdOffsetLeft);
      } else if (tdOffsetLeft + tdWidth >= bodyWidth + bodySrcollLeft) {
        // 向右定位
        return $xetable.scrollTo(bodySrcollLeft + tdWidth);
      }
    } else {
      // 如果是虚拟渲染跨行滚动
      if ($xetable.scrollXLoad) {
        var visibleColumn = $xetable.visibleColumn;
        var scrollLeft = 0;

        for (var index = 0; index < visibleColumn.length; index++) {
          if (visibleColumn[index] === column) {
            break;
          }

          scrollLeft += visibleColumn[index].renderWidth;
        }

        return $xetable.scrollTo(scrollLeft);
      }
    }

    return Promise.resolve();
  },
  getDomNode: getDomNode,

  /**
   * 检查触发源是否属于目标节点
   */
  getEventTargetNode: function getEventTargetNode(evnt, container, queryCls, queryMethod) {
    var targetElem;
    var target = evnt.target;

    while (target && target.nodeType && target !== document) {
      if (queryCls && hasClass(target, queryCls) && (!queryMethod || queryMethod(target))) {
        targetElem = target;
      } else if (target === container) {
        return {
          flag: queryCls ? !!targetElem : true,
          container: container,
          targetElem: targetElem
        };
      }

      target = target.parentNode;
    }

    return {
      flag: false
    };
  },

  /**
   * 获取元素相对于 document 的位置
   */
  getOffsetPos: function getOffsetPos(elem, container) {
    return getNodeOffset(elem, container, {
      left: 0,
      top: 0
    });
  },
  getAbsolutePos: function getAbsolutePos(elem) {
    var bounding = elem.getBoundingClientRect();
    var boundingTop = bounding.top;
    var boundingLeft = bounding.left;

    var _getDomNode = getDomNode(),
        scrollTop = _getDomNode.scrollTop,
        scrollLeft = _getDomNode.scrollLeft,
        visibleHeight = _getDomNode.visibleHeight,
        visibleWidth = _getDomNode.visibleWidth;

    return {
      boundingTop: boundingTop,
      top: scrollTop + boundingTop,
      boundingLeft: boundingLeft,
      left: scrollLeft + boundingLeft,
      visibleHeight: visibleHeight,
      visibleWidth: visibleWidth
    };
  },
  toView: function toView(elem) {
    var scrollIntoViewIfNeeded = 'scrollIntoViewIfNeeded';
    var scrollIntoView = 'scrollIntoView';

    if (elem) {
      if (elem[scrollIntoViewIfNeeded]) {
        elem[scrollIntoViewIfNeeded]();
      } else if (elem[scrollIntoView]) {
        elem[scrollIntoView]();
      }
    }
  },
  triggerEvent: function triggerEvent(targetElem, type) {
    var evnt;

    if (typeof Event === 'function') {
      evnt = new Event(type);
    } else {
      evnt = document.createEvent('Event');
      evnt.initEvent(type, true, true);
    }

    targetElem.dispatchEvent(evnt);
  },
  calcHeight: function calcHeight($xetable, key) {
    var val = $xetable[key];
    var num = 0;

    if (val) {
      if (val === 'auto') {
        num = $xetable.parentHeight;
      } else {
        var excludeHeight = $xetable.getExcludeHeight();

        if (isScale(val)) {
          num = Math.floor((_ctor.default.toInteger(val) || 1) / 100 * $xetable.parentHeight);
        } else {
          num = _ctor.default.toNumber(val);
        }

        num = Math.max(40, num - excludeHeight);
      }
    }

    return num;
  }
};
exports.DomTools = DomTools;
var _default = DomTools;
exports.default = _default;