import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import { QuanLyPhimReducer } from './reducers/QuanLyPhimReducer';
import { QuanLyRapReducer } from './reducers/QuanLyRapReducer';
import { QuanLyDatVeReducer } from './reducers/QuanLyDatVeReducer';
import { QuanLyNguoiDungReducer } from './reducers/QuanLyNguoiDungReducer';

const rootReducer = combineReducers({
  //state ứng dụng
  QuanLyPhimReducer,
  QuanLyRapReducer,
  QuanLyDatVeReducer,
  QuanLyNguoiDungReducer,
});

export const store = createStore(rootReducer, applyMiddleware(thunk));
