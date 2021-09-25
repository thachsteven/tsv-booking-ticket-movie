import { LAY_DANH_SACH_HE_THONG_RAP } from './../types/QuanLyRapType';
const initialState = {
  arrHeThongRap: [],
};

export const QuanLyRapReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_HE_THONG_RAP: {
      return { ...state, arrHeThongRap: action.arrHeThongRap };
    }

    default:
      return { ...state };
  }
};
