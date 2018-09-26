import { mount, ReactWrapper, render, shallow } from 'enzyme';
import React from 'react';
import { findMuiButton, findPageButton } from './_utils';
import Pagination, { PaginationProps } from '../src/index';
import { PageVariant } from '../src/PageButton';

describe('Pagination', () => {
  const mockFn = jest.fn();

  beforeEach(() => {
    mockFn.mockClear();
  });

  const _test = (
    name: string,
    props: Partial<PaginationProps>,
    callback: (props: PaginationProps, wrapper: ReactWrapper) => void
  ) => {
    describe(name, () => {
      const limit = 10;
      const total = 90;
      for (let offset = 0; offset < total; offset += limit) {
        describe(`limit: ${limit}, offset: ${offset}, total: ${total}`, () => {
          const mergedProps = {
            limit,
            offset,
            total,
            ...props
          };
          const wrapper = mount(<Pagination {...mergedProps} />);
          callback(mergedProps, wrapper);
        });
      }
    });
  };

  const _testBoolean = (key: keyof PaginationProps, props: Partial<PaginationProps>) => {
    _test(`${key}: ${props[key]}`, props, (props, wrapper) => {
      const expected = !!props[key];
      it(`=> ${key} of buttons: ${expected}`, () => {
        findPageButton(wrapper).forEach(pageButton => {
          expect(pageButton.prop(key)).toBe(expected);
        });
      });
    });
  };

  describe('className: testClassName', () => {
    const expected = 'testClassName';
    const wrapper = render(<Pagination limit={10} offset={0} total={10} className={expected} />);
    it(`=> className of root: ${expected}`, () => {
      expect(wrapper.hasClass(expected)).toBe(true);
    });
  });

  describe('component: nav', () => {
    const expected = 'nav';
    const wrapper = render(<Pagination limit={10} offset={0} total={10} component={expected} />);
    it(`=> component of root: ${expected}`, () => {
      expect(wrapper.prop('name')).toBe(expected);
    });
  });

  _test('currentPageColor: inherit', { currentPageColor: 'inherit' }, (props, wrapper) => {
    const expected = props.currentPageColor;
    it(`=> color of current page button: ${expected}`, () => {
      findPageButton(wrapper).forEach(pageButton => {
        const isCurrent = pageButton.prop('pageVariant') === 'current';
        expect(findMuiButton(pageButton).prop('color')).toBe(isCurrent ? expected : 'primary');
      });
    });
  });

  _test('otherPageColor: inherit', { otherPageColor: 'inherit' }, (props, wrapper) => {
    const expected = props.otherPageColor;
    it(`=> color of other page buttons: ${expected}`, () => {
      findPageButton(wrapper).forEach(pageButton => {
        const isCurrent = pageButton.prop('pageVariant') === 'current';
        expect(findMuiButton(pageButton).prop('color')).toBe(isCurrent ? 'secondary' : expected);
      });
    });
  });

  _test('nextPageLabel: -next-', { nextPageLabel: '-next-' }, (props, wrapper) => {
    const expected = props.nextPageLabel;
    it(`=> label of next page button: ${expected}`, () => {
      const pageButton = findPageButton(wrapper).last();
      expect(pageButton.text()).toBe(expected);
    });
  });

  _test('previousPageLabel: -prev-', { previousPageLabel: '-prev-' }, (props, wrapper) => {
    const expected = props.previousPageLabel;
    it(`=> label of previous page button: ${expected}`, () => {
      const pageButton = findPageButton(wrapper).first();
      expect(pageButton.text()).toBe(expected);
    });
  });

  _test('onClick: defined', { onClick: mockFn }, (props, wrapper) => {
    it('=> onClick is called', () => {
      const pageButtons = findPageButton(wrapper);
      const previousButtonIndex = 0;
      const nextButtonIndex = pageButtons.length - 1;
      pageButtons.forEach((pageButton, index) => {
        mockFn.mockReset();
        pageButton.simulate('click');
        const pageVariant: PageVariant = pageButton.prop('pageVariant');
        switch (pageVariant) {
          case 'current':
          case 'ellipsis':
            expect(mockFn).not.toHaveBeenCalled();
            break;
          case 'end':
            if (
              (props.offset === 0 && index === previousButtonIndex) ||
              (props.offset === 80 && index === nextButtonIndex)
            ) {
              expect(mockFn).not.toHaveBeenCalled();
            } else {
              expect(mockFn).toHaveBeenCalled();
            }
            break;
          case 'standard':
            expect(mockFn).toHaveBeenCalled();
            break;
        }
      });
    });
  });

  _test('reduced: undefined', { total: 130 }, (props, wrapper) => {
    const index = props.offset / 10;
    const expected = [10, 10, 10, 11, 12, 13, 13, 13, 12, 11, 10, 10, 10][index];
    it(`=> count of buttons: ${expected}`, () => {
      expect(findPageButton(wrapper).length).toBe(expected);
    });
  });

  _test('reduced: true', { total: 130, reduced: true }, (props, wrapper) => {
    const index = props.offset / 10;
    const expected = [7, 7, 8, 9, 9, 9, 9, 9, 9, 9, 8, 7, 7][index];
    it(`=> count of buttons: ${expected}`, () => {
      expect(findPageButton(wrapper).length).toBe(expected);
    });
  });

  _test('size: large', { size: 'large' }, (props, wrapper) => {
    const expected = props.size;
    it(`=> size of buttons: ${expected}`, () => {
      findPageButton(wrapper).forEach(pageButton => {
        expect(findMuiButton(pageButton).prop('size')).toBe(expected);
      });
    });
  });

  _testBoolean('centerRipple', {});
  _testBoolean('centerRipple', { centerRipple: true });

  _testBoolean('disabled', {});
  _testBoolean('disabled', { disabled: true });

  _testBoolean('disableFocusRipple', {});
  _testBoolean('disableFocusRipple', { disableFocusRipple: true });

  _testBoolean('disableRipple', {});
  _testBoolean('disableRipple', { disableRipple: true });

  _testBoolean('fullWidth', {});
  _testBoolean('fullWidth', { fullWidth: true });

  describe('classes', () => {
    const wrapper = shallow(<Pagination limit={10} offset={0} total={10} />);

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
});
