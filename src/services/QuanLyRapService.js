import { baseService } from './baseService';

export class QuanLyRapService extends baseService {
  constructor() {
    super();
  }

  layThongTinHeThongRap = (maNhom) => {
    return this.get(`/api/QuanLyRap/LayThongTinLichChieuHeThongRap?maNhom=${maNhom}`);
  };

  layThongTinHeThongRapShowTime = () => {
    return this.get(`/api/QuanLyRap/LayThongTinHeThongRap`);
  };
  layThongTinCumRap = (maHeThongRap) => {
    return this.get(`/api/QuanLyRap/LayThongTinCumRapTheoHeThong?maHeThongRap=${maHeThongRap}`);
  };
}

export const quanLyRapService = new QuanLyRapService();
