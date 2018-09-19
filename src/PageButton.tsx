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
  | 'sizeLarge'
  | 'fullWidth';

const styles = (theme: Theme) =>
  createStyles<PageButtonClassKey>({
    root: {
      minWidth: 0
    },
    rootCurrent: {
      paddingLeft: theme.spacing.unit * 1.5,
      paddingRight: theme.spacing.unit * 1.5
    },
    rootEllipsis: {
      paddingLeft: theme.spacing.unit / 2,
      paddingRight: theme.spacing.unit / 2
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
    sizeSmall: {},
    sizeLarge: {},
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
    ...other
  } = props;

  const isCurrent = pageVariant === 'current';
  const isEllipsis = pageVariant === 'ellipsis';
  const isEnd = pageVariant === 'end';
  const isStandard = pageVariant === 'standard';

  const {
    rootCurrent,
    rootEllipsis,
    rootEnd,
    rootStandard,
    colorInheritCurrent,
    colorInheritOther,
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
