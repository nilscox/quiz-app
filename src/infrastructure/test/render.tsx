import { render as testingLibraryRender } from '@testing-library/react';
import { Provider as ReduxProvider } from 'react-redux';

import { configureTestStore } from '../../domain/test/configure-test-store';
import { AppStore } from '../../store/store-types';

export { act, screen, fireEvent } from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';

type TestWrapperProps = {
  store?: AppStore;
  children: React.ReactNode;
};

const TestWrapper = ({ store, children }: TestWrapperProps) => (
  <ReduxProvider store={store ?? configureTestStore()}>{children}</ReduxProvider>
);

export const render = (ui: React.ReactElement, store?: AppStore) => {
  return testingLibraryRender(ui, { wrapper: (props) => <TestWrapper store={store} {...props} /> });
};
