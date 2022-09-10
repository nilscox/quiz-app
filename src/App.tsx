import { Provider as ReduxProvider } from 'react-redux';

import { configureStore } from './store/configure-store';

const store = configureStore();

export const App: React.FC = () => {
  return <ReduxProvider store={store}>app</ReduxProvider>;
};
