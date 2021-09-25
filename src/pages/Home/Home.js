import React, { useEffect } from 'react';
import FilmCarousel from './FilmCarousel';
import FilmSlider from './RSlick/FilmSlider';
import { useDispatch, useSelector } from 'react-redux';
import { layDanhSachPhimAction } from './../../Redux/actions/QuanLyPhimAction';
import { GROUPID } from './../../utils/settings/config';
import CumRap from './CumRap';
import { layThongTinHeThongRap } from '../../Redux/actions/QuanLyRapAction';

export default function Home() {
  const { danhSachPhim } = useSelector((state) => state.QuanLyPhimReducer);
  const { arrHeThongRap } = useSelector((state) => state.QuanLyRapReducer);
  console.log('arrHeThongRap', arrHeThongRap);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(layDanhSachPhimAction());
    dispatch(layThongTinHeThongRap(GROUPID));
  }, []);

  return (
    <div>
      <FilmCarousel />
      <FilmSlider danhSachPhim={danhSachPhim} />
      <CumRap arrHeThongRap={arrHeThongRap} />
    </div>
  );
}
