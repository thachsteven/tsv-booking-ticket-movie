import React, { Component, useEffect } from 'react';
import { StarOutlined } from '@ant-design/icons';
import { Rate, Progress, Tabs, Radio, Space, Button } from 'antd';

import { CustomCard } from '@tsamantanis/react-glassmorphism';
import '@tsamantanis/react-glassmorphism/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import { layThongTinLichChieuAction, layThongTinPhimAction } from '../../Redux/actions/QuanLyPhimAction';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function Detail(props) {
  const { t, i18n } = useTranslation();

  const { arrFilmInfo, arrLichChieu } = useSelector((state) => state.QuanLyPhimReducer);
  console.log('arrLichChieu', arrLichChieu);
  const dispatch = useDispatch();
  const { TabPane } = Tabs;

  useEffect(() => {
    dispatch(layThongTinPhimAction(props.match.params.id));
    dispatch(layThongTinLichChieuAction(props.match.params.id));
  }, []);

  const renderLichChieu = () => {
    return arrLichChieu.heThongRapChieu?.map((htr, index) => {
      return (
        <TabPane tab={<img src={htr.logo} className="rounded-full" width="50" alt={htr.tenHeThongRap} />} key={index}>
          {htr.cumRapChieu?.map((cumRap, index) => {
            return (
              <div key={index} className="flex">
                <div>
                  <img
                    style={{ height: 55, width: 55 }}
                    src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg"
                    alt={cumRap.tenCumRap}
                  />
                </div>
                <div className="ml-2">
                  <p className="text-base font-bold mb-1">{cumRap.tenCumRap}</p>
                  <p>{cumRap.diaChi}</p>
                  <p className="flex">
                    {cumRap.lichChieuPhim?.slice(0, 6).map((lich, index) => {
                      return (
                        <NavLink to={`/checkout/${lich.maLichChieu}`}>
                          <div key={index}>
                            <Button className="mr-2">{moment(lich.ngayChieuGioChieu).format('hh:mm A')}</Button>
                          </div>
                        </NavLink>
                      );
                    })}
                  </p>
                </div>
              </div>
            );
          })}
        </TabPane>
      );
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${arrFilmInfo.hinhAnh})`,
        backgroundSize: '100%',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <CustomCard
        style={{ paddingTop: 150, minHeight: '100vh' }}
        effectColor="#fff" // required
        color="#fff" // default color is white
        blur={10} // default blur value is 10px
        borderRadius={0} // default border radius value is 10px
      >
        <div className="container grid grid-cols-3">
          <div>
            <img style={{ width: 250, height: 350, margin: 'auto' }} src={arrFilmInfo.hinhAnh} alt="" />
          </div>
          <div className="mt-2">
            <p className="text-lg">{moment(arrFilmInfo.ngayKhoiChieu).format('DD.MM.YYYY')}</p>
            <p className="text-2xl">{arrFilmInfo.tenPhim}</p>
            <p className="text-lg">{arrFilmInfo.moTa}</p>
          </div>
          <div className="text-center">
            <p className="text-4xl mb-1">{t('Đánh giá')}</p>
            <h1 className="text-green-400 text-2xl">
              <Rate allowHalf value={arrFilmInfo.danhGia / 2} style={{ color: 'yellow', fontSize: 40 }} />
            </h1>
          </div>
        </div>
        <div className="mt-10 ml-64 w-2/3 container bg-white px-5 py-5 rounded-md">
          <Tabs defaultActiveKey="1" centered>
            <TabPane tab={t('Lịch chiếu')} key="1">
              <Tabs tabPosition="left">{renderLichChieu()}</Tabs>
            </TabPane>
            <TabPane tab={t('Thông tin')} key="2">
              Content of Tab Pane 2
            </TabPane>
            <TabPane tab={t('Đánh giá')} key="3">
              Content of Tab Pane 3
            </TabPane>
          </Tabs>
        </div>
      </CustomCard>
    </div>
  );
}
