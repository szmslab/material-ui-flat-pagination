'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
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
    return (
      <MuiThemeProvider muiTheme={this.state.muiTheme}>
        <Paper style={styles.paperStyle}>
          <h1>Demo of material-ui-flat-pagination</h1>
          <h3>Basic Pagination</h3>
          <FlatPagination
            offset={this.state.defaultPagination.offset}
            limit={this.state.defaultPagination.limit}
            total={this.state.defaultPagination.total}
            onClick={this.handleClick('defaultPagination')}
          />
          <h3>Reduced Pagination</h3>
          <FlatPagination
            offset={this.state.reducedPagination.offset}
            limit={this.state.reducedPagination.limit}
            total={this.state.reducedPagination.total}
            onClick={this.handleClick('reducedPagination')}
            reduced={true}
          />
          <Toggle
            label="Dark Theme"
            labelPosition="right"
            style={styles.toggleStyle}
            onToggle={this.handleToggleTheme}
          />
        </Paper>
      </MuiThemeProvider>
    );
  }

}

ReactDOM.render(
  <Demo/>,
  document.getElementById('root')
);
