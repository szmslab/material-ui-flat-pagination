import React from 'react';
import { PropTypes, StandardProps } from '@material-ui/core';
import Button, { ButtonProps } from '@material-ui/core/Button';
import { createStyles, Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import classNames from 'classnames';
import { getOffset } from './core';

export type PageButtonClassKey =
  | 'root'
  | 'rootCurrent'
  | 'rootEllipsis'
  | 'rootEnd'
  | 'rootStandard'
  | 'label'
  | 'text'
  | 'textPrimary'
  | 'textSecondary'
  | 'colorInherit'
  | 'colorInheritCurrent'
  | 'colorInheritOther'
  | 'disabled'
  | 'sizeSmall'
  | 'sizeSmallCurrent'
  | 'sizeSmallEllipsis'
  | 'sizeSmallEnd'
  | 'sizeSmallStandard'
  | 'sizeLarge'
  | 'sizeLargeCurrent'
  | 'sizeLargeEllipsis'
  | 'sizeLargeEnd'
  | 'sizeLargeStandard'
  | 'fullWidth';

const styles = (theme: Theme) =>
  createStyles<PageButtonClassKey>({
    root: {
      minWidth: 16
    },
    rootCurrent: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5
    },
    rootEllipsis: {
      paddingLeft: theme.spacing.unit * 0.5,
      paddingRight: theme.spacing.unit * 0.5
    },
    rootEnd: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5
    },
    rootStandard: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5
    },
    label: {},
    text: {},
    textPrimary: {},
    textSecondary: {},
    colorInherit: {},
    colorInheritCurrent: {},
    colorInheritOther: {},
    disabled: {},
    sizeSmall: {
      minWidth: 8
    },
    sizeSmallCurrent: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    sizeSmallEllipsis: {
      paddingLeft: theme.spacing.unit * 0.25,
      paddingRight: theme.spacing.unit * 0.25
    },
    sizeSmallEnd: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    sizeSmallStandard: {
      paddingLeft: theme.spacing.unit,
      paddingRight: theme.spacing.unit
    },
    sizeLarge: {
      minWidth: 24
    },
    sizeLargeCurrent: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    sizeLargeEllipsis: {
      paddingLeft: theme.spacing.unit * 0.75,
      paddingRight: theme.spacing.unit * 0.75
    },
    sizeLargeEnd: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    sizeLargeStandard: {
      paddingLeft: theme.spacing.unit * 2,
      paddingRight: theme.spacing.unit * 2
    },
    fullWidth: {}
  });

export type PageVariant = 'current' | 'ellipsis' | 'end' | 'standard';

export interface PageButtonProps extends StandardProps<ButtonProps, PageButtonClassKey, 'onClick'> {
  limit: number;
  page: number;
  total: number;
  pageVariant: PageVariant;
  currentPageColor?: PropTypes.Color;
  onClick?: ((ev: React.MouseEvent<HTMLElement>, page: number) => void);
  otherPageColor?: PropTypes.Color;
}

const handleClick = (
  page: number,
  limit: number,
  onClick: (ev: React.MouseEvent<HTMLElement>, offset: number) => void
) => (ev: React.MouseEvent<HTMLElement>): void => {
  onClick(ev, getOffset(page, limit));
};

const PageButton: React.SFC<PageButtonProps & WithStyles<PageButtonClassKey>> = props => {
  const {
    limit,
    page,
    total,
    pageVariant,
    classes: classesProp,
    currentPageColor,
    disabled: disabledProp,
    disableRipple: disableRippleProp,
    onClick: onClickProp,
    otherPageColor,
    size,
    ...other
  } = props;

  const isCurrent = pageVariant === 'current';
  const isEllipsis = pageVariant === 'ellipsis';
  const isEnd = pageVariant === 'end';
  const isStandard = pageVariant === 'standard';

  const isSmall = size === 'small';
  const isLarge = size === 'large';

  const {
    rootCurrent,
    rootEllipsis,
    rootEnd,
    rootStandard,
    colorInheritCurrent,
    colorInheritOther,
    sizeSmallCurrent,
    sizeSmallEllipsis,
    sizeSmallEnd,
    sizeSmallStandard,
    sizeLargeCurrent,
    sizeLargeEllipsis,
    sizeLargeEnd,
    sizeLargeStandard,
    ...classes
  } = classesProp;
  classes.root = classNames(classes.root, {
    [rootCurrent]: isCurrent,
    [rootEllipsis]: isEllipsis,
    [rootEnd]: isEnd,
    [rootStandard]: isStandard
  });
  classes.colorInherit = classNames(classes.colorInherit, {
    [colorInheritCurrent]: isCurrent,
    [colorInheritOther]: !isCurrent
  });
  classes.sizeSmall = classNames(classes.sizeSmall, {
    [sizeSmallCurrent]: isCurrent && isSmall,
    [sizeSmallEllipsis]: isEllipsis && isSmall,
    [sizeSmallEnd]: isEnd && isSmall,
    [sizeSmallStandard]: isStandard && isSmall
  });
  classes.sizeLarge = classNames(classes.sizeLarge, {
    [sizeLargeCurrent]: isCurrent && isLarge,
    [sizeLargeEllipsis]: isEllipsis && isLarge,
    [sizeLargeEnd]: isEnd && isLarge,
    [sizeLargeStandard]: isStandard && isLarge
  });
  const color = isCurrent ? currentPageColor : otherPageColor;
  const disabled = disabledProp || isEllipsis || page <= 0 || total <= 0;
  const disableRipple = disableRippleProp || disabled || isCurrent;
  let onClick: ((ev: React.MouseEvent<HTMLElement>) => void) | undefined;
  if (onClickProp && !disabled && (isEnd || isStandard)) {
    onClick = handleClick(page, limit, onClickProp);
  }

  return (
    <Button
      classes={classes}
      color={color}
      disabled={disabled}
      disableRipple={disableRipple}
      onClick={onClick}
      size={size}
      {...other}
    />
  );
};

PageButton.defaultProps = {
  limit: 1,
  page: 0,
  total: 0,
  pageVariant: 'standard',
  disabled: false,
  disableRipple: false
};

const PageButtonWithStyles: React.ComponentType<PageButtonProps> = withStyles(styles, {
  name: 'MuiFlatPageButton'
})(PageButton);

export default PageButtonWithStyles;
