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

var _core = require('./core');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var styles = {
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
      return new Error('Failed prop type: ' + ('Invalid prop `' + propName + '` of type `' + type + '` supplied to `' + componentName + '`') + ', expected `number`.');
    }
    var intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error('Failed prop value: ' + ('Invalid prop `' + propName + '` of value `' + value + '` supplied to `' + componentName + '`') + (', expected a number greater than or equal to `' + min + '`.'));
    }
  };
};

var FlatPagination = function (_React$PureComponent) {
  _inherits(FlatPagination, _React$PureComponent);

  function FlatPagination() {
    var _ref;

    var _temp, _this, _ret;

    _classCallCheck(this, FlatPagination);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FlatPagination.__proto__ || Object.getPrototypeOf(FlatPagination)).call.apply(_ref, [this].concat(args))), _this), _this.handleClick = function (targetPage) {
      return function (e) {
        _this.props.onClick && _this.props.onClick(e, (0, _core.getOffset)(targetPage, _this.props.limit));
      };
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(FlatPagination, [{
    key: 'renderCurrentButton',
    value: function renderCurrentButton(targetPage) {
      return _react2.default.createElement(_FlatButton2.default, {
        disabled: this.props.disabled || this.props.total <= 0,
        disableTouchRipple: true,
        hoverColor: this.props.currentPageHoverColor || this.props.hoverColor,
        key: 'cr' + targetPage,
        label: '' + targetPage,
        labelStyle: _extends({}, styles.labelStyle, this.props.currentPageLabelStyle),
        secondary: true,
        style: _extends({}, styles.buttonStyle, this.props.currentPageStyle)
      });
    }
  }, {
    key: 'renderOtherButton',
    value: function renderOtherButton(targetPage) {
      var label = '' + targetPage;
      return _react2.default.createElement(_FlatButton2.default, {
        disabled: this.props.disabled || this.props.total <= 0,
        disableTouchRipple: this.props.disableTouchRipple,
        hoverColor: this.props.hoverColor,
        key: label,
        label: label,
        labelStyle: _extends({}, styles.labelStyle, this.props.otherPageLabelStyle),
        onClick: this.handleClick(targetPage),
        primary: true,
        rippleColor: this.props.rippleColor,
        style: _extends({}, styles.buttonStyle, this.props.otherPageStyle)
      });
    }
  }, {
    key: 'renderEllipsisButton',
    value: function renderEllipsisButton(key) {
      return _react2.default.createElement(_FlatButton2.default, {
        disabled: true,
        key: key,
        label: '...',
        labelStyle: _extends({}, styles.ellipsisLabelStyle, this.props.otherPageLabelStyle),
        primary: true,
        style: _extends({}, styles.buttonStyle, this.props.otherPageStyle)
      });
    }
  }, {
    key: 'renderEndButton',
    value: function renderEndButton(targetPage, label, key) {
      return _react2.default.createElement(_FlatButton2.default, _extends({}, _react2.default.isValidElement(label) ? { icon: _react2.default.cloneElement(label, { style: _extends({}, styles.labelStyle, label.props.style) }) } : { label: label, labelStyle: _extends({}, styles.labelStyle, this.props.otherPageLabelStyle) }, {
        disabled: this.props.disabled || this.props.total <= 0 || targetPage <= 0,
        disableTouchRipple: this.props.disableTouchRipple,
        hoverColor: this.props.hoverColor,
        key: key,
        onClick: this.handleClick(targetPage),
        primary: true,
        rippleColor: this.props.rippleColor,
        style: _extends({}, styles.buttonStyle, this.props.otherPageStyle)
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props,
          offset = _props.offset,
          limit = _props.limit,
          total = _props.total,
          className = _props.className,
          nextPageLabel = _props.nextPageLabel,
          previousPageLabel = _props.previousPageLabel,
          reduced = _props.reduced,
          style = _props.style;


      return _react2.default.createElement(
        'div',
        {
          className: 'material-ui-flat-pagination' + (className ? ' ' + className : ''),
          style: style
        },
        (0, _core.computePagination)(offset, limit, total, reduced ? 1 : 2).map(function (o) {
          if (o.isCurrent) {
            return _this2.renderCurrentButton(o.page);
          } else if (o.isEnd) {
            if (o.isLowSide) {
              return _this2.renderEndButton(o.page, previousPageLabel, 'pr');
            } else {
              return _this2.renderEndButton(o.page, nextPageLabel, 'nx');
            }
          } else if (o.isEllipsis) {
            return _this2.renderEllipsisButton(o.isLowSide ? 'le' : 'he');
          }
          return _this2.renderOtherButton(o.page);
        })
      );
    }
  }]);

  return FlatPagination;
}(_react2.default.PureComponent);

FlatPagination.propTypes = {
  offset: validateNumber(0),
  limit: validateNumber(1),
  total: validateNumber(0),
  className: _propTypes2.default.string,
  currentPageHoverColor: _FlatButton2.default.propTypes.hoverColor,
  currentPageLabelStyle: _FlatButton2.default.propTypes.labelStyle,
  currentPageStyle: _FlatButton2.default.propTypes.style,
  disabled: _FlatButton2.default.propTypes.disabled,
  disableTouchRipple: _FlatButton2.default.propTypes.disableTouchRipple,
  hoverColor: _FlatButton2.default.propTypes.hoverColor,
  nextPageLabel: _propTypes2.default.node,
  onClick: _FlatButton2.default.propTypes.onClick,
  otherPageLabelStyle: _FlatButton2.default.propTypes.labelStyle,
  otherPageStyle: _FlatButton2.default.propTypes.style,
  previousPageLabel: _propTypes2.default.node,
  rippleColor: _FlatButton2.default.propTypes.rippleColor,
  reduced: _propTypes2.default.bool,
  style: _propTypes2.default.object
};
FlatPagination.defaultProps = {
  disabled: false,
  disableTouchRipple: false,
  nextPageLabel: '>',
  previousPageLabel: '<',
  reduced: false
};
exports.default = FlatPagination;