import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { createStyles, WithStyles, withStyles } from '@material-ui/core/styles';
import React from 'react';
import LightBulbIcon from './LightBulbIcon';

const styles = createStyles({
  titleRoot: {
    flex: 1
  }
});

export interface HeaderProps {
  darkTheme: boolean;
  onClick: ((ev: React.MouseEvent<HTMLElement>) => void);
}

const Header: React.FunctionComponent<HeaderProps & WithStyles<typeof styles>> = props => {
  const { classes, darkTheme, onClick } = props;
  const titleClasses = { root: classes.titleRoot };
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" color="inherit" classes={titleClasses}>
          Demo of material-ui-flat-pagination
        </Typography>
        <Tooltip title="Toggle light/dark theme">
          <IconButton color="inherit" onClick={onClick}>
            <LightBulbIcon filled={darkTheme} />
          </IconButton>
        </Tooltip>
      </Toolbar>
    </AppBar>
  );
};

export default withStyles(styles)(Header);
