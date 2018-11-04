import * as React from 'react';
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
  sizeSmallCurrent: {},
  sizeSmallEllipsis: {},
  sizeSmallEnd: {},
  sizeSmallStandard: {},
  sizeLarge: {},
  sizeLargeCurrent: {},
  sizeLargeEllipsis: {},
  sizeLargeEnd: {},
  sizeLargeStandard: {},
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
  innerButtonCount?: number;
  nextPageLabel?: React.ReactNode;
  onClick?: ((ev: React.MouseEvent<HTMLElement>, offset: number) => void);
  otherPageColor?: PropTypes.Color;
  outerButtonCount?: number;
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
    innerButtonCount: innerButtonCountProp,
    onClick,
    otherPageColor,
    outerButtonCount: outerButtonCountProp,
    previousPageLabel,
    reduced,
    size,
    ...other
  } = props;

  const { root, ...buttonClasses } = classes;

  const className = classNames(root, classNameProp);

  const innerButtonCount = reduced ? 1 : innerButtonCountProp!;
  const outerButtonCount = reduced ? 1 : outerButtonCountProp!;

  const Component = component!;
  return (
    <Component className={className} {...other}>
      {computePages(limit, offset, total, innerButtonCount, outerButtonCount).map(
        (pp: PagePosition) => {
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
        }
      )}
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
  innerButtonCount: 2,
  nextPageLabel: '>',
  otherPageColor: 'primary',
  outerButtonCount: 2,
  previousPageLabel: '<',
  reduced: false,
  size: 'medium'
};

const PaginationWithStyles: React.ComponentType<PaginationProps> = withStyles(styles, {
  name: 'MuiFlatPagination'
})(Pagination);

export default PaginationWithStyles;
