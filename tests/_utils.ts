import { ReactWrapper } from 'enzyme';

export const findPageButton = (wrapper: ReactWrapper): ReactWrapper => {
  return wrapper.find('PageButton');
};

export const findMuiButton = (wrapper: ReactWrapper): ReactWrapper => {
  return wrapper.find('Button');
};
