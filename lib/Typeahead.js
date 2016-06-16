'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Options = require('./Options');

var _Options2 = _interopRequireDefault(_Options);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var KEY_UP = 38;
var KEY_DOWN = 40;
var KEY_ENTER = 13;

var SimpleTypeahead = function (_React$Component) {
  _inherits(SimpleTypeahead, _React$Component);

  function SimpleTypeahead() {
    _classCallCheck(this, SimpleTypeahead);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(SimpleTypeahead).call(this));

    _this.defaultProps = {
      defaultValue: '',
      placeholder: '',
      options: [],
      onOptionSelected: function onOptionSelected() {},
      maxOptionsCount: -1,
      customClasses: {}
    };

    _this.state = {
      showResults: false,
      selectedIndex: 0,
      results: []
    };
    return _this;
  }

  _createClass(SimpleTypeahead, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate(prevProps) {
      if (prevProps.defaultValue !== this.props.defaultValue) {
        this.input.value = this.props.defaultValue;
      }
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.customClasses = Object.assign({
        wrapper: 'ss-typeahead-wrapper',
        input: 'ss-typeahead-input',
        list: 'ss-typeahead-list',
        listItem: 'ss-typeahead-list-item',
        listItemSelected: 'ss-typeahead-list-item--selected',
        listItemValue: 'ss-typeahead-list-item__value'
      }, this.props.customClasses);
    }
  }, {
    key: 'hide',
    value: function hide() {
      this.setState({ showResults: false });
    }
  }, {
    key: 'show',
    value: function show() {
      this.setState({ showResults: true });
    }
  }, {
    key: 'processResults',
    value: function processResults(value) {
      var results = this.props.options.filter(function (option) {
        return option.toLowerCase().indexOf(value.toLowerCase()) > -1;
      });
      if (this.props.maxOptionsCount > 0) {
        results = results.slice(0, this.props.maxOptionsCount);
      }
      this.setState({ results: results, selectedIndex: 0 });
      this.show();
    }
  }, {
    key: 'selectOption',
    value: function selectOption() {
      var selectedIndex = this.state.selectedIndex;
      var selectedOption = this.state.results[selectedIndex];
      if (selectedOption) {
        this.input.value = selectedOption;
        this.hide();
        this.props.onOptionSelected(selectedOption);
      }
    }
  }, {
    key: 'setSelectedIndex',
    value: function setSelectedIndex(index, callback) {
      this.setState({ selectedIndex: index }, callback);
    }
  }, {
    key: 'selectNextIndex',
    value: function selectNextIndex() {
      var currentIndex = this.state.selectedIndex;
      var nextIndex = ++currentIndex;
      if (nextIndex >= this.state.results.length) {
        nextIndex = 0;
      }
      this.setSelectedIndex(nextIndex);
    }
  }, {
    key: 'selectPreviousIndex',
    value: function selectPreviousIndex() {
      var currentIndex = this.state.selectedIndex;
      var previousIndex = --currentIndex;
      if (previousIndex < 0) {
        previousIndex = this.state.results.length - 1;
      }
      this.setSelectedIndex(previousIndex);
    }
  }, {
    key: 'handleKeyPress',
    value: function handleKeyPress(keyCode) {
      switch (keyCode) {
        case KEY_DOWN:
          this.selectNextIndex();
          break;
        case KEY_UP:
          this.selectPreviousIndex();
          break;
        case KEY_ENTER:
          this.selectOption();
          break;
      }
    }
  }, {
    key: 'onKeyUp',
    value: function onKeyUp(event) {
      this.handleKeyPress(event.keyCode);
    }
  }, {
    key: 'onChange',
    value: function onChange() {
      var value = this.input.value;
      if (value.trim() !== '') {
        this.processResults(value);
      } else {
        this.hide();
        this.props.onInputEmpty();
      }
    }
  }, {
    key: 'onOptionSelected',
    value: function onOptionSelected(index) {
      this.setSelectedIndex(index, this.selectOption);
    }
  }, {
    key: 'onMouseUp',
    value: function onMouseUp() {
      this.input.select();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'div',
        { className: this.customClasses.wrapper },
        _react2.default.createElement('input', {
          type: 'text',
          ref: function ref(input) {
            if (input != null) {
              _this2.input = input;
            }
          },
          className: this.customClasses.input,
          defaultValue: this.props.defaultValue,
          placeholder: this.props.placeholder,
          onKeyUp: this.onKeyUp.bind(this),
          onChange: this.onChange.bind(this),
          onMouseUp: this.onMouseUp.bind(this)
        }),
        _react2.default.createElement(_Options2.default, {
          customClasses: this.customClasses,
          show: this.state.showResults,
          options: this.state.results,
          selectedIndex: this.state.selectedIndex,
          onOptionSelected: this.onOptionSelected.bind(this)
        })
      );
    }
  }]);

  return SimpleTypeahead;
}(_react2.default.Component);

exports.default = SimpleTypeahead;


SimpleTypeahead.propTypes = {
  defaultValue: _react2.default.PropTypes.string,
  placeholder: _react2.default.PropTypes.string,
  options: _react2.default.PropTypes.array.isRequired,
  onOptionSelected: _react2.default.PropTypes.func,
  onInputEmpty: _react2.default.PropTypes.func,
  maxOptionsCount: _react2.default.PropTypes.number,
  customClasses: _react2.default.PropTypes.object
};