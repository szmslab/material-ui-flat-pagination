'use strict';

import React from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import AvPlayCircleFilled from 'material-ui/svg-icons/av/play-circle-filled';
import {fade} from 'material-ui/utils/colorManipulator';
import FlatPagination from '../src/FlatPagination';

const defaultTheme = getMuiTheme();
const darkTheme = getMuiTheme(darkBaseTheme);

const styles = {
  paperStyle: {
    padding: '8px 8px 32px'
  },
  toggleStyle: {
    width: 'auto',
    marginTop: '32px',
    paddingRight: '8px'
  },
  iconRotateStyle: {
    transform: 'rotate(180deg)'
  }
};

class Demo extends React.Component {

  state = {
    defaultPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    reducedPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    styledPagination: {
      offset: 0,
      limit: 10,
      total: 1000
    },
    muiTheme: defaultTheme
  };

  handleClick = (propName) => (e, offset) => {
    setTimeout(() => {
      this.setState({
        [propName]: {
          ...this.state[propName],
          offset: offset
        }
      });
    }, 240);
  };

  handleToggleTheme = (e, isInputChecked) => {
    this.setState({
      muiTheme: isInputChecked ? darkTheme : defaultTheme
    });
  };

  render() {
    const theme = this.state.muiTheme;
    return (
      <MuiThemeProvider muiTheme={theme}>
        <Paper style={styles.paperStyle}>
          <h1>Demo of material-ui-flat-pagination</h1>
          <h3>Default</h3>
          <FlatPagination
            offset={this.state.defaultPagination.offset}
            limit={this.state.defaultPagination.limit}
            total={this.state.defaultPagination.total}
            onClick={this.handleClick('defaultPagination')}
          />
          <h3>Reduced</h3>
          <FlatPagination
            offset={this.state.reducedPagination.offset}
            limit={this.state.reducedPagination.limit}
            total={this.state.reducedPagination.total}
            onClick={this.handleClick('reducedPagination')}
            reduced={true}
          />
          <h3>Styled</h3>
          <FlatPagination
            offset={this.state.styledPagination.offset}
            limit={this.state.styledPagination.limit}
            total={this.state.styledPagination.total}
            onClick={this.handleClick('styledPagination')}
            previousPageLabel={<AvPlayCircleFilled style={styles.iconRotateStyle}/>}
            nextPageLabel={<AvPlayCircleFilled/>}
            currentPageHoverColor={fade(theme.palette.accent1Color, 0.16)}
            hoverColor={fade(theme.palette.primary1Color, 0.16)}
            rippleColor={fade(theme.palette.primary1Color, 0.8)}
          />
          <Toggle
            label="Dark Theme"
            labelPosition="right"
            onToggle={this.handleToggleTheme}
            style={styles.toggleStyle}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }

}

export default Demo;
