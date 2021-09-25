import { quanLyDatVeService } from '../../services/QuanLyDatVeService';
import { quanLyPhimService } from '../../services/QuanLyPhimService';
import { LAY_DANH_SACH_PHIM, LAY_THONG_TIN_LICH_CHIEU, LAY_THONG_TIN_PHIM } from './../types/QuanLyPhimTypes';
import { DAT_VE, LAY_DANH_SACH_PHONG_VE } from './../types/QuanLyPhongVe';
import { notification } from 'antd';
import { notifiFunction } from './../../utils/Notification/Notification';
import { DISPLAY_LOADING, HIDE_LOADING } from '../types/LoadingType';

export const layDanhSachPhongVeAction = (maLichChieu) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.layDanhSachPhongVe(maLichChieu);

      if (result.status === 200) {
        dispatch({
          type: LAY_DANH_SACH_PHONG_VE,
          danhSachPhongVe: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};

export const datGheAction = (ghe, maLichChieu) => {
  return async (dispatch, getState) => {
    //Đưa thông tin ghế lên reducer
    await dispatch({
      type: DAT_VE,
      gheDuocChon: ghe,
    });
  };
};

export const datVeAction = (thongTinDatVe) => {
  return async (dispatch) => {
    try {
      const result = await quanLyDatVeService.datVe(thongTinDatVe);
      window.location.reload();
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};
