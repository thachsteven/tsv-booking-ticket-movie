import { AutoComplete, Popconfirm, Input, Table } from 'antd';
import React from 'react';
import { useEffect, Fragment } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { GROUPID } from '../../utils/settings/config';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRef } from 'react';
import { getListUserSearch, getUserListAction } from '../../Redux/actions/QuanLyNguoiDungAction';
import { deleteUserAction } from './../../Redux/actions/QuanLyNguoiDungAction';

export default function UserManagement() {
  const { arrUser, arrUserSearch } = useSelector((state) => state.QuanLyNguoiDungReducer);
  const [value, setValue] = useState('');
  const searchRef = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserListAction(GROUPID));
  }, []);

  const confirm = (e) => {};

  const cancel = (e) => {};

  const columns = [
    {
      title: 'Tài khoản',
      dataIndex: 'taiKhoan',
      key: 'taiKhoan',
      sorter: (a, b) => {
        let taiKhoanA = a.taiKhoan.toLowerCase().trim();
        let taiKhoanB = b.taiKhoan.toLowerCase().trim();
        if (taiKhoanA > taiKhoanB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: 'Mật khẩu',
      dataIndex: 'matKhau',
      key: 'matKhau',
    },
    {
      title: 'Họ tên',
      dataIndex: 'hoTen',
      key: 'hoTen',
      sorter: (a, b) => {
        let hoTenA = a.hoTen.toLowerCase().trim();
        let hoTenB = b.hoTen.toLowerCase().trim();
        if (hoTenA > hoTenB) {
          return 1;
        }
        return -1;
      },
    },

    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      sorter: (a, b) => {
        let emailA = a.email.toLowerCase().trim();
        let emailB = b.email.toLowerCase().trim();
        if (emailA > emailB) {
          return 1;
        }
        return -1;
      },
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'soDt',
      key: 'soDt',
      sorter: (a, b) => a.soDt - b.soDt,
    },
    {
      title: 'Thao tác',
      render: (text, record, index) => {
        return (
          <Fragment>
            <NavLink to={`/admin/quanlynguoidung/edit/${record.taiKhoan}`}>
              <EditOutlined style={{ color: 'blue', fontSize: 25 }} />
            </NavLink>
            <Popconfirm
              title="Are you sure to delete this user?"
              onConfirm={() => {
                dispatch(deleteUserAction(record.taiKhoan));
              }}
              onCancel={cancel}
              okText="Yes"
              cancelText="No"
            >
              <DeleteOutlined style={{ color: 'red', fontSize: 25, marginLeft: 5 }} />
            </Popconfirm>
          </Fragment>
        );
      },
    },
  ];

  return (
    <div>
      <AutoComplete
        value={value}
        onChange={(text) => {
          setValue(text);
        }}
        onSelect={(valueSelect, option) => {
          //Set giá trị của hộp thoại = option.label
          setValue(option.label);
        }}
        onSearch={(value) => {
          //Nếu searchRef khác null
          if (searchRef.current) {
            clearTimeout(searchRef.current);
          }
          searchRef.current = setTimeout(() => {
            dispatch(getListUserSearch(GROUPID, value));
            console.log('valuee', value);
          }, 300);
        }}
        className="mt-1 mb-4"
        style={{ width: 1000 }}
      >
        <Input.Search size="large" placeholder="Search" style={{ width: 1200, marginBottom: 20 }} />
      </AutoComplete>
      <Table dataSource={value ? arrUserSearch : arrUser} columns={columns} rowKey={'taiKhoan'} />
    </div>
  );
}
