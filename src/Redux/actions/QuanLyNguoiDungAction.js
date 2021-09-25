import { history } from '../../App';
import { quanLyNguoiDungService } from '../../services/QuanLyNguoiDungService';
import { TOKEN, USER_LOGIN } from '../../utils/settings/config';
import {
  DANG_NHAP_ACTION,
  GET_DS_LOAI_NGUOI_DUNG,
  GET_INFO_USER,
  GET_USER_LIST,
  GET_USER_SEARCH,
  SET_THONG_TIN_NGUOI_DUNG,
} from '../types/QuanLyNguoiDungType';
import { notifiFunction } from './../../utils/Notification/Notification';
import { GROUPID } from './../../utils/settings/config';

export const dangNhapAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangNhap(thongTinDangNhap);

      if (result.data.statusCode === 200) {
        dispatch({
          type: DANG_NHAP_ACTION,
          thongTinDangNhap: result.data.content,
        });
        //Chuyển hướng đăng nhập về trang trước đó
        history.push('/');
        notifiFunction('success', 'Đăng nhập thành công');
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};

export const layThongTinNguoiDungAction = (thongTinDangNhap) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.layThongTinNguoiDung();

      if (result.data.statusCode === 200) {
        dispatch({
          type: SET_THONG_TIN_NGUOI_DUNG,
          thongTinNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response.data);
    }
  };
};

//Đăng ký

export const dangKyAction = (thongTinDangKy) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.dangKy(thongTinDangKy);

      if (result.data.statusCode === 200) {
        history.push('/login');

        notifiFunction('success', 'Đăng ký tài khoản thành công');
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};

//Get ds loại người dùng

export const getDSLoaiNguoiDungAction = () => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.getDSLoaiNguoiDung();
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_DS_LOAI_NGUOI_DUNG,
          arrNguoiDung: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
};

//cập nhật người dùng

export const capNhatUserAction = (thongTinChinhSua) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhat(thongTinChinhSua);
      if (result.data.statusCode === 200) {
        dispatch(layThongTinNguoiDungAction());
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push('/login');
        notifiFunction('success', 'Cập nhật thông tin thành công, vui lòng đăng nhập lại');
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};

//lấy danh sách user

export const getUserListAction = (maNhom) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.getUserList(maNhom);
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_USER_LIST,
          arrUser: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
};

//Delete user

export const deleteUserAction = (TaiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.deleteUser(TaiKhoan);
      if (result.data.statusCode === 200) {
        dispatch(getUserListAction(GROUPID));
        notifiFunction('success', result.data.content);
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};

//get list user search

export const getListUserSearch = (maNhom, keyWord) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.getUserSearch(maNhom, keyWord);
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_USER_SEARCH,
          arrUserSearch: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
};

//Get info user

export const getInfoUserAction = (maNhom, taiKhoan) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.getInfoUser(maNhom, taiKhoan);
      if (result.data.statusCode === 200) {
        dispatch({
          type: GET_INFO_USER,
          arrUserInfo: result.data.content,
        });
      }
    } catch (error) {
      console.log(error.response.data.content);
    }
  };
};

//cập nhật info user

export const updateInfoUserAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.capNhat(thongTinNguoiDung);
      if (result.data.statusCode === 200) {
        dispatch(getUserListAction(GROUPID));
        localStorage.removeItem(USER_LOGIN);
        localStorage.removeItem(TOKEN);
        history.push('/login');
        notifiFunction('success', 'Cập nhật thông tin thành công, vui lòng đăng nhập lại');
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};

//Thêm người dùng

export const themNguoiDungAction = (thongTinNguoiDung) => {
  return async (dispatch) => {
    try {
      const result = await quanLyNguoiDungService.themNguoiDung(thongTinNguoiDung);
      if (result.data.statusCode === 200) {
        history.push('/admin/quanlynguoidung');
        notifiFunction('success', 'Thêm người dùng thành công');
      }
    } catch (error) {
      notifiFunction('error', error.response.data.content);
    }
  };
};
