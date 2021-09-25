import { DAT_VE, LAY_DANH_SACH_PHONG_VE } from '../types/QuanLyPhongVe';

const initialState = {
  danhSachPhongVe: [],
  danhSachGheDangDat: [],
};

export const QuanLyDatVeReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHONG_VE: {
      return { ...state, danhSachPhongVe: action.danhSachPhongVe };
    }

    case DAT_VE: {
      let danhSachGheCapNhat = [...state.danhSachGheDangDat];

      let index = danhSachGheCapNhat.findIndex((gheDD) => gheDD.maGhe === action.gheDuocChon.maGhe);
      if (index != -1) {
        danhSachGheCapNhat.splice(index, 1);
      } else {
        danhSachGheCapNhat.push(action.gheDuocChon);
      }
      return { ...state, danhSachGheDangDat: danhSachGheCapNhat };
    }

    default:
      return { ...state };
  }
};
