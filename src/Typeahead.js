import React from 'react';
import Options from './Options';

const KEY_UP = 38;
const KEY_DOWN = 40;
const KEY_ENTER = 13;

export default class SimpleTypeahead extends React.Component {

  constructor() {
    super();

    this.defaultProps = {
      defaultValue: '',
      placeholder: '',
      options: [],
      onOptionSelected: () => {},
      maxOptionsCount: -1,
      customClasses: {}
    };

    this.state = {
      showResults: false,
      selectedIndex: 0,
      results: []
    };
  }

  componentDidUpdate(prevProps) {
    if (prevProps.defaultValue !== this.props.defaultValue) {
      this.input.value = this.props.defaultValue;
    }
  }

  componentWillMount() {
    this.customClasses = Object.assign({
      wrapper: 'ss-typeahead-wrapper',
      input: 'ss-typeahead-input',
      list: 'ss-typeahead-list',
      listItem: 'ss-typeahead-list-item',
      listItemSelected: 'ss-typeahead-list-item--selected',
      listItemValue: 'ss-typeahead-list-item__value'
    }, this.props.customClasses);
  }

  hide() {
    this.setState({showResults: false});
  }

  show() {
    this.setState({showResults: true});
  }

  processResults(value) {
    let results = this.props.options.filter((option) => {
      return option.toLowerCase().indexOf(value.toLowerCase()) > -1;
    });
    if (this.props.maxOptionsCount > 0) {
      results = results.slice(0, this.props.maxOptionsCount);
    }
    this.setState({results: results, selectedIndex: 0});
    this.show();

  }

  selectOption() {
    let selectedIndex = this.state.selectedIndex;
    let selectedOption = this.state.results[selectedIndex];
    if(selectedOption) {
      this.input.value = selectedOption;
      this.hide();
      this.props.onOptionSelected(selectedOption);
    }
  }

  setSelectedIndex(index, callback) {
    this.setState({selectedIndex: index}, callback);
  }

  selectNextIndex() {
    let currentIndex = this.state.selectedIndex;
    let nextIndex = ++currentIndex;
    if (nextIndex >= this.state.results.length) {
      nextIndex = 0;
    }
    this.setSelectedIndex(nextIndex);
  }

  selectPreviousIndex() {
    let currentIndex = this.state.selectedIndex;
    let previousIndex = --currentIndex;
    if (previousIndex < 0) {
      previousIndex = this.state.results.length - 1;
    }
    this.setSelectedIndex(previousIndex);
  }

  handleKeyPress(keyCode) {
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

  onKeyUp(event) {
    this.handleKeyPress(event.keyCode);
  }

  onChange() {
    let value = this.input.value;
    if (value.trim() !== '') {
      this.processResults(value);
    } else {
      this.hide();
      this.props.onInputEmpty();
    }
  }

  onOptionSelected(index) {
    this.setSelectedIndex(index, this.selectOption);
  }

  onMouseUp() {
    this.input.select();
  }

  render() {
    return (
      <div className={this.customClasses.wrapper}>
        <input
          type="text"
          ref={(input) => { if (input != null) { this.input = input;}}}
          className={this.customClasses.input}
          defaultValue={this.props.defaultValue}
          placeholder={this.props.placeholder}
          onKeyUp={this.onKeyUp.bind(this)}
          onChange={this.onChange.bind(this)}
          onMouseUp={this.onMouseUp.bind(this)}
        />
        <Options
          customClasses={this.customClasses}
          show={this.state.showResults}
          options={this.state.results}
          selectedIndex={this.state.selectedIndex}
          onOptionSelected={this.onOptionSelected.bind(this)}
        />
      </div>
    );
  }
}

SimpleTypeahead.propTypes = {
  defaultValue: React.PropTypes.string,
  placeholder: React.PropTypes.string,
  options: React.PropTypes.array.isRequired,
  onOptionSelected: React.PropTypes.func,
  onInputEmpty: React.PropTypes.func,
  maxOptionsCount: React.PropTypes.number,
  customClasses: React.PropTypes.object
};
