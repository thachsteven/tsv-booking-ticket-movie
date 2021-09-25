import { quanLyRapService } from '../../services/QuanLyRapService';
import { LAY_DANH_SACH_HE_THONG_RAP } from '../types/QuanLyRapType';

export const layThongTinHeThongRap = (maNhom) => {
  return async (dispatch) => {
    try {
      const result = await quanLyRapService.layThongTinHeThongRap(maNhom);

      if (result.status === 200) {
        dispatch({
          type: LAY_DANH_SACH_HE_THONG_RAP,
          arrHeThongRap: result.data.content,
        });
      }
    } catch (error) {
      console.log('error', error.response?.data);
    }
  };
};
