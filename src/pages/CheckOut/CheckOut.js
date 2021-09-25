import React, { useEffect } from 'react';
import './CheckOut.css';
import { Button, Popconfirm, message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { datGheAction, datVeAction, layDanhSachPhongVeAction } from '../../Redux/actions/QuanLyDatVeAction';
import { USER_LOGIN } from '../../utils/settings/config';
import { Redirect } from 'react-router';
import { CheckOutlined, CloseOutlined, UserOutlined } from '@ant-design/icons';
import _ from 'lodash';
import { useTranslation } from 'react-i18next';

export default function CheckOut(props) {
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const { danhSachPhongVe, danhSachGheDangDat } = useSelector((state) => state.QuanLyDatVeReducer);
  console.log('danhSachGheDangDat', danhSachGheDangDat);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();

  useEffect(() => {
    dispatch(layDanhSachPhongVeAction(props.match.params.id));
  }, []);

  if (!localStorage.getItem(USER_LOGIN)) {
    return <Redirect to="/login" />;
  }

  const renderGhe = () => {
    return danhSachPhongVe.danhSachGhe?.slice(0, 99).map((ghe, index) => {
      let classGheVip = ghe.loaiGhe === 'Vip' ? 'gheVip' : '';
      let classGheDaDat = ghe.daDat === true ? 'gheDaDat' : '';
      let classGheDangDat = '';
      //Kiểm tra từng ghế render xem có trong mảng ghế đang đặt hay không
      let indexGheDD = danhSachGheDangDat.findIndex((gheDD) => gheDD.maGhe === ghe.maGhe);

      let classGheDaDuocDat = '';
      if (userLogin.taiKhoan === ghe.taiKhoanNguoiDat) {
        classGheDaDuocDat = 'gheDaDuocDat';
      }

      if (indexGheDD != -1) {
        classGheDaDat = 'gheDangDat';
      }
      return (
        <button
          onClick={() => {
            dispatch(datGheAction(ghe, props.match.params.id));
          }}
          disabled={ghe.daDat}
          className={` ghe ${classGheVip} ${classGheDaDat} ${classGheDangDat} ${classGheDaDuocDat} text-center`}
          key={index}
        >
          {ghe.daDat ? (
            classGheDaDuocDat != '' ? (
              <UserOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
            ) : (
              <CloseOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
            )
          ) : (
            ghe.stt
          )}
        </button>
      );
    });
  };

  return (
    <div
      style={{
        backgroundImage: 'url("https://nhquan-movie.vercel.app/static/media/movie-details-bg.c5606e91.jpg")',
        backgroundSize: '100%',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="container grid grid-cols-5 pt-40">
        <div className="screen text-black text-center col-span-3 flex justify-center items-center text-xl">
          {t('MÀN HÌNH')}
        </div>
        <div className="col-span-3 text-white ml-8 mt-6 mb-4">{renderGhe()}</div>

        <div className="text-white ml-14 col-span-2">
          <p className="text-4xl mb-4 text-center text-yellow-300">
            {danhSachGheDangDat
              .reduce((tongTien, ghe, index) => {
                return (tongTien += ghe.giaVe);
              }, 0)
              .toLocaleString()}
            đ
          </p>
          <hr />
          <p className="text-3xl mb-4">{danhSachPhongVe.thongTinPhim?.tenPhim}</p>
          <hr />
          <p className="text-lg mb-2">
            {t('Địa điểm')}:
            <span style={{ color: 'antiquewhite', fontStyle: 'italic', marginLeft: 10 }}>
              {danhSachPhongVe.thongTinPhim?.diaChi}
            </span>
          </p>
          <p className="text-lg">
            {t('Ngày chiếu')}:
            <span style={{ color: 'antiquewhite', fontStyle: 'italic', marginLeft: 10 }}>
              {danhSachPhongVe.thongTinPhim?.ngayChieu}
            </span>
            <span style={{ color: 'antiquewhite', fontStyle: 'italic', marginLeft: 10 }}>
              {danhSachPhongVe.thongTinPhim?.gioChieu}
            </span>
          </p>
          <hr />
          <div className="pb-2">
            <p className="text-lg mb-1 ">{t('Ghế')}: </p>
            {_.sortBy(danhSachGheDangDat, ['stt']).map((gheDD, index) => {
              console.log('gheDD', gheDD);
              return (
                <span key={index} className="text-white bg-yellow-500 px-1 text-base ml-2 rounded-sm">
                  {gheDD.stt}
                  {(index + 1) % 8 === 0 ? <br /> : ''}
                </span>
              );
            })}
          </div>
          <hr />
          <p className="text-lg">
            {t('Email')}:
            <span style={{ color: 'antiquewhite', fontStyle: 'italic', marginLeft: 10 }}> {userLogin.email}</span>
          </p>
          <hr />
          <p className="text-lg">
            {t('Số điện thoại')}:{' '}
            <span style={{ color: 'antiquewhite', fontStyle: 'italic', marginLeft: 10 }}>{userLogin.soDT}</span>
          </p>
          <Popconfirm
            placement="bottom"
            title="Bạn có chắc chắn muốn đặt vé?"
            onConfirm={() => {
              dispatch(
                datVeAction({
                  maLichChieu: props.match.params.id,
                  danhSachVe: danhSachGheDangDat,
                })
              );
            }}
            onCancel
            okText="Có"
            cancelText="Không"
          >
            <Button className="w-full" type="primary">
              ĐẶT VÉ
            </Button>
          </Popconfirm>
          ,
        </div>
      </div>
      <div className="flex ml-64">
        <div className="mr-10">
          <p className="text-white " style={{ marginBottom: 0, marginLeft: -6 }}>
            {t('Ghế chưa đặt')}
          </p>
          <div className="ghe text-center" style={{ marginTop: 0 }}>
            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
          </div>
        </div>
        <div className="mr-10">
          <p className="text-white" style={{ marginBottom: 0, marginLeft: -6 }}>
            {t('Ghế đang đặt')}
          </p>
          <div className="ghe gheDangDat text-center" style={{ marginTop: 0 }}>
            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
          </div>
        </div>
        <div className="mr-10">
          <p className="text-white" style={{ marginBottom: 0, marginLeft: 8 }}>
            {t('Ghế VIP')}
          </p>
          <div className="ghe gheVip text-center" style={{ marginTop: 0 }}>
            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
          </div>
        </div>
        <div className="mr-10">
          <p className="text-white" style={{ marginBottom: 0 }}>
            {t('Ghế đã đặt')}
          </p>
          <div className="ghe gheDaDat text-center" style={{ marginTop: 0 }}>
            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
          </div>
        </div>
        <div className="mr-10">
          <p className="text-white" style={{ marginBottom: 0, marginLeft: -6 }}>
            {t('Ghế của bạn')}
          </p>
          <div className="ghe gheDaDuocDat text-center" style={{ marginTop: 0 }}>
            <CheckOutlined style={{ marginBottom: 7.5, fontWeight: 'bold' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
