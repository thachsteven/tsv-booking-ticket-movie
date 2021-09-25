import { baseService } from './baseService';
export class QuanLyNguoiDungService extends baseService {
  constructor() {
    super();
  }

  dangNhap = (thongTinDangNhap) => {
    return this.post(`/api/QuanLyNguoiDung/DangNhap`, thongTinDangNhap);
  };

  layThongTinNguoiDung = () => {
    return this.post('/api/QuanLyNguoiDung/ThongTinTaiKhoan');
  };
  dangKy = (thongTinDangKy) => {
    return this.post('/api/QuanLyNguoiDung/DangKy', thongTinDangKy);
  };

  capNhat = (thongTinCapNhat) => {
    return this.put('/api/QuanLyNguoiDung/CapNhatThongTinNguoiDung', thongTinCapNhat);
  };

  getUserList = (maNhom) => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}`);
  };

  getUserSearch = (maNhom, keyWord) => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${keyWord}`);
  };

  deleteUser = (TaiKhoan) => {
    return this.delete(`/api/QuanLyNguoiDung/XoaNguoiDung?TaiKhoan=${TaiKhoan}`);
  };

  getDSLoaiNguoiDung = () => {
    return this.get('/api/QuanLyNguoiDung/LayDanhSachLoaiNguoiDung');
  };

  themNguoiDung = (thongTinNguoiDung) => {
    return this.post(`/api/QuanLyNguoiDung/ThemNguoiDung`, thongTinNguoiDung);
  };

  getInfoUser = (maNhom, taiKhoan) => {
    return this.get(`/api/QuanLyNguoiDung/LayDanhSachNguoiDung?MaNhom=${maNhom}&tuKhoa=${taiKhoan}`);
  };
}

export const quanLyNguoiDungService = new QuanLyNguoiDungService();
