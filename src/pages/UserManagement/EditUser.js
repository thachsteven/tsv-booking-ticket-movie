import { useFormik } from 'formik';
import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from './../../utils/settings/config';
import { Form, Input } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { history } from './../../App';
import { NavLink } from 'react-router-dom';
import {
  getInfoUserAction,
  getDSLoaiNguoiDungAction,
  updateInfoUserAction,
} from './../../Redux/actions/QuanLyNguoiDungAction';

export default function EditUser(props) {
  const { arrNguoiDung, arrUserInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getInfoUserAction(GROUPID, props.match.params.id));

    dispatch(getDSLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: arrUserInfo[0]?.taiKhoan,
      matKhau: arrUserInfo[0]?.matKhau,
      email: arrUserInfo[0]?.email,
      soDt: arrUserInfo[0]?.soDt,
      maNhom: GROUPID,
      maLoaiNguoiDung: arrUserInfo[0]?.maLoaiNguoiDung,
      hoTen: arrUserInfo[0]?.hoTen,
    },
    onSubmit: (values) => {
      dispatch(updateInfoUserAction(values));
    },
  });

  return (
    <div>
      <h1 className="ml-20 mb-8 text-xl text-red-600 font-bold">Chỉnh sửa thông tin người dùng</h1>

      <Form
        onSubmitCapture={formik.handleSubmit}
        className="flex justify-around mt-3 px-56"
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 50 }}
      >
        <div>
          <Form.Item label="Email">
            <Input onChange={formik.handleChange} name="email" value={formik.values.email} />
          </Form.Item>

          <Form.Item label="Họ tên">
            <Input onChange={formik.handleChange} name="hoTen" value={formik.values.hoTen} />
          </Form.Item>

          <Form.Item label="Số điện thoại">
            <Input onChange={formik.handleChange} name="soDt" value={formik.values.soDt} />
          </Form.Item>
          <Form.Item label="Trở lại">
            <RollbackOutlined
              onClick={() => {
                history.goBack();
              }}
              style={{ fontSize: 30, color: 'red' }}
            />
          </Form.Item>
        </div>
        <div>
          <Form.Item label="Tài khoản">
            <Input onChange={formik.handleChange} name="taiKhoan" disabled value={formik.values.taiKhoan} />
          </Form.Item>

          <Form.Item label="Mật khẩu">
            <Input.Password onChange={formik.handleChange} name="matKhau" value={formik.values.matKhau} />
          </Form.Item>
          <Form.Item label="Loại người dùng">
            <select
              name="maLoaiNguoiDung"
              onChange={formik.handleChange}
              style={{ width: 120, border: '1px solid rgb(209 209 209)' }}
              value={formik.values.maLoaiNguoiDung}
            >
              {arrNguoiDung?.map((item, index) => {
                return (
                  <option key={index} value={item.maLoaiNguoiDung}>
                    {item.tenLoai}
                  </option>
                );
              })}
            </select>
          </Form.Item>
          <Form.Item label="Tác vụ">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">Lưu</button>
            <NavLink to="/admin/quanlynguoidung/addnew">
              <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 ">
                Thêm mới
              </button>
            </NavLink>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
