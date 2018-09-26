import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import blue from '@material-ui/core/colors/blue';
import deepOrange from '@material-ui/core/colors/deepOrange';
import green from '@material-ui/core/colors/green';
import {
  createMuiTheme,
  createStyles,
  MuiThemeProvider,
  Theme,
  WithStyles,
  withStyles
} from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import ArrowBack from '@material-ui/icons/ArrowBack';
import ArrowForward from '@material-ui/icons/ArrowForward';
import React from 'react';
import Header from './Header';
import Headline from './Headline';
import Pagination, { PaginationClassKey } from '../../src';

const muiTheme = {
  light: createMuiTheme({
    palette: {
      primary: blue,
      type: 'light'
    }
  }),
  dark: createMuiTheme({
    palette: {
      primary: blue,
      type: 'dark'
    }
  })
};

const styles = (theme: Theme) =>
  createStyles<
    'paperRoot' | Extract<PaginationClassKey, 'colorInheritCurrent' | 'colorInheritOther'>
  >({
    paperRoot: {
      margin: theme.spacing.unit * 2,
      padding: theme.spacing.unit * 2
    },
    colorInheritCurrent: {
      color: deepOrange.A200,
      '&:hover': {
        backgroundColor: fade(deepOrange.A200, theme.palette.action.hoverOpacity)
      }
    },
    colorInheritOther: {
      color: green['500'],
      '&:hover': {
        backgroundColor: fade(green['500'], theme.palette.action.hoverOpacity)
      }
    }
  });

enum PaginationType {
  Default = 'defaultPagination',
  Reduced = 'reducedPagination',
  Styled = 'styledPagination'
}

interface DemoPaginationState {
  limit: number;
  offset: number;
  total: number;
}

interface DemoState {
  defaultPagination: DemoPaginationState;
  reducedPagination: DemoPaginationState;
  styledPagination: DemoPaginationState;
  isDarkTheme: boolean;
  [index: string]: DemoPaginationState | boolean;
}

class Demo extends React.PureComponent<WithStyles<typeof styles>, DemoState> {
  public readonly state = {
    defaultPagination: {
      limit: 10,
      offset: 0,
      total: 1000
    },
    reducedPagination: {
      limit: 10,
      offset: 0,
      total: 1000
    },
    styledPagination: {
      limit: 10,
      offset: 0,
      total: 1000
    },
    isDarkTheme: false
  };

  public render() {
    const { classes } = this.props;

    const { paperRoot, ...paginationClasses } = classes;

    const paperClasses = {
      root: paperRoot
    };

    const isDarkTheme = this.state.isDarkTheme;

    return (
      <MuiThemeProvider theme={isDarkTheme ? muiTheme.dark : muiTheme.light}>
        <CssBaseline />
        <Header darkTheme={isDarkTheme} onClick={this.handleToggleTheme} />
        <Paper classes={paperClasses}>
          <Headline>Default</Headline>
          <Pagination
            limit={this.state.defaultPagination.limit}
            offset={this.state.defaultPagination.offset}
            total={this.state.defaultPagination.total}
            onClick={this.handleClick(PaginationType.Default)}
          />
        </Paper>
        <Paper classes={paperClasses}>
          <Headline>Reduced</Headline>
          <Pagination
            limit={this.state.reducedPagination.limit}
            offset={this.state.reducedPagination.offset}
            total={this.state.reducedPagination.total}
            onClick={this.handleClick(PaginationType.Reduced)}
            reduced={true}
          />
        </Paper>
        <Paper classes={paperClasses}>
          <Headline>Styled</Headline>
          <Pagination
            limit={this.state.styledPagination.limit}
            offset={this.state.styledPagination.offset}
            total={this.state.styledPagination.total}
            classes={paginationClasses}
            currentPageColor="inherit"
            nextPageLabel={<ArrowForward fontSize="inherit" />}
            previousPageLabel={<ArrowBack fontSize="inherit" />}
            onClick={this.handleClick(PaginationType.Styled)}
            otherPageColor="inherit"
            size="large"
          />
        </Paper>
      </MuiThemeProvider>
    );
  }

  private handleClick = (paginationType: PaginationType) => (
    ev: React.MouseEvent<HTMLElement>,
    offset: number
  ) => {
    setTimeout(() => {
      this.setState({
        [paginationType]: {
          ...this.state[paginationType],
          offset
        }
      });
    }, 240);
  };

  private handleToggleTheme = () => {
    this.setState({
      isDarkTheme: !this.state.isDarkTheme
    });
  };
}

export default withStyles(styles)(Demo) as React.ComponentType<{}>;
