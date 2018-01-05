'use strict';

import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {configure, mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {mountToJson} from 'enzyme-to-json';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import FlatPagination from '../src/FlatPagination';

configure({adapter: new Adapter()});

describe('Default Pagination (reduced=false)', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FlatPagination {...props}/>
      </MuiThemeProvider>
    ).find('.material-ui-flat-pagination');
  };

  const anyObj = expect.any(Object);

  const clickWrapper = (testFn) => {
    testFn('onClick', 'click');
  };

  // ********************************************************************************
  describe('offset: 0, limit: 10, total: 10', () => {
    const props = {offset: 0, limit: 10, total: 10};
    const labels = ['<', '1', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          it(`buttons[${i}] not toBeCalled`, () => {
            ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
            expect(fnMock).not.toBeCalled();
          });
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 0, limit: 10, total: 11', () => {
    const props = {offset: 0, limit: 10, total: 11};
    const labels = ['<', '1', '2', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i <= 1) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            it(`buttons[${i}] toBeCalledWith(e: Object, offset: 10)`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, 10);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 10, limit: 10, total: 11', () => {
    const props = {offset: 10, limit: 10, total: 11};
    const labels = ['<', '1', '2', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i <= 1) {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            it(`buttons[${i}] toBeCalledWith(e: Object, offset: 0)`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, 0);
            });
          } else {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 0, limit: 10, total: 100', () => {
    const props = {offset: 0, limit: 10, total: 100};
    const labels = ['<', '1', '2', '3', '4', '5', '...', '9', '10', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i <= 1 || i === 6) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 7 || i === 8) {
                return i + 1;
              } else if (i === 9) {
                return 1;
              }
              return i - 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 40, limit: 10, total: 100', () => {
    const props = {offset: 40, limit: 10, total: 100};
    const labels = ['<', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 5) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 3;
              } else if (i === 11) {
                return 5;
              }
              return i - 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 50, limit: 10, total: 100', () => {
    const props = {offset: 50, limit: 10, total: 100};
    const labels = ['<', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 6) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 4;
              } else if (i === 11) {
                return 6;
              }
              return i - 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 90, limit: 10, total: 100', () => {
    const props = {offset: 90, limit: 10, total: 100};
    const labels = ['<', '1', '2', '...', '6', '7', '8', '9', '10', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 3 || i >= 8) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 8;
              } else if (i === 1 || i === 2) {
                return i - 1;
              }
              return i + 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 0, limit: 10, total: 1000', () => {
    const props = {offset: 0, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '3', '4', '5', '...', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i <= 1 || i === 6) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 7 || i === 8) {
                return 90 + i + 1;
              } else if (i === 9) {
                return 1;
              }
              return i - 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 50, limit: 10, total: 1000', () => {
    const props = {offset: 50, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '3', '4', '5', '6', '7', '8', '...', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 6 || i === 9) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 4;
              } else if (i === 10 || i === 11) {
                return 90 + i - 2;
              } else if (i === 12) {
                return 6;
              }
              return i - 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 60, limit: 10, total: 1000', () => {
    const props = {offset: 60, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '...', '5', '6', '7', '8', '9', '...', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 3 || i === 6 || i === 9) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 5;
              } else if (i === 1 || i === 2) {
                return i - 1;
              } else if (i === 10 || i === 11) {
                return 90 + i - 2;
              } else if (i === 12) {
                return 7;
              }
              return i;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 930, limit: 10, total: 1000', () => {
    const props = {offset: 930, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '...', '92', '93', '94', '95', '96', '...', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 3 || i === 6 || i === 9) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 92;
              } else if (i === 1 || i === 2) {
                return i - 1;
              } else if (i === 10 || i === 11) {
                return 90 + i - 2;
              } else if (i === 12) {
                return 94;
              }
              return 90 + i - 3;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 940, limit: 10, total: 1000', () => {
    const props = {offset: 940, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '...', '93', '94', '95', '96', '97', '98', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 3 || i === 6) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 93;
              } else if (i === 1 || i === 2) {
                return i - 1;
              } else if (i === 12) {
                return 95;
              }
              return 90 + i - 2;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });

  // ********************************************************************************
  describe('offset: 990, limit: 10, total: 1000', () => {
    const props = {offset: 990, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '...', '96', '97', '98', '99', '100', '>'];
    const buttonCount = labels.length;

    it('number of buttons', () => {
      const buttons = wrapper(props).find('button');
      expect(buttons).toHaveLength(buttonCount);
    });

    it(`label of buttons [${labels}]`, () => {
      const buttons = wrapper(props).find('button');
      for (let i = 0; i < buttonCount; i++) {
        expect(buttons.at(i).text()).toBe(labels[i]);
      }
    });

    it('snapshot', () => {
      const target = mountToJson(wrapper(props));
      expect(target).toMatchSnapshot();
    });

    const clickFn = (propName, simulateName) => {
      describe(propName, () => {
        const fnMock = jest.fn();
        const buttons = wrapper(props, {[propName]: fnMock}).find('button');

        afterEach(() => {
          fnMock.mockClear();
        });

        for (let i = 0; i < buttonCount; i++) {
          if (i === 3 || i >= 8) {
            it(`buttons[${i}] not toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).not.toBeCalled();
            });
          } else {
            it(`buttons[${i}] toBeCalled`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalled();
            });

            const offset = (() => {
              if (i === 0) {
                return 98;
              } else if (i === 1 || i === 2) {
                return i - 1;
              }
              return 90 + i + 1;
            })() * 10;
            it(`buttons[${i}] toBeCalledWith(e: Object, offset: ${offset})`, () => {
              ReactTestUtils.Simulate[simulateName](buttons.at(i).instance());
              expect(fnMock).toBeCalledWith(anyObj, offset);
            });
          }
        }
      });
    };
    clickWrapper(clickFn);
  });
});
