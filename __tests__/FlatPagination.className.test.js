'use strict';

import React from 'react';
import {mount} from 'enzyme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatPagination from '../src/FlatPagination';

describe('Pagination Class Name', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FlatPagination {...props}/>
      </MuiThemeProvider>
    ).find('.material-ui-flat-pagination');
  };

  // ********************************************************************************
  describe('append className', () => {
    it("className: 'class-name-test'", () => {
      expect(wrapper({
        offset: 0,
        limit: 10,
        total: 10,
        className: 'class-name-test'
      }).hasClass('class-name-test')).toBe(true)
    });
  });
});
