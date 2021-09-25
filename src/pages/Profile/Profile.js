import React from 'react';
import { Button, Tabs } from 'antd';
import { NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { layThongTinNguoiDungAction } from '../../Redux/actions/QuanLyNguoiDungAction';
import moment from 'moment';
import { Redirect } from 'react-router';

import _ from 'lodash';
import { USER_LOGIN } from '../../utils/settings/config';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

export default function Profile() {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { thongTinNguoiDung } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const { email, hoTen, matKhau, taiKhoan, soDT } = thongTinNguoiDung;

  useEffect(() => {
    dispatch(layThongTinNguoiDungAction());
  }, []);

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }
  function callback(key) {
    console.log(key);
  }
  const renderHistoryTicket = () => {
    return thongTinNguoiDung.thongTinDatVe?.map((ticket, index) => {
      const seats = _.first(ticket.danhSachGhe);
      return (
        <div key={index} className="container flex md:flex-row flex-col items-center my-4 ">
          <div className="lg:max-w-lg lg:w-1/6 md:w-1/2 w-5/6 mb-10 md:mb-0">
            <img
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://picsum.photos/300/300';
              }}
              className="object-cover object-center rounded"
              alt="hero"
              src={ticket.hinhAnh}
            />
          </div>
          <div className="lg:flex-grow lg:w-1/5 md:w-1/2 lg:pl-10 md:pl-16 flex flex-col md:items-start md:text-left items-center text-center">
            <div className="flex">
              <img
                style={{ height: 30, width: 30, margin: '6px 0px' }}
                className="object-cover object-center rounded"
                alt="hero"
                src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
              />
              <h1 className="title-font sm:text-4xl lg:text-3xl font-medium text-gray-900 ml-2">
                {seats.tenHeThongRap}
              </h1>
            </div>
            <p className="leading-relaxed">
              {t('Ngày đặt')}: {moment(ticket.ngayDat).format('DD/MM/YYYY ')}
            </p>
            <p className="leading-relaxed">
              {t('Giờ đặt')}: {moment(ticket.ngayDat).format('hh:mm:ss')}
            </p>
            <p>
              {t('Rạp')}: {seats.tenCumRap}
            </p>
            <p>
              {t('Ghế')}:
              {ticket.danhSachGhe.map((ghe, index) => {
                return (
                  <span className="text-white text-sm ml-3 bg-yellow-500 px-1 rounded-sm" key={index}>
                    {ghe.tenGhe}
                    {(index + 1) % 6 === 0 ? <br /> : ''}
                  </span>
                );
              })}
            </p>
          </div>
        </div>
      );
    });
  };
  return (
    <div>
      <div>
        <img
          style={{ width: '100%' }}
          src="https://portal.vietcombank.com.vn/VCBDigital/2019/vn/img/menu/bg-vcb.jpg"
          alt="123"
        />
      </div>
      <Tabs style={{ padding: '10px 100px' }} defaultActiveKey="1" onChange={callback}>
        <TabPane tab={t('Thông tin cá nhân')} key="1">
          <div className="flex justify-around">
            <div>
              <p className="text-base my-5">
                {t('Email')}: <span className="italic text-blue-400">{email}</span>
              </p>
              <p className="text-base my-5">
                {t('Họ tên')}: <span className="italic text-blue-400">{hoTen}</span>
              </p>
              <p className="text-base my-5">
                {t('Số điện thoại')}: <span className="italic text-blue-400">{soDT}</span>
              </p>
            </div>
            <div>
              <p className="text-base my-5">
                {t('Tài khoản')}: <span className="italic text-blue-400">{taiKhoan}</span>
              </p>
              <p className="text-base my-5">
                {t('Mật khẩu')}: <span className="italic text-blue-400">{matKhau}</span>
              </p>
            </div>
            <NavLink to="/profile/edit">
              <Button type="primary">{t('Cập nhật')}</Button>
            </NavLink>
          </div>
        </TabPane>
        <TabPane tab={t('Lịch sử đặt vé')} key="2">
          <section style={{ height: 'auto' }} className="text-gray-600 body-font">
            {renderHistoryTicket()}
          </section>
        </TabPane>
      </Tabs>
    </div>
  );
}
