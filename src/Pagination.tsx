import React from 'react';
import { PropTypes, StandardProps } from '@material-ui/core';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import PageButton, { PageButtonClassKey, PageVariant } from './PageButton';
import { computePages, PagePosition, Position } from './core';

export type PaginationClassKey = PageButtonClassKey;

const styles = createStyles<PaginationClassKey>({
  root: {},
  rootCurrent: {},
  rootEllipsis: {},
  rootEnd: {},
  rootStandard: {},
  label: {},
  text: {},
  textPrimary: {},
  textSecondary: {},
  colorInherit: {},
  colorInheritCurrent: {},
  colorInheritOther: {},
  disabled: {},
  sizeSmall: {},
  sizeLarge: {},
  fullWidth: {}
});

export interface PaginationProps
  extends StandardProps<React.HTMLAttributes<HTMLDivElement>, PaginationClassKey, 'onClick'> {
  limit: number;
  offset: number;
  total: number;
  centerRipple?: boolean;
  component?: React.ReactType<PaginationProps>;
  currentPageColor?: PropTypes.Color;
  disabled?: boolean;
  disableFocusRipple?: boolean;
  disableRipple?: boolean;
  fullWidth?: boolean;
  nextPageLabel?: React.ReactNode;
  onClick?: ((ev: React.MouseEvent<HTMLElement>, offset: number) => void);
  otherPageColor?: PropTypes.Color;
  previousPageLabel?: React.ReactNode;
  reduced?: boolean;
  size?: 'small' | 'medium' | 'large';
}

const Pagination: React.SFC<PaginationProps & WithStyles<PaginationClassKey>> = props => {
  const {
    limit,
    offset,
    total,
    centerRipple,
    classes,
    className: classNameProp,
    component,
    currentPageColor,
    disabled,
    disableFocusRipple,
    disableRipple,
    fullWidth,
    nextPageLabel,
    onClick,
    otherPageColor,
    previousPageLabel,
    reduced,
    size,
    ...other
  } = props;

  const { root, ...buttonClasses } = classes;

  const className = classNames(root, classNameProp);

  const Component = component!;
  return (
    <Component className={className} {...other}>
      {computePages(limit, offset, total, reduced ? 1 : 2).map((pp: PagePosition) => {
        let key: React.Attributes['key'];
        let children: React.ReactNode;
        let pageVariant: PageVariant;
        switch (pp.position) {
          case Position.Current:
            key = pp.position;
            children = pp.page;
            pageVariant = 'current';
            break;
          case Position.LowEllipsis:
          case Position.HighEllipsis:
            key = -pp.position;
            children = '...';
            pageVariant = 'ellipsis';
            break;
          case Position.LowEnd:
          case Position.HighEnd:
            key = -pp.position;
            children = pp.position === Position.LowEnd ? previousPageLabel : nextPageLabel;
            pageVariant = 'end';
            break;
          default:
            key = pp.page;
            children = pp.page;
            pageVariant = 'standard';
            break;
        }

        return (
          <PageButton
            limit={limit}
            page={pp.page}
            total={total}
            centerRipple={centerRipple}
            classes={buttonClasses}
            currentPageColor={currentPageColor}
            disabled={disabled}
            disableFocusRipple={disableFocusRipple}
            disableRipple={disableRipple}
            fullWidth={fullWidth}
            key={key}
            onClick={onClick}
            otherPageColor={otherPageColor}
            pageVariant={pageVariant}
            size={size}
          >
            {children}
          </PageButton>
        );
      })}
    </Component>
  );
};

Pagination.defaultProps = {
  limit: 1,
  offset: 0,
  total: 0,
  centerRipple: false,
  component: 'div',
  currentPageColor: 'secondary',
  disabled: false,
  disableFocusRipple: false,
  disableRipple: false,
  fullWidth: false,
  nextPageLabel: '>',
  otherPageColor: 'primary',
  previousPageLabel: '<',
  reduced: false,
  size: 'medium'
};

const PaginationWithStyles: React.ComponentType<PaginationProps> = withStyles(styles, {
  name: 'MuiFlatPagination'
})(Pagination);

export default PaginationWithStyles;
