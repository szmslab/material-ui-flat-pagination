'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const styles = {
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

const validateNumber = (min) => {
  return (props, propName, componentName) => {
    const value = props[propName];
    const type = typeof value;
    if (type !== 'number') {
      return new Error(
        'Failed prop type: Invalid prop `' + propName + '` of type `' + type +
        '` supplied to `' + componentName + '`, expected `number`.'
      );
    }
    const intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error(
        'Failed prop value: Invalid prop `' + propName + '` of value `' + value +
        '` supplied to `' + componentName + '`, expected a number greater than or equal to `' + min + '`.'
      );
    }
  };
};

class FlatPagination extends React.PureComponent {

  static propTypes = {
    offset: validateNumber(0),
    limit: validateNumber(1),
    total: validateNumber(0),
    className: PropTypes.string,
    currentPageHoverColor: PropTypes.string,
    currentPageLabelStyle: PropTypes.object,
    currentPageStyle: PropTypes.object,
    disabled: PropTypes.bool,
    disableTouchRipple: PropTypes.bool,
    hoverColor: PropTypes.string,
    nextPageLabel: PropTypes.node,
    onClick: PropTypes.func,
    otherPageLabelStyle: PropTypes.object,
    otherPageStyle: PropTypes.object,
    previousPageLabel: PropTypes.node,
    rippleColor: PropTypes.string,
    reduced: PropTypes.bool,
    style: PropTypes.object
  };

  static defaultProps = {
    disabled: false,
    disableTouchRipple: false,
    nextPageLabel: '>',
    previousPageLabel: '<',
    reduced: false
  };

  handleClick = (targetPage) => (e) => {
    const offset = (targetPage - 1) * this.props.limit;
    this.props.onClick && this.props.onClick(e, offset);
  };

  renderButtons() {
    const {
      offset,
      limit,
      total,
      reduced,
      previousPageLabel,
      nextPageLabel
    } = this.props;

    const minPage = 1;
    const maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);
    const currentPage = Math.floor(offset / limit) + 1;
    const previousPage = currentPage <= minPage ? 0 : currentPage - 1;
    const nextPage = currentPage >= maxPage ? 0 : currentPage + 1;

    const innerPageCount = reduced ? 1 : 2;
    const outerPageCount = innerPageCount;

    const buttons = [];

    // previous
    buttons.push(this.renderEndButton(previousPage, previousPageLabel, 'pr'));

    // left
    const leftAdditionalInnerPageCount = Math.max(innerPageCount + currentPage - maxPage, 0);
    const leftInnerEllipsisPage = currentPage - innerPageCount - leftAdditionalInnerPageCount - 1;
    const leftOuterEllipsisPage = minPage + outerPageCount;
    for (let i = minPage; i < currentPage; i++) {
      if (i < leftOuterEllipsisPage) {
        buttons.push(this.renderOtherButton(i));
      } else {
        buttons.push(i === leftOuterEllipsisPage && i < leftInnerEllipsisPage
          ? this.renderEllipsisButton('le') : this.renderOtherButton(i));
        for (let j = Math.max(i, leftInnerEllipsisPage) + 1; j < currentPage; j++) {
          buttons.push(this.renderOtherButton(j));
        }
        break;
      }
    }

    // current
    buttons.push(this.renderCurrentButton(currentPage));

    // right
    const rightAdditionalInnerPageCount = Math.max(innerPageCount - currentPage + minPage, 0);
    const rightInnerEllipsisPage = currentPage + innerPageCount + rightAdditionalInnerPageCount + 1;
    const rightOuterEllipsisPage = maxPage - outerPageCount;
    for (let i = currentPage + 1; i <= maxPage; i++) {
      if (i < rightInnerEllipsisPage) {
        buttons.push(this.renderOtherButton(i));
      } else {
        buttons.push(i === rightInnerEllipsisPage && i < rightOuterEllipsisPage
          ? this.renderEllipsisButton('re') : this.renderOtherButton(i));
        for (let j = Math.max(i, rightOuterEllipsisPage) + 1; j <= maxPage; j++) {
          buttons.push(this.renderOtherButton(j));
        }
        break;
      }
    }

    // next
    buttons.push(this.renderEndButton(nextPage, nextPageLabel, 'nx'));

    return buttons;
  }

  renderCurrentButton(targetPage) {
    return (
      <FlatButton
        disabled={this.props.disabled || this.props.total <= 0}
        disableTouchRipple={true}
        hoverColor={this.props.currentPageHoverColor || this.props.hoverColor}
        key={'cr' + targetPage}
        label={'' + targetPage}
        labelStyle={{...styles.labelStyle, ...this.props.currentPageLabelStyle}}
        secondary={true}
        style={{...styles.buttonStyle, ...this.props.currentPageStyle}}
      />
    );
  }

  renderOtherButton(targetPage) {
    const label = '' + targetPage;
    return (
      <FlatButton
        disabled={this.props.disabled || this.props.total <= 0}
        disableTouchRipple={this.props.disableTouchRipple}
        hoverColor={this.props.hoverColor}
        key={label}
        label={label}
        labelStyle={{...styles.labelStyle, ...this.props.otherPageLabelStyle}}
        onClick={this.handleClick(targetPage)}
        primary={true}
        rippleColor={this.props.rippleColor}
        style={{...styles.buttonStyle, ...this.props.otherPageStyle}}
      />
    );
  }

  renderEllipsisButton(key) {
    return (
      <FlatButton
        disabled={true}
        hoverColor={this.props.hoverColor}
        key={key}
        label="..."
        labelStyle={{...styles.ellipsisLabelStyle, ...this.props.otherPageLabelStyle}}
        primary={true}
        style={{...styles.buttonStyle, ...this.props.otherPageStyle}}
      />
    );
  }

  renderEndButton(targetPage, label, key) {
    return (
      <FlatButton
        {...(React.isValidElement(label)
          ? {icon: React.cloneElement(label, {style: {...styles.labelStyle, ...label.props.style}})}
          : {label: label, labelStyle: {...styles.labelStyle, ...this.props.otherPageLabelStyle}})}
        disabled={this.props.disabled || this.props.total <= 0 || targetPage <= 0}
        disableTouchRipple={this.props.disableTouchRipple}
        hoverColor={this.props.hoverColor}
        key={key}
        onClick={this.handleClick(targetPage)}
        primary={true}
        rippleColor={this.props.rippleColor}
        style={{...styles.buttonStyle, ...this.props.otherPageStyle}}
      />
    );
  }

  render() {
    const {
      className,
      style
    } = this.props;
    return (
      <div
        className={'material-ui-flat-pagination' + (className ? ' ' + className : '')}
        style={style}
      >
        {this.renderButtons()}
      </div>
    );
  }

}

export default FlatPagination;