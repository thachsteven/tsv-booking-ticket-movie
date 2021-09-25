import React from 'react';
import { CalendarOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import { Fragment } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { Button, Input, Table } from 'antd';
import { history } from './../../App';
import { layDanhSachPhimAction, xoaPhimAction } from '../../Redux/actions/QuanLyPhimAction';

export default function Film() {
  const { Search } = Input;
  const { danhSachPhimDefault } = useSelector((state) => state.QuanLyPhimReducer);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(layDanhSachPhimAction());
  }, []);

  const columns = [
    {
      title: 'Mã phim',
      dataIndex: 'maPhim',
      sorter: (a, b) => a.maPhim - b.maPhim,
      sortDirections: ['descend', 'ascend'],
      width: '15%',

      // sortOrder:'descend'
    },
    {
      title: 'Hình ảnh',
      dataIndex: 'hinhAnh',
      render: (text, film, index) => {
        return (
          <Fragment>
            <img
              src={film.hinhAnh}
              alt={film.tenPhim}
              width={50}
              height={50}
              onError={(e) => {
                e.target.onError = null;
                e.target.src = `https://picsum.photos/id/${index}/50/50`;
              }}
            />
          </Fragment>
        );
      },
      width: '15%',
      // sorter: (a, b) => a.age - b.age,
    },
    {
      title: 'Tên phim',
      dataIndex: 'tenPhim',
      sorter: (a, b) => {
        let tenPhimA = a.tenPhim.toLowerCase().trim();
        let tenPhimB = b.tenPhim.toLowerCase().trim();
        if (tenPhimA > tenPhimB) {
          return 1;
        }
        return -1;
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
    {
      title: 'Mô tả',
      dataIndex: 'moTa',

      render: (text, film) => {
        return <Fragment>{film.moTa.length > 50 ? film.moTa.substr(0, 50) + ' ...' : film.moTa}</Fragment>;
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
    {
      title: 'Hành động',
      render: (text, film) => {
        return (
          <Fragment>
            <NavLink key={1} className=" mr-2  text-2xl" to={`/admin/films/edit/${film.maPhim}`}>
              <EditOutlined style={{ color: 'blue' }} />
            </NavLink>
            <span
              style={{ cursor: 'pointer' }}
              key={2}
              className="text-2xl"
              onClick={() => {
                //Gọi action xoá
                if (window.confirm('Bạn có chắc muốn xoá phim ' + film.tenPhim)) {
                  //Gọi action
                  dispatch(xoaPhimAction(film.maPhim));
                }
              }}
            >
              <DeleteOutlined style={{ color: 'red' }} />
            </span>

            <NavLink
              key={3}
              className=" mr-2 text-2xl"
              to={`/admin/films/showtime/${film.maPhim}/${film.tenPhim}`}
              onClick={() => {
                localStorage.setItem('filmParams', JSON.stringify(film));
              }}
            >
              <CalendarOutlined style={{ color: 'green', marginLeft: 8 }} />
            </NavLink>
          </Fragment>
        );
      },
      sortDirections: ['descend', 'ascend'],
      width: '25%',
    },
  ];

  const onSearch = (value) => {
    //Gọi api layDanhSachPhim
    dispatch(layDanhSachPhimAction(value));
  };

  function onChange(pagination, filters, sorter, extra) {
    // console.log('params', pagination, filters, sorter, extra);
  }

  return (
    <div>
      <h3 className="text-4xl">Quản lý Phim</h3>
      <Button
        className="mb-5"
        onClick={() => {
          history.push('/admin/films/addnew');
        }}
      >
        Thêm phim
      </Button>
      <Search
        className="mb-5"
        placeholder="Search..."
        enterButton={<SearchOutlined />}
        size="large"
        onSearch={onSearch}
      />

      <Table columns={columns} dataSource={danhSachPhimDefault} onChange={onChange} rowKey={'maPhim'} />
    </div>
  );
}
