import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Select } from 'antd';
import { useSelector } from 'react-redux';
import { TOKEN, USER_LOGIN } from '../../utils/settings/config';
import { Option } from 'antd/lib/mentions';
import { history } from './../../App';
import _ from 'lodash';
import { UserOutlined } from '@ant-design/icons';
import { useTranslation } from 'react-i18next';

export default function Header() {
  const { t, i18n } = useTranslation();
  const handleChange = (value) => {
    i18n.changeLanguage(value);
  };
  const { userLogin } = useSelector((state) => state.QuanLyNguoiDungReducer);

  const renderLogin = () => {
    if (_.isEmpty(userLogin)) {
      return (
        <Fragment>
          <button
            onClick={() => {
              history.push('/login');
            }}
            className="p-2 lg:px-4 md:mx-2 text-white text-center border border-transparent rounded hover:bg-indigo-100 hover:text-indigo-700 transition-colors duration-300"
          >
            {t('ĐĂNG NHẬP')}
          </button>
          <button
            onClick={() => {
              history.push('/register');
            }}
            className="p-2 lg:px-4 md:mx-2 text-white text-center border border-solid border-indigo-600 rounded hover:bg-indigo-600 hover:text-white transition-colors duration-300 mt-1 md:mt-0 md:ml-1"
          >
            {t('ĐĂNG KÝ')}
          </button>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <button
          onClick={() => {
            history.push('/profile');
          }}
          className="p-2 lg:px-4 md:mx-2 text-white text-center border border-transparent rounded hover:bg-indigo-100 hover:text-black transition-colors duration-300"
        >
          <UserOutlined style={{ fontSize: 20, display: 'inline-flex' }} />
          {userLogin.taiKhoan}
        </button>
        <button
          onClick={() => {
            localStorage.removeItem(USER_LOGIN);
            localStorage.removeItem(TOKEN);
            history.push('/home');
            window.location.reload();
          }}
          className="p-2 lg:px-4 md:mx-2 text-white text-center border border-transparent rounded hover:bg-indigo-100 hover:text-black transition-colors duration-300"
        >
          {t('ĐĂNG XUẤT')}
        </button>
      </Fragment>
    );
  };

  return (
    <div
      className="header-2 p-4 bg-coolGray-100 text-coolGray-800 bg-opacity-40 bg-black text-white fixed w-full z-10"
      style={{ boxShadow: 'rgb(123 123 123 / 28%) 1px 1px 24px 2px' }}
    >
      <nav className="py-2 md:py-4">
        <div className="container px-4 mx-auto md:flex md:items-center">
          <div className="flex justify-between items-center">
            <NavLink to="/" className="font-bold text-3xl text-yellow-300">
              TSV CINEMA
            </NavLink>
            <button
              className="border border-solid border-gray-600 px-3 py-1 rounded text-gray-600 opacity-50 hover:opacity-75 md:hidden"
              id="navbar-toggle"
            >
              <i className="fas fa-bars" />
            </button>
          </div>
          <div className="hidden md:flex flex-col md:flex-row md:ml-auto mt-3 md:mt-0" id="navbar-collapse">
            <a href="#" className="p-2 lg:px-4 md:mx-2 text-white rounded bg-indigo-600">
              {t('TRANG CHỦ')}
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              {t('PHIM')}
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              {t('LỊCH CHIẾU')}
            </a>
            <a
              href="#"
              className="p-2 lg:px-4 md:mx-2 text-white rounded hover:bg-gray-200 hover:text-gray-700 transition-colors duration-300"
            >
              {t('ƯU ĐÃI')}
            </a>
            <div className="items-center flex-shrink-0 hidden lg:flex">
              {renderLogin()}

              <Select defaultValue="vi" style={{ width: 100 }} onChange={handleChange}>
                <Option value="vi">VN</Option>
                <Option value="en">English</Option>
                <Option value="chi">Chinese</Option>
              </Select>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}
