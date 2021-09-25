import React from 'react';
import { useSelector } from 'react-redux';
import { FacebookOutlined, YoutubeOutlined, TwitterOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { t, i18n } = useTranslation();

  const { arrHeThongRap } = useSelector((state) => state.QuanLyRapReducer);

  return (
    <div className="footer-2 bg-gray-800 pt-6 md:pt-12">
      <div className="container px-4 mx-auto">
        <div className="md:flex md:flex-wrap md:-mx-4 md:pb-12">
          <div className="footer-info lg:w-1/3 md:px-4">
            <h4 className="text-white text-5xl mb-4">TSV CINEMA</h4>
            <FacebookOutlined style={{ fontSize: 50, color: 'white', marginLeft: 25, marginTop: 10 }} />
            <YoutubeOutlined style={{ fontSize: 50, color: 'white', marginLeft: 25, marginTop: 10 }} />
            <TwitterOutlined style={{ fontSize: 50, color: 'white', marginLeft: 25, marginTop: 10 }} />
          </div>
          <div className="md:w-2/3 lg:w-1/3 md:px-4 xl:pl-16 mt-12 lg:mt-0">
            <div className="sm:flex">
              <div className="sm:flex-1">
                <h6 className="text-base font-medium text-white uppercase mb-2">TSV CINEMA</h6>
                <div>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Hệ Thống Rạp')}
                  </a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Tuyển dụng')}
                  </a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline"></a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Liên Hệ')}
                  </a>
                </div>
              </div>
              <div className="sm:flex-1 mt-4 sm:mt-0">
                <h6 className="text-base font-medium text-white uppercase mb-2">{t('QUY ĐỊNH & ĐIỀU KHOẢN')}</h6>
                <div>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Quy định thành viên')}
                  </a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Điều khoản')}
                  </a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Hướng dẫn đặt vé trực tuyến')}
                  </a>
                  <a href="#" className="text-gray-400 py-1 block hover:underline">
                    {t('Quy định và chính sách chung')}
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="md:w-1/3 md:px-4 md:text-center mt-12 lg:mt-0">
            <div className="grid grid-cols-3">
              {arrHeThongRap.map((logo, index) => {
                return <img style={{ height: 60, width: 60, marginBottom: 30 }} key={index} src={logo.logo} alt="" />;
              })}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-solid border-gray-900 mt-4 py-2">
        <div className="container px-4 mx-auto">
          <div className="md:flex md:-mx-4 md:items-center">
            <div className="md:flex-1 md:px-4 text-center md:text-left">
              <p className="text-white">
                © <strong>TSV CINEMA</strong>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
