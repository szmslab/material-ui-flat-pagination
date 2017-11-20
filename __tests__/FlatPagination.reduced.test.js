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

describe('Reduced Pagination (reduced=true)', () => {
  const wrapper = (commonProps, otherProps) => {
    const props = Object.assign({}, commonProps, otherProps);
    return mount(
      <MuiThemeProvider muiTheme={getMuiTheme()}>
        <FlatPagination {...props} reduced={true}/>
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
  describe('offset: 0, limit: 10, total: 60', () => {
    const props = {offset: 0, limit: 10, total: 60};
    const labels = ['<', '1', '2', '3', '...', '6', '>'];
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
          if (i <= 1 || i === 4) {
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
                if (i === 5) {
                  return i;
                } else if (i === 6) {
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
  describe('offset: 20, limit: 10, total: 60', () => {
    const props = {offset: 20, limit: 10, total: 60};
    const labels = ['<', '1', '2', '3', '4', '5', '6', '>'];
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
          if (i === 3) {
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
                  return 1;
                } else if (i === 7) {
                  return 3;
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
  describe('offset: 30, limit: 10, total: 60', () => {
    const props = {offset: 30, limit: 10, total: 60};
    const labels = ['<', '1', '2', '3', '4', '5', '6', '>'];
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
          if (i === 4) {
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
                  return 2;
                } else if (i === 7) {
                  return 4;
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
  describe('offset: 50, limit: 10, total: 60', () => {
    const props = {offset: 50, limit: 10, total: 60};
    const labels = ['<', '1', '...', '4', '5', '6', '>'];
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
          if (i === 2 || i >= 5) {
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
                } else if (i === 1) {
                  return i - 1;
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
  describe('offset: 0, limit: 10, total: 1000', () => {
    const props = {offset: 0, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '3', '...', '100', '>'];
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
          if (i <= 1 || i === 4) {
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
                if (i === 5) {
                  return 99;
                } else if (i === 6) {
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
  describe('offset: 30, limit: 10, total: 1000', () => {
    const props = {offset: 30, limit: 10, total: 1000};
    const labels = ['<', '1', '2', '3', '4', '5', '...', '100', '>'];
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
          if (i === 4 || i === 6) {
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
                  return 2;
                } else if (i === 7) {
                  return 99;
                } else if (i === 8) {
                  return 4;
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
  describe('offset: 40, limit: 10, total: 1000', () => {
    const props = {offset: 40, limit: 10, total: 1000};
    const labels = ['<', '1', '...', '4', '5', '6', '...', '100', '>'];
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
          if (i === 2 || i === 4 || i === 6) {
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
                } else if (i === 1) {
                  return 0;
                } else if (i === 7) {
                  return 99;
                } else if (i === 8) {
                  return 5;
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
  describe('offset: 950, limit: 10, total: 1000', () => {
    const props = {offset: 950, limit: 10, total: 1000};
    const labels = ['<', '1', '...', '95', '96', '97', '...', '100', '>'];
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
          if (i === 2 || i === 4 || i === 6) {
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
                  return 94;
                } else if (i === 1) {
                  return 0;
                } else if (i === 7) {
                  return 99;
                } else if (i === 8) {
                  return 96;
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

  // ********************************************************************************
  describe('offset: 960, limit: 10, total: 1000', () => {
    const props = {offset: 960, limit: 10, total: 1000};
    const labels = ['<', '1', '...', '96', '97', '98', '99', '100', '>'];
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
          if (i === 2 || i === 4) {
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
                  return 95;
                } else if (i === 1) {
                  return 0;
                } else if (i === 8) {
                  return 97;
                }
                return 90 + i + 2;
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
    const labels = ['<', '1', '...', '98', '99', '100', '>'];
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
          if (i === 2 || i >= 5) {
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
                } else if (i === 1) {
                  return 0;
                }
                return 90 + i + 4;
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
