'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _FlatButton = require('material-ui/FlatButton');

var _FlatButton2 = _interopRequireDefault(_FlatButton);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _ellipsisLabel = '...';

var _styles = {
  buttonStyle: {
    minWidth: 'none'
  },
  labelStyle: {
    padding: '0 12px'
  },
  ellipsisLabelStyle: {
    padding: '0 4px'
  }
};

var validateNumber = function validateNumber(min) {
  return function (props, propName, componentName) {
    var value = props[propName];
    var type = typeof value === 'undefined' ? 'undefined' : _typeof(value);
    if (type !== 'number') {
      return new Error('Failed prop type: Invalid prop `' + propName + '` of type `' + type + '` supplied to `' + componentName + '`, expected `number`.');
    }
    var intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error('Failed prop value: Invalid prop `' + propName + '` of value `' + value + '` supplied to `' + componentName + '`, expected a number greater than or equal to `' + min + '`.');
    }
  };
};

var FlatPagination = function (_React$PureComponent) {
  _inherits(FlatPagination, _React$PureComponent);

  function FlatPagination() {
    _classCallCheck(this, FlatPagination);

    return _possibleConstructorReturn(this, (FlatPagination.__proto__ || Object.getPrototypeOf(FlatPagination)).apply(this, arguments));
  }

  _createClass(FlatPagination, [{
    key: 'handleClick',
    value: function handleClick(e, funcName, targetPage) {
      this.props[funcName] && this.props[funcName](e, FlatPagination.getOffset(this.props.limit, targetPage));
    }
  }, {
    key: 'renderButton',
    value: function renderButton(position, targetPage, label) {
      var _this2 = this;

      var _props = this.props,
          total = _props.total,
          currentPageLabelStyle = _props.currentPageLabelStyle,
          currentPageStyle = _props.currentPageStyle,
          disabled = _props.disabled,
          disableTouchRipple = _props.disableTouchRipple,
          hoverColor = _props.hoverColor,
          otherPageLabelStyle = _props.otherPageLabelStyle,
          otherPageStyle = _props.otherPageStyle,
          rippleColor = _props.rippleColor;


      var totalZero = total <= 0;

      if (position === 'previous' || position === 'next') {
        var icon = void 0;
        if (_react2.default.isValidElement(label)) {
          icon = _react2.default.cloneElement(label, {
            style: Object.assign({}, _styles.labelStyle, label.props.style)
          });
        }
        return _react2.default.createElement(_FlatButton2.default, _extends({
          key: position
        }, icon ? { icon: icon } : { label: label }, {
          primary: true,
          disabled: disabled || totalZero || targetPage <= 0,
          disableTouchRipple: disableTouchRipple,
          labelStyle: Object.assign({}, _styles.labelStyle, otherPageLabelStyle),
          hoverColor: hoverColor,
          onClick: function onClick(e) {
            return _this2.handleClick(e, 'onClick', targetPage);
          },
          onTouchTap: function onTouchTap(e) {
            return _this2.handleClick(e, 'onTouchTap', targetPage);
          },
          rippleColor: rippleColor,
          style: Object.assign({}, _styles.buttonStyle, otherPageStyle)
        }));
      } else if (position === 'left' || position === 'right') {
        var isEllipsis = label === _ellipsisLabel;
        var labelStyle = isEllipsis ? _styles.ellipsisLabelStyle : _styles.labelStyle;
        return _react2.default.createElement(_FlatButton2.default, {
          key: isEllipsis ? position + 'Ellipsis' : label,
          label: label,
          primary: true,
          disabled: disabled || totalZero || isEllipsis,
          disableTouchRipple: disableTouchRipple,
          labelStyle: Object.assign({}, labelStyle, otherPageLabelStyle),
          hoverColor: hoverColor,
          onClick: function onClick(e) {
            return _this2.handleClick(e, 'onClick', targetPage);
          },
          onTouchTap: function onTouchTap(e) {
            return _this2.handleClick(e, 'onTouchTap', targetPage);
          },
          rippleColor: rippleColor,
          style: Object.assign({}, _styles.buttonStyle, otherPageStyle)
        });
      } else {
        return _react2.default.createElement(_FlatButton2.default, {
          key: label,
          label: label,
          secondary: true,
          disabled: disabled || totalZero,
          disableTouchRipple: true,
          labelStyle: Object.assign({}, _styles.labelStyle, currentPageLabelStyle),
          hoverColor: hoverColor,
          style: Object.assign({}, _styles.buttonStyle, currentPageStyle)
        });
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var _props2 = this.props,
          offset = _props2.offset,
          limit = _props2.limit,
          total = _props2.total,
          className = _props2.className,
          nextPageLabel = _props2.nextPageLabel,
          previousPageLabel = _props2.previousPageLabel,
          reduced = _props2.reduced,
          style = _props2.style;

      var _FlatPagination$creat = FlatPagination.createLabel(offset, limit, total, reduced),
          leftLabels = _FlatPagination$creat.leftLabels,
          currentLabel = _FlatPagination$creat.currentLabel,
          rightLabels = _FlatPagination$creat.rightLabels,
          previousPage = _FlatPagination$creat.previousPage,
          nextPage = _FlatPagination$creat.nextPage;

      var targetPage = function targetPage(label) {
        return parseInt(label, 10);
      };

      return _react2.default.createElement(
        'div',
        { className: 'material-ui-flat-pagination' + (className ? ' ' + className : ''), style: style },
        this.renderButton('previous', previousPage, previousPageLabel),
        leftLabels.map(function (label) {
          return _this3.renderButton('left', targetPage(label), label);
        }),
        this.renderButton('current', targetPage(currentLabel), currentLabel),
        rightLabels.map(function (label) {
          return _this3.renderButton('right', targetPage(label), label);
        }),
        this.renderButton('next', nextPage, nextPageLabel)
      );
    }
  }], [{
    key: 'createLabel',
    value: function createLabel(offset, limit, total, reduced) {
      var currentPage = Math.floor(offset / limit) + 1;
      var minPage = 1;
      var maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);

      var reserveBaseCount = reduced ? 1 : 2;
      var getReserveCount = function getReserveCount(anotherSidePageCount) {
        var ret = reserveBaseCount * 2 - anotherSidePageCount;
        return ret < reserveBaseCount ? reserveBaseCount : ret;
      };

      var leftLabels = function () {
        var labels = [];
        var reserveCount = getReserveCount(maxPage - currentPage);
        var endReservePage = minPage + (reserveBaseCount - 1);
        var endReserveBoundaryPage = endReservePage + 1;
        var ellipsis = false;
        for (var i = currentPage - 1; i >= minPage; i--) {
          if (labels.length < reserveCount || i <= endReservePage || i === endReserveBoundaryPage && !ellipsis) {
            labels.push('' + i);
          } else if (!ellipsis) {
            ellipsis = true;
            labels.push(_ellipsisLabel);
          }
        }
        return labels;
      }();

      var rightLabels = function () {
        var labels = [];
        var reserveCount = getReserveCount(currentPage - minPage);
        var endReservePage = maxPage - (reserveBaseCount - 1);
        var endReserveBoundaryPage = endReservePage - 1;
        var ellipsis = false;
        for (var i = currentPage + 1; i <= maxPage; i++) {
          if (labels.length < reserveCount || i >= endReservePage || i === endReserveBoundaryPage && !ellipsis) {
            labels.push('' + i);
          } else if (!ellipsis) {
            ellipsis = true;
            labels.push(_ellipsisLabel);
          }
        }
        return labels;
      }();

      return {
        leftLabels: leftLabels.reverse(),
        currentLabel: '' + currentPage,
        rightLabels: rightLabels,
        previousPage: currentPage <= minPage ? 0 : currentPage - 1,
        nextPage: currentPage >= maxPage ? 0 : currentPage + 1
      };
    }
  }, {
    key: 'getOffset',
    value: function getOffset(limit, page) {
      return (page - 1) * limit;
    }
  }]);

  return FlatPagination;
}(_react2.default.PureComponent);

FlatPagination.propTypes = {
  offset: validateNumber(0),
  limit: validateNumber(1),
  total: validateNumber(0),
  className: _propTypes2.default.string,
  currentPageLabelStyle: _propTypes2.default.object,
  currentPageStyle: _propTypes2.default.object,
  disabled: _propTypes2.default.bool,
  disableTouchRipple: _propTypes2.default.bool,
  hoverColor: _propTypes2.default.string,
  nextPageLabel: _propTypes2.default.node,
  onClick: _propTypes2.default.func,
  onTouchTap: _propTypes2.default.func,
  otherPageLabelStyle: _propTypes2.default.object,
  otherPageStyle: _propTypes2.default.object,
  previousPageLabel: _propTypes2.default.node,
  rippleColor: _propTypes2.default.string,
  reduced: _propTypes2.default.bool,
  style: _propTypes2.default.object
};
FlatPagination.contextTypes = {
  muiTheme: _propTypes2.default.object.isRequired
};
FlatPagination.defaultProps = {
  disabled: false,
  disableTouchRipple: false,
  nextPageLabel: '>',
  previousPageLabel: '<',
  reduced: false
};
exports.default = FlatPagination;