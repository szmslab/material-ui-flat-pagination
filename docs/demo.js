'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import Paper from 'material-ui/Paper';
import Toggle from 'material-ui/Toggle';
import injectTapEventPlugin from 'react-tap-event-plugin';
import FlatPagination from '../src/FlatPagination';

injectTapEventPlugin();

const _defaultTheme = getMuiTheme();
const _darkTheme = getMuiTheme(darkBaseTheme);

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
    muiTheme: _defaultTheme
  };

  handleTouchTap(offset, propName) {
    setTimeout(() => {
      this.setState({
        [propName]: {
          ...this.state[propName],
          offset: offset
        }
      });
    }, 240);
  }

  handleChangeTheme(isInputChecked) {
    this.setState({
      muiTheme: isInputChecked ? _darkTheme : _defaultTheme
    });
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={this.state.muiTheme}>
        <Paper style={{
          padding: '8px 8px 32px'
        }}>
          <h1>Demo of material-ui-flat-pagination</h1>
          <h3>Basic Pagination</h3>
          <FlatPagination
            offset={this.state.defaultPagination.offset}
            limit={this.state.defaultPagination.limit}
            total={this.state.defaultPagination.total}
            onTouchTap={(e, offset) => this.handleTouchTap(offset, 'defaultPagination')}
          />
          <h3>Reduced Pagination</h3>
          <FlatPagination
            offset={this.state.reducedPagination.offset}
            limit={this.state.reducedPagination.limit}
            total={this.state.reducedPagination.total}
            onTouchTap={(e, offset) => this.handleTouchTap(offset, 'reducedPagination')}
            reduced={true}
          />
          <Toggle
            label="Dark Theme"
            labelPosition="right"
            style={{width: '160px', marginTop: '32px'}}
            onToggle={(e, isInputChecked) => this.handleChangeTheme(isInputChecked)}
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
