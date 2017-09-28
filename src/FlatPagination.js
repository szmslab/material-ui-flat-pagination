'use strict';

import PropTypes from 'prop-types';
import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const _ellipsisLabel = '...';

const _styles = {
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

  static createLabel(offset, limit, total, reduced) {
    const currentPage = Math.floor(offset / limit) + 1;
    const minPage = 1;
    const maxPage = Math.floor(total / limit) + (total % limit === 0 ? 0 : 1);

    const reserveBaseCount = reduced ? 1 : 2;
    const getReserveCount = (anotherSidePageCount) => {
      let ret = reserveBaseCount * 2 - anotherSidePageCount;
      return ret < reserveBaseCount ? reserveBaseCount : ret;
    };

    const leftLabels = (() => {
      const labels = [];
      const reserveCount = getReserveCount(maxPage - currentPage);
      const endReservePage = minPage + (reserveBaseCount - 1);
      const endReserveBoundaryPage = endReservePage + 1;
      let ellipsis = false;
      for (let i = currentPage - 1; i >= minPage; i--) {
        if (labels.length < reserveCount
          || i <= endReservePage
          || (i === endReserveBoundaryPage && !ellipsis)) {
          labels.push('' + i);
        } else if (!ellipsis) {
          ellipsis = true;
          labels.push(_ellipsisLabel);
        }
      }
      return labels;
    })();

    const rightLabels = (() => {
      const labels = [];
      const reserveCount = getReserveCount(currentPage - minPage);
      const endReservePage = maxPage - (reserveBaseCount - 1);
      const endReserveBoundaryPage = endReservePage - 1;
      let ellipsis = false;
      for (let i = currentPage + 1; i <= maxPage; i++) {
        if (labels.length < reserveCount
          || i >= endReservePage
          || (i === endReserveBoundaryPage && !ellipsis)) {
          labels.push('' + i);
        } else if (!ellipsis) {
          ellipsis = true;
          labels.push(_ellipsisLabel);
        }
      }
      return labels;
    })();

    return {
      leftLabels: leftLabels.reverse(),
      currentLabel: '' + currentPage,
      rightLabels: rightLabels,
      previousPage: currentPage <= minPage ? 0 : currentPage - 1,
      nextPage: currentPage >= maxPage ? 0 : currentPage + 1
    };
  }

  static getOffset(limit, page) {
    return (page - 1) * limit;
  }

  handleClick(e, targetPage) {
    this.props.onClick && this.props.onClick(e, FlatPagination.getOffset(this.props.limit, targetPage));
  }

  renderButton(position, targetPage, label) {
    const {
      total,
      currentPageLabelStyle,
      currentPageStyle,
      disabled,
      disableTouchRipple,
      hoverColor,
      otherPageLabelStyle,
      otherPageStyle,
      rippleColor
    } = this.props;

    const totalZero = total <= 0;

    if (position === 'previous' || position === 'next') {
      let icon;
      if (React.isValidElement(label)) {
        icon = React.cloneElement(label, {
          style: {..._styles.labelStyle, ...label.props.style}
        });
      }
      return (
        <FlatButton
          key={position}
          {...(icon ? {icon: icon} : {label: label})}
          primary={true}
          disabled={disabled || totalZero || targetPage <= 0}
          disableTouchRipple={disableTouchRipple}
          labelStyle={{..._styles.labelStyle, ...otherPageLabelStyle}}
          hoverColor={hoverColor}
          onClick={e => this.handleClick(e, targetPage)}
          rippleColor={rippleColor}
          style={{..._styles.buttonStyle, ...otherPageStyle}}
        />
      );
    } else if (position === 'left' || position === 'right') {
      const isEllipsis = label === _ellipsisLabel;
      return (
        <FlatButton
          key={isEllipsis ? position + 'Ellipsis' : label}
          label={label}
          primary={true}
          disabled={disabled || totalZero || isEllipsis}
          disableTouchRipple={disableTouchRipple}
          labelStyle={{...(isEllipsis ? _styles.ellipsisLabelStyle : _styles.labelStyle), ...otherPageLabelStyle}}
          hoverColor={hoverColor}
          onClick={e => this.handleClick(e, targetPage)}
          rippleColor={rippleColor}
          style={{..._styles.buttonStyle, ...otherPageStyle}}
        />
      );
    } else {
      return (
        <FlatButton
          key={label}
          label={label}
          secondary={true}
          disabled={disabled || totalZero}
          disableTouchRipple={true}
          labelStyle={{..._styles.labelStyle, ...currentPageLabelStyle}}
          hoverColor={hoverColor}
          style={{..._styles.buttonStyle, ...currentPageStyle}}
        />
      );
    }
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

    const {
      leftLabels,
      currentLabel,
      rightLabels,
      previousPage,
      nextPage
    } = FlatPagination.createLabel(offset, limit, total, reduced);

    const targetPage = (label) => parseInt(label, 10);

    return (
      <div className={'material-ui-flat-pagination' + (className ? ' ' + className : '')} style={style}>
        {this.renderButton('previous', previousPage, previousPageLabel)}
        {leftLabels.map(label => this.renderButton('left', targetPage(label), label))}
        {this.renderButton('current', targetPage(currentLabel), currentLabel)}
        {rightLabels.map(label => this.renderButton('right', targetPage(label), label))}
        {this.renderButton('next', nextPage, nextPageLabel)}
      </div>
    );
  }

}

export default FlatPagination;