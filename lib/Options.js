'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Option = require('./Option');

var _Option2 = _interopRequireDefault(_Option);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Options = function (_React$Component) {
  _inherits(Options, _React$Component);

  function Options() {
    _classCallCheck(this, Options);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Options).call(this));
  }

  _createClass(Options, [{
    key: 'onClick',
    value: function onClick(index) {
      this.props.onOptionSelected(index);
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      if (!this.props.show) {
        return null;
      }

      var options = this.props.options.map(function (option, index) {
        var key = option + '_' + index;
        return _react2.default.createElement(_Option2.default, {
          selected: index === _this2.props.selectedIndex,
          value: option,
          customClasses: _this2.props.customClasses,
          onClick: _this2.onClick.bind(_this2, index),
          key: key });
      });

      return _react2.default.createElement(
        'ul',
        { className: this.props.customClasses.list },
        options
      );
    }
  }]);

  return Options;
}(_react2.default.Component);

Options.propTypes = {
  show: _react2.default.PropTypes.bool,
  options: _react2.default.PropTypes.array.isRequired,
  selectedIndex: _react2.default.PropTypes.number,
  customClasses: _react2.default.PropTypes.object,
  onOptionSelected: _react2.default.PropTypes.func
};

exports.default = Options;