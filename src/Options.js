import React from 'react';
import classNames from 'classnames';
import Option from './Option';

class Options extends React.Component {

  constructor() {
    super();
  }

  onClick(index) {
    this.props.onOptionSelected(index)
  }

  render() {
    if (!this.props.show) {
      return null;
    }

    let options = this.props.options.map((option, index) => {
      let key = option + '_' + index;
      return <Option
        selected={(index === this.props.selectedIndex)}
        value={option}
        customClasses={this.props.customClasses}
        onClick={this.onClick.bind(this, index)}
        key={key}></Option>
    });

    return (
      <ul className={this.props.customClasses.list}>
        {options}
      </ul>
    )
  }
}

Options.propTypes = {
  show: React.PropTypes.bool,
  options: React.PropTypes.array.isRequired,
  selectedIndex: React.PropTypes.number,
  customClasses: React.PropTypes.object,
  onOptionSelected: React.PropTypes.func
};

export default Options;
