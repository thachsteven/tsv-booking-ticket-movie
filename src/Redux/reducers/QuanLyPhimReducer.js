import {
  LAY_DANH_SACH_PHIM,
  LAY_THONG_TIN_LICH_CHIEU,
  LAY_THONG_TIN_PHIM,
  SET_PHIM_DANG_CHIEU,
  SET_PHIM_SAP_CHIEU,
} from './../types/QuanLyPhimTypes';
const initialState = {
  danhSachPhim: [],
  danhSachPhimDefault: [],
  dangChieu: true,
  sapChieu: true,
  arrFilmInfo: [],
  arrLichChieu: [],
};

export const QuanLyPhimReducer = (state = initialState, action) => {
  switch (action.type) {
    case LAY_DANH_SACH_PHIM: {
      state.danhSachPhim = action.danhSachPhim;
      state.danhSachPhimDefault = state.danhSachPhim;
      return { ...state };
    }
    case SET_PHIM_DANG_CHIEU: {
      state.dangChieu = !state.dangChieu;

      state.danhSachPhim = state.danhSachPhimDefault.filter((film) => film.dangChieu === state.dangChieu);
      return { ...state };
    }
    case SET_PHIM_SAP_CHIEU: {
      state.sapChieu = !state.sapChieu;

      state.danhSachPhim = state.danhSachPhimDefault.filter((film) => film.sapChieu === state.sapChieu);
      return { ...state };
    }
    case LAY_THONG_TIN_PHIM: {
      return { ...state, arrFilmInfo: action.arrFilmInfo };
    }
    case LAY_THONG_TIN_LICH_CHIEU: {
      return { ...state, arrLichChieu: action.arrLichChieu };
    }
    default:
      return { ...state };
  }
};
