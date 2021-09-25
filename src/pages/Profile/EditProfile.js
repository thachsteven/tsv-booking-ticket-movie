import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GROUPID } from '../../utils/settings/config';
import * as Yup from 'yup';
import { Button, Input, Form } from 'antd';
import {
  capNhatUserAction,
  getDSLoaiNguoiDungAction,
  layThongTinNguoiDungAction,
} from '../../Redux/actions/QuanLyNguoiDungAction';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';

export default function EditProfile() {
  const { thongTinNguoiDung, arrNguoiDung, arrUserInfo } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { email, hoTen, matKhau, taiKhoan, soDT } = thongTinNguoiDung;
  const phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/;
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
    dispatch(getDSLoaiNguoiDungAction());
  }, []);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      email: email,
      soDt: soDT,
      maNhom: GROUPID,
      maLoaiNguoiDung: arrNguoiDung[0]?.maLoaiNguoiDung,
      hoTen: hoTen,
    },

    validationSchema: Yup.object().shape({
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
      console.log('values', values);
      dispatch(capNhatUserAction(values));
    },
  });

  return (
    <div>
      <div>
        <img
          style={{ width: '100%' }}
          src="https://portal.vietcombank.com.vn/VCBDigital/2019/vn/img/menu/bg-vcb.jpg"
          alt="123"
        />
      </div>
      <div className="px-48 mt-4 text-red-500 font-bold text-xl">{t('Chỉnh sửa thông tin tài khoản')}</div>
      <Form
        onSubmitCapture={formik.handleSubmit}
        className="flex justify-center mt-3"
        name="basic"
        labelCol={{ span: 11 }}
        wrapperCol={{ span: 30 }}
      >
        <div>
          <Form.Item label={t('Email')}>
            <Input onChange={formik.handleChange} name="email" value={formik.values.email} />
            {formik.errors.email && formik.touched.email ? (
              <div className="text-red-500 text-xs">{formik.errors.email}</div>
            ) : null}
          </Form.Item>

          <Form.Item label={t('Họ tên')}>
            <Input onChange={formik.handleChange} name="hoTen" value={formik.values.hoTen} />
            {formik.errors.hoTen && formik.touched.hoTen ? (
              <div className="text-red-500 text-xs">{formik.errors.hoTen}</div>
            ) : null}
          </Form.Item>

          <Form.Item label={t('Số điện thoại')}>
            <Input onChange={formik.handleChange} name="soDt" value={formik.values.soDt} />
            {formik.errors.soDt && formik.touched.soDt ? (
              <div className="text-red-500 text-xs">{formik.errors.soDt}</div>
            ) : null}
          </Form.Item>
          <Form.Item label={t('Tác vụ')}>
            <Button type="primary" htmlType="submit">
              {t('Cập nhật')}
            </Button>
          </Form.Item>
        </div>
        <div>
          <Form.Item label={t('Tài khoản')}>
            <Input disabled onChange={formik.handleChange} name="taiKhoan" value={formik.values.taiKhoan} />
          </Form.Item>

          <Form.Item label={t('Mật khẩu')}>
            <Input.Password onChange={formik.handleChange} name="matKhau" value={formik.values.matKhau} />
            {formik.errors.matKhau && formik.touched.matKhau ? (
              <div className="text-red-500 text-xs">{formik.errors.matKhau}</div>
            ) : null}
          </Form.Item>
          <Form.Item label={t('Loại người dùng')}>
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
        </div>
      </Form>
    </div>
  );
}
