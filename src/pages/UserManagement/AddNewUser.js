import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from './../../utils/settings/config';
import * as Yup from 'yup';
import { useEffect } from 'react';
import { useFormik } from 'formik';
import { Form, Input } from 'antd';
import { RollbackOutlined } from '@ant-design/icons';
import { history } from './../../App';
import { getDSLoaiNguoiDungAction, themNguoiDungAction } from '../../Redux/actions/QuanLyNguoiDungAction';

export default function AddNewUser() {
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const { arrNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getDSLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: '',
      matKhau: '',
      email: '',
      soDt: '',
      maNhom: GROUPID,
      maLoaiNguoiDung: arrNguoiDung[0]?.maLoaiNguoiDung,
      hoTen: '',
    },
    validationSchema: Yup.object().shape({
      taiKhoan: Yup.string().required('Tài khoản không được bỏ trống'),
      email: Yup.string().required('Email không được bỏ trống').email('Email không hợp lệ'),
      hoTen: Yup.string().required('Họ tên không được bỏ trống'),
      soDt: Yup.string()
        .required('Số điện thoại không được bỏ trống')
        .matches(phoneRegExp, 'Số điện thoại phải từ 10 đến 12 số'),
      matKhau: Yup.string()
        .required('Mật khẩu không được bỏ trống')
        .min(6, 'Mật khẩu ít nhất phải 6 kí tự')
        .max(32, 'Mật khẩu nhiều nhất là 32 kí tự'),
    }),
    onSubmit: (values) => {
      dispatch(themNguoiDungAction(values));
    },
  });

  return (
    <div>
      <h1 className="ml-28 mb-4 text-xl text-red-600 font-bold">Thêm người dùng mới</h1>
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="flex justify-around mt-3 px-56"
        name="basic"
        labelCol={{ span: 10 }}
        wrapperCol={{ span: 50 }}
      >
        <div>
          <Form.Item label="Email">
            <Input onChange={formik.handleChange} name="email" />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
          </Form.Item>

          <Form.Item label="Họ tên">
            <Input onChange={formik.handleChange} name="hoTen" />
            {formik.errors.hoTen && formik.touched.hoTen ? (
              <div className="text-red-500 text-xs">{formik.errors.hoTen}</div>
            ) : null}
          </Form.Item>

          <Form.Item label="Số điện thoại">
            <Input onChange={formik.handleChange} name="soDt" />
            {formik.errors.soDt && formik.touched.soDt ? (
              <div className="text-red-500 text-xs">{formik.errors.soDt}</div>
            ) : null}
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
            <Input onChange={formik.handleChange} name="taiKhoan" />
            {formik.errors.taiKhoan && formik.touched.taiKhoan ? (
              <div className="text-red-500 text-xs">{formik.errors.taiKhoan}</div>
            ) : null}
          </Form.Item>

          <Form.Item label="Mật khẩu">
            <Input.Password onChange={formik.handleChange} name="matKhau" />
            {formik.errors.matKhau && formik.touched.matKhau ? (
              <div className="text-red-500 text-xs">{formik.errors.matKhau}</div>
            ) : null}
          </Form.Item>
          <Form.Item label="Loại người dùng">
            <select
              name="maLoaiNguoiDung"
              onChange={formik.handleChange}
              style={{ width: 120, border: '1px solid rgb(209 209 209)' }}
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
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded ">Thêm</button>
          </Form.Item>
        </div>
      </Form>
    </div>
  );
}
