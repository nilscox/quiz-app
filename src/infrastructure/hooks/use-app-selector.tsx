import { useSelector } from 'react-redux';

import { AppSelector, AppState } from '../../store/store-types';

export const useAppSelector = <ReturnType, Parameters extends unknown[]>(
  selector: AppSelector<ReturnType, Parameters>,
  ...params: Parameters
) => {
  return useSelector<AppState, ReturnType>((state) => selector(state, ...params));
};
