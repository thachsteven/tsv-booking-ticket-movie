import { TOKEN, USER_LOGIN } from '../../utils/settings/config';
import {
  DANG_NHAP_ACTION,
  GET_DS_LOAI_NGUOI_DUNG,
  GET_INFO_USER,
  GET_USER_LIST,
  GET_USER_SEARCH,
  SET_THONG_TIN_NGUOI_DUNG,
} from './../types/QuanLyNguoiDungType';

let user = {};
if (localStorage.getItem(USER_LOGIN)) {
  user = JSON.parse(localStorage.getItem(USER_LOGIN));
}
const initialState = {
  userLogin: user,
  thongTinNguoiDung: [],
  arrNguoiDung: [],
  arrUser: [],
  arrUserSearch: [],
  arrUserInfo: [],
};

export const QuanLyNguoiDungReducer = (state = initialState, action) => {
  switch (action.type) {
    case DANG_NHAP_ACTION: {
      const { thongTinDangNhap } = action;
      localStorage.setItem(USER_LOGIN, JSON.stringify(thongTinDangNhap));
      localStorage.setItem(TOKEN, thongTinDangNhap.accessToken);
      return { ...state, userLogin: thongTinDangNhap };
    }
    case SET_THONG_TIN_NGUOI_DUNG: {
      return { ...state, thongTinNguoiDung: action.thongTinNguoiDung };
    }
    case GET_DS_LOAI_NGUOI_DUNG: {
      return { ...state, arrNguoiDung: action.arrNguoiDung };
    }
    case GET_USER_LIST: {
      return { ...state, arrUser: action.arrUser };
    }
    case GET_USER_SEARCH: {
      return { ...state, arrUserSearch: action.arrUserSearch };
    }
    case GET_INFO_USER: {
      return { ...state, arrUserInfo: action.arrUserInfo };
    }
    default:
      return { ...state };
  }
};
