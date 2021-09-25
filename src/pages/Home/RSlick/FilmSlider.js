import { Button } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { SET_PHIM_DANG_CHIEU, SET_PHIM_SAP_CHIEU } from '../../../Redux/types/QuanLyPhimTypes';

export default function MultipleRowsSlick(props) {
  const { t, i18n } = useTranslation();

  const dispatch = useDispatch();
  const { danhSachPhim } = props;
  const responsive = {
    superLargeDesktop: {
      // the naming can be any, depends on you.
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
    },
  };

  const renderDanhSachPhim = () => {
    return danhSachPhim.slice(0, 15).map((phim, index) => {
      return (
        <div key={index} className="ml-5">
          <NavLink to={`/detail/${phim.maPhim}`}>
            <img style={{ height: '500px', width: '370px' }} src={phim.hinhAnh} alt={phim.tenPhim} />
          </NavLink>
          <NavLink to={`/detail/${phim.maPhim}`}>
            <Button style={{ width: '100%', marginTop: '5px', backgroundColor: 'rgb(93 145 238)', color: '#fff' }}>
              {t('Chi tiết')}
            </Button>
          </NavLink>
        </div>
      );
    });
  };

  return (
    <div>
      <div className="my-5 ml-2">
        <Button
          onClick={() => {
            const action = {
              type: SET_PHIM_DANG_CHIEU,
            };
            dispatch(action);
          }}
          type="primary"
          className="mr-2"
        >
          {t('Phim đang chiếu')}
        </Button>
        <Button
          onClick={() => {
            const action = {
              type: SET_PHIM_SAP_CHIEU,
            };
            dispatch(action);
          }}
          type="danger"
        >
          {t('Phim sắp chiếu')}
        </Button>
      </div>
      <Carousel responsive={responsive}>{renderDanhSachPhim()}</Carousel>
    </div>
  );
}
