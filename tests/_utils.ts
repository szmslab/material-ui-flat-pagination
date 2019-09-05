import { ReactWrapper } from 'enzyme';
import Button, { ButtonProps } from '@material-ui/core/Button';
import PageButton, { PageButtonProps } from '../src/PageButton';

export const findPageButton = (wrapper: ReactWrapper<any>): ReactWrapper<PageButtonProps> => {
  return wrapper.find(PageButton);
};

export const findMuiButton = (wrapper: ReactWrapper<any>): ReactWrapper<ButtonProps> => {
  return wrapper.find(Button);
};
