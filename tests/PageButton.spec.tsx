import { PropTypes } from '@material-ui/core';
import { mount, ReactWrapper, shallow } from 'enzyme';
import * as React from 'react';
import { findMuiButton } from './_utils';
import PageButton, { PageVariant } from '../src/PageButton';

describe('PageButton', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    mockFn.mockClear();
  });

  const createProps = (pageVariant: PageVariant) => ({
    pageVariant,
    currentPageColor: 'secondary' as PropTypes.Color,
    otherPageColor: 'primary' as PropTypes.Color,
    onClick: mockFn
  });

  const _test = (pageVariant: PageVariant) => (callback: (pageVariant: PageVariant) => void) => {
    describe(`pageVariant: ${pageVariant}`, () => {
      callback(pageVariant);
    });
  };

  class Tester {
    private wrapper: ReactWrapper;

    public constructor(wrapper: ReactWrapper) {
      this.wrapper = wrapper;
    }

    public color(expected?: string) {
      it(`=> color: ${expected}`, () => {
        expect(findMuiButton(this.wrapper).prop('color')).toBe(expected);
      });
    }

    public disabled(expected: boolean) {
      it(`=> disabled: ${expected}`, () => {
        expect(findMuiButton(this.wrapper).prop('disabled')).toBe(expected);
      });
    }

    public disableRipple(expected: boolean) {
      it(`=> disableRipple: ${expected}`, () => {
        expect(findMuiButton(this.wrapper).prop('disableRipple')).toBe(expected);
      });
    }

    public onClick(defined: boolean) {
      it(`=> onClick: ${defined ? 'defined' : 'undefined'}`, () => {
        const matcher = expect(findMuiButton(this.wrapper).prop('onClick'));
        defined ? matcher.toBeDefined() : matcher.toBeUndefined();
      });
    }

    public text(expected?: string) {
      it(`=> text: ${expected}`, () => {
        expect(findMuiButton(this.wrapper).text()).toBe(expected);
      });
    }

    public callOnClick(called: boolean) {
      it(`=> onClick is called: ${called}`, () => {
        this.wrapper.simulate('click');
        const fnMatcher = expect(mockFn);
        called ? fnMatcher.toHaveBeenCalled() : fnMatcher.not.toHaveBeenCalled();
      });
    }
  }

  _test('current')(pageVariant => {
    describe('page: 1, limit: 10, total: 10', () => {
      const wrapper = mount(
        <PageButton page={1} limit={10} total={10} {...createProps(pageVariant)}>
          {1}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('secondary');
      tester.disabled(false);
      tester.disableRipple(true);
      tester.onClick(false);
      tester.text('1');
      tester.callOnClick(false);
    });
  });

  _test('ellipsis')(pageVariant => {
    describe('page: 0, limit: 10, total: 10', () => {
      const wrapper = mount(
        <PageButton page={0} limit={10} total={10} {...createProps(pageVariant)}>
          {'...'}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('primary');
      tester.disabled(true);
      tester.disableRipple(true);
      tester.onClick(false);
      tester.text('...');
      tester.callOnClick(false);
    });
  });

  _test('end')(pageVariant => {
    describe('page: 0, limit: 10, total: 10', () => {
      const wrapper = mount(
        <PageButton page={0} limit={10} total={10} {...createProps(pageVariant)}>
          {'<'}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('primary');
      tester.disabled(true);
      tester.disableRipple(true);
      tester.onClick(false);
      tester.text('<');
      tester.callOnClick(false);
    });

    describe('page: 1, limit: 10, total: 10', () => {
      const wrapper = mount(
        <PageButton page={1} limit={10} total={10} {...createProps(pageVariant)}>
          {<span>{'<'}</span>}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('primary');
      tester.disabled(false);
      tester.disableRipple(false);
      tester.onClick(true);
      tester.text('<');
      tester.callOnClick(true);
    });
  });

  _test('standard')(pageVariant => {
    describe('page: 1, limit: 10, total: 0', () => {
      const wrapper = mount(
        <PageButton page={1} limit={10} total={0} {...createProps(pageVariant)}>
          {1}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('primary');
      tester.disabled(true);
      tester.disableRipple(true);
      tester.onClick(false);
      tester.text('1');
      tester.callOnClick(false);
    });

    describe('page: 1, limit: 10, total: 10', () => {
      const wrapper = mount(
        <PageButton page={1} limit={10} total={10} {...createProps(pageVariant)}>
          {1}
        </PageButton>
      );

      const tester = new Tester(wrapper);
      tester.color('primary');
      tester.disabled(false);
      tester.disableRipple(false);
      tester.onClick(true);
      tester.text('1');
      tester.callOnClick(true);
    });
  });

  describe('classes', () => {
    const wrapper = shallow(
      <PageButton page={1} limit={10} total={10} pageVariant={'standard'}>
        {1}
      </PageButton>
    );

    const classes = wrapper.prop('classes');
    [
      'root',
      'rootCurrent',
      'rootEllipsis',
      'rootEnd',
      'rootStandard',
      'label',
      'text',
      'textPrimary',
      'textSecondary',
      'colorInherit',
      'colorInheritCurrent',
      'colorInheritOther',
      'disabled',
      'sizeSmall',
      'sizeSmallCurrent',
      'sizeSmallEllipsis',
      'sizeSmallEnd',
      'sizeSmallStandard',
      'sizeLarge',
      'sizeLargeCurrent',
      'sizeLargeEllipsis',
      'sizeLargeEnd',
      'sizeLargeStandard',
      'fullWidth'
    ].forEach(propertyName => {
      it(`=> ${propertyName}`, () => {
        expect(classes).toHaveProperty(propertyName);
      });
    });
  });

  describe('renderButton prop', () => {
    describe('using page', () => {
      const wrapper = mount(
        <PageButton
          page={1}
          limit={10}
          total={10}
          pageVariant="current"
          renderButton={({ page, children }) => <a href={`?page=${page}`}>{children}</a>}
        >
          {1}
        </PageButton>
      );

      const link = wrapper.find('a');
      expect(link.prop('href')).toEqual('?page=1');
    });
    describe('using offset', () => {
      const wrapper = mount(
        <PageButton
          page={1}
          limit={10}
          total={10}
          pageVariant="current"
          renderButton={({ offset, children }) => <a href={`?offset=${offset}`}>{children}</a>}
        >
          {1}
        </PageButton>
      );

      const link = wrapper.find('a');
      expect(link.prop('href')).toEqual('?offset=0');
    });
  });
});
