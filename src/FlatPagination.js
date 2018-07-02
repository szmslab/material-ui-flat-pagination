'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import {computePagination, getOffset} from './core';

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
        'Failed prop type: '
        + `Invalid prop \`${propName}\` of type \`${type}\` supplied to \`${componentName}\``
        + ', expected `number`.'
      );
    }
    const intValue = parseInt(value, 10);
    if (intValue < min) {
      return new Error(
        'Failed prop value: '
        + `Invalid prop \`${propName}\` of value \`${value}\` supplied to \`${componentName}\``
        + `, expected a number greater than or equal to \`${min}\`.`
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
    currentPageHoverColor: FlatButton.propTypes.hoverColor,
    currentPageLabelStyle: FlatButton.propTypes.labelStyle,
    currentPageStyle: FlatButton.propTypes.style,
    disabled: FlatButton.propTypes.disabled,
    disableTouchRipple: FlatButton.propTypes.disableTouchRipple,
    hoverColor: FlatButton.propTypes.hoverColor,
    nextPageLabel: PropTypes.node,
    onClick: PropTypes.func,
    otherPageLabelStyle: FlatButton.propTypes.labelStyle,
    otherPageStyle: FlatButton.propTypes.style,
    previousPageLabel: PropTypes.node,
    rippleColor: FlatButton.propTypes.rippleColor,
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
    this.props.onClick && this.props.onClick(e, getOffset(targetPage, this.props.limit));
  };

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
      offset,
      limit,
      total,
      className,
      nextPageLabel,
      previousPageLabel,
      reduced,
      style
    } = this.props;

    return (
      <div
        className={'material-ui-flat-pagination' + (className ? ' ' + className : '')}
        style={style}
      >
        {
          computePagination(offset, limit, total, reduced ? 1 : 2).map(o => {
            if (o.isCurrent) {
              return this.renderCurrentButton(o.page);
            } else if (o.isEnd) {
              if (o.isLowSide) {
                return this.renderEndButton(o.page, previousPageLabel, 'pr');
              } else {
                return this.renderEndButton(o.page, nextPageLabel, 'nx');
              }
            } else if (o.isEllipsis) {
              return this.renderEllipsisButton(o.isLowSide ? 'le' : 'he');
            }
            return this.renderOtherButton(o.page);
          })
        }
      </div>
    );
  }

}

export default FlatPagination;