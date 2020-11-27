/*
 * @Author: hiyan 
 * @Date: 2020-11-20 18:09:49 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-11-26 19:02:07
 */
import React, { useEffect, useState, FC, useRef} from 'react'
import { Dispatch, connect } from 'umi'
import { message,  Popconfirm } from 'antd'
import PageContainer from '@ant-design/pro-layout'
import Protable, { ActionType, ProColumns } from '@ant-design/pro-table'
import * as UserService from './service'
import { SingleUserType, UserState } from './data'

// import styles from './'
const onEditUser = ( user: SingleUserType) => {
        
};
const handleDeleteUser = ( id: number) => {
    
};

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
const UserList: FC = () => {
  const [createModalVisible,setCreateModalVisible] = useState<boolean>(false);
  const [updateModalVisible,setUpdateModalVisible] = useState<boolean>(false);
  const actionRef = useRef<ActionType>();
  const columns: ProColumns<SingleUserType>[] = [
    {
      title: '用户ID',
      dataIndex: 'id',
      valueType: 'digit',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'name',
      valueType: 'text',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      valueType: 'text',
      key: 'email',
    },
    {
      title: '创建时间',
      dataIndex: 'create_time',
      valueType: 'date',
      key: 'create_time',
    },    
    {
      title: '修改时间',
      dataIndex: 'update_time',
      valueType: 'date',
      key: 'update_time',
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'digit',
      key: 'status',
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

  return (
    <PageContainer>
      <Protable<SingleUserType> 
        headerTitle="User List"
        columns={columns}
        request={(params, sorter, filter) => UserService.queryUsers({ ...params, sorter, filter})}
      />
    </PageContainer>
  )

}
export default UserList;
