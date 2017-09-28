'use strict';

import React from 'react';
import {mount} from 'enzyme';
import {mountToJson} from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatPagination from '../src/FlatPagination';
import NavigationArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import NavigationArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';

describe('Pagination Label', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FlatPagination {...props}/>
      </MuiThemeProvider>
    ).find('.material-ui-flat-pagination');
  };

  // ********************************************************************************
  describe('nextPageLabel', () => {
    const props = {offset: 0, limit: 10, total: 10, nextPageLabel: <NavigationArrowForward/>};

    it('React element (NavigationArrowForward)', () => {
      expect(wrapper(props).find('button').last().find('svg')).toHaveLength(1);
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });
  });

  // ********************************************************************************
  describe('previousPageLabel', () => {
    const props = {offset: 0, limit: 10, total: 10, previousPageLabel: <NavigationArrowBack/>};

    it('React element (NavigationArrowBack)', () => {
      expect(wrapper(props).find('button').first().find('svg')).toHaveLength(1);
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });
  });

});
