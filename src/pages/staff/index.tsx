/*
 * @Author: hiyan 
 * @Date: 2020-11-20 18:09:49 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-11-26 19:02:07
 */
import React, { useEffect, useState, FC} from 'react'
import { Dispatch, connect } from 'umi'
import { message, Popconfirm } from 'antd'
import Protable from '@ant-design/pro-table'
import { SingleUserType, UserState } from './data.types'

// import styles from './'
const onEditUser = ( user: SingleUserType) => {
        
};
const handleDeleteUser = ( id: number) => {
    
};
const columns = [
    {
      dataIndex: 'index',
      valueType: 'indexBorder',
      width: 48,
    },
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'string',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      valueType: 'string',
    },
    {
      title: '创建时间',
      key: 'since',
      dataIndex: 'create_time',
      valueType: 'date',
    },
    {
      title: '操作',
      valueType: 'option',
      render: (text: any, row: SingleUserType) => [
          <a  key="edit" onClick={()=>onEditUser(row)}>
            编辑
          </a>,
          <Popconfirm 
            title={"确定删除?"+row.id}
            onConfirm={() => {  
                                handleDeleteUser(row.id);
                              }}
            okText="确定"
            cancelText="取消"
            key="delete"
          >
            <a href="#" >删除{row.id}</a>
        </Popconfirm>,         
      ],
    },
  ]
const namespace = 'users';
const mapStateToProps = (users: UserState) => {
    return{
        users: users,
    }
}
const mapDispatchToProps = (dispatch: Dispatch) => {
    return{
        fetchUserList: () => {
            dispatch({
                type: '${namespace}/fetch'
            })
        }
    }
}  
const UserList = () => {

    return <div>
        <h1>Staff</h1>
        <Protable />

    </div>

}
export default UserList;
