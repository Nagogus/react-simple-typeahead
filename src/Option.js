import React from 'react';
import classNames from 'classnames';

class Option extends React.Component {

  constructor() {
    super();
    this.state = {}
  }

  render() {
    let selectedClassFlag = {};
    let classList;

    selectedClassFlag[this.props.customClasses.listItemSelected] = this.props.selected;
    classList = classNames(this.props.customClasses.listItem, selectedClassFlag);

    return (<li
      className={classList}
      onClick={this.props.onClick}
      ><span className={this.props.customClasses.listItemValue}>{this.props.value}</span></li>)
  }
}

Option.propTypes = {
  selected: React.PropTypes.bool,
  value: React.PropTypes.string,
  customClasses: React.PropTypes.object,
  onClick: React.PropTypes.func
};

export default Option;
