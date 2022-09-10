import { useDispatch } from 'react-redux';

import { AppDispatch } from '../../store/store-types';

export const useAppDispatch = useDispatch<AppDispatch>;
