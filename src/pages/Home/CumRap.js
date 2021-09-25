import React, { Fragment } from 'react';
import { Tabs, Radio, Space, Button } from 'antd';
import moment from 'moment';
import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const { TabPane } = Tabs;

export default function CumRap(props) {
  const { t, i18n } = useTranslation();

  const { arrHeThongRap } = props;

  const renderHeThongRap = () => {
    return arrHeThongRap.map((heThongRap, index) => {
      return (
        <TabPane
          tab={<img src={heThongRap.logo} className="rounded-full" width="50" alt={heThongRap.tenHeThongRap} />}
          key={index}
        >
          <Tabs tabPosition="left">
            {heThongRap.lstCumRap?.slice(0, 7).map((cumRap, index) => {
              return (
                <TabPane
                  tab={
                    <div style={{ width: '300px', display: 'flex' }}>
                      <img src="https://s3img.vcdn.vn/123phim/2018/09/ddc-dong-da-15379624326697.jpg" width="50" />{' '}
                      <br />
                      <div className="text-left ml-2">
                        {cumRap.tenCumRap}
                        <p className="text-red-400">{t('Chi tiết')}</p>
                      </div>
                    </div>
                  }
                  key={index}
                >
                  {cumRap.danhSachPhim.slice(0, 4).map((phim, index) => {
                    return (
                      <Fragment key={index}>
                        <div className="my-5">
                          <div style={{ display: 'flex' }}>
                            <img
                              style={{ height: 110, width: 75 }}
                              src={phim.hinhAnh}
                              alt={phim.tenPhim}
                              onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://picsum.photos/75/110';
                              }}
                            />

                            <div className="ml-2">
                              <h1 className="text-2xl text-green-700 mb-1">{phim.tenPhim}</h1>
                              <p className="mb-2">{cumRap.diaChi}</p>
                              <div className="grid grid-cols-6 gap-6">
                                {phim.lstLichChieuTheoPhim?.slice(0, 6).map((lichChieu, index) => {
                                  return (
                                    <NavLink key={index} to={`/checkout/${lichChieu.maLichChieu}`}>
                                      <Button>{moment(lichChieu.ngayChieuGioChieu).format('hh:mm A')}</Button>
                                    </NavLink>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        </div>
                        <hr />
                      </Fragment>
                    );
                  })}
                </TabPane>
              );
            })}
          </Tabs>
        </TabPane>
      );
    });
  };

  return (
    <div className="container p-10">
      <Tabs tabPosition="left">{renderHeThongRap()}</Tabs>
    </div>
  );
}
