import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { LAY_DANH_SACH_PHIM, LAY_THONG_TIN_LICH_CHIEU, LAY_THONG_TIN_PHIM } from './../types/QuanLyPhimTypes';
import { history } from './../../App';

export const layDanhSachPhimAction = (tenPhim = '') => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layDanhSachPhim(tenPhim);

      if (result.status === 200) {
        dispatch({
          type: LAY_DANH_SACH_PHIM,
          danhSachPhim: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};

export const layThongTinPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinPhim(maPhim);
      if (result.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_PHIM,
          arrFilmInfo: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};

export const layThongTinLichChieuAction = (maPhim) => {
  return async (dispatch) => {
    try {
      const result = await quanLyPhimService.layThongTinLichChieu(maPhim);
      if (result.status === 200) {
        dispatch({
          type: LAY_THONG_TIN_LICH_CHIEU,
          arrLichChieu: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};

export const xoaPhimAction = (maPhim) => {
  return async (dispatch) => {
    try {
      //Sử dụng tham số thamSo
      const result = await quanLyPhimService.xoaPhim(maPhim);
      alert('Xoá phim thành công !');
      //Sau khi xoá load lại danh sách phim mới;
      dispatch(layDanhSachPhimAction());
    } catch (errors) {
      console.log('errors', errors.response?.data);
    }
  };
};

export const capNhatPhimUploadAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.capNhatPhimUpload(formData);
      alert('Cập nhật phim thành công!');

      dispatch(layDanhSachPhimAction());
      history.push('/admin/film');
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};

export const themPhimUploadHinhAction = (formData) => {
  return async (dispatch) => {
    try {
      let result = await quanLyPhimService.themPhimUploadHinh(formData);
      alert('Thêm phim thành công!');
    } catch (errors) {
      console.log(errors.response?.data);
    }
  };
};
