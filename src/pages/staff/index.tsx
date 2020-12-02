/*
 * @Author: hiyan 
 * @Date: 2020-11-20 18:09:49 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-12-01 18:25:56
 */
import React, { useEffect, useState, FC, useRef} from 'react'
import { Dispatch, connect } from 'umi'
import { message, Button, Tag, Divider, Popconfirm, Pagination } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PageContainer from '@ant-design/pro-layout'
import Protable, { ActionType, ProColumns } from '@ant-design/pro-table'
import * as UserService from './service'
import { SingleUserType, UserState, FormValueType } from './data'
import CreateOrUpdateForm from './components/CreateForm'

// import styles from './'

const namespace = 'users';
const subTitleForUsers = '用户';

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
  const [modalVisible,setModalVisible] = useState<boolean>(false);
  const [editRecord,setEditRecord] = useState<SingleUserType | undefined>(undefined);
  const actionRef = useRef<ActionType>();
 
  const handleCancle = () => {
    setModalVisible(false);
  }
  const handleAddUser = () => {
    setModalVisible(true);
    setEditRecord(undefined);
  }
  
  const handleEditUser = (user: SingleUserType)　=> {
    setModalVisible(true);
    console.log("From single user record",user);
    user ? setEditRecord(user) : setEditRecord(undefined);   
  }

  const handleDeleteUser = async (id: number) => {
    const result = await UserService.deleteUser({id});
     if( result ) {
       message.success('Delete Successfully!');
       actionRef.current?.reload();
     } else {
      message.error('Delete Failed!');
     }
  };

  const onFinish = async (values: FormValueType) => {
    let id = 0;
    editRecord ? id = editRecord.id : id = 0;
    let serviceFunc;
    if (id) {
      serviceFunc = UserService.editUser;
    } else {
      serviceFunc = UserService.addUser;
    }
    const result = await serviceFunc({ id, values }); 
    let serviceResultMsg = "";
    if( result ) {
      setModalVisible(false);
      serviceResultMsg = `${id===0 ? 'Add' : 'Edit'} Successfuly!`;
      message.success(serviceResultMsg);
      actionRef.current?.reload();
    } else {
      serviceResultMsg = `${id===0 ? 'Add' : 'Edit'} Failed!`;
      message.error(serviceResultMsg);      
    }
  }
  const requestHandler = async ({ }) => {
      const result = await UserService.queryUsers({...params, sorter, filter});
      return {
        data: result.data,
        success: true,
        total: result.meta.total
      }
  }
  
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
      valueType: 'text',
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
      valueType: 'select',
      key: 'status',
      valueEnum: {
        0: { text: '未知', status: 'Processing'},
        1: { text: '在线', status: 'Success'},
        2: { text: '下线', status: 'Default'},
        3: { text: '锁定', status: 'Warning'}
      },
      render: (text: any) => (<Tag>{text}</Tag>)
    },    
    {
      title: '操作',
      valueType: 'option',
      render: (text: any, row: SingleUserType) => [
          <a  key="editUser" onClick={()=>handleEditUser(row)}>
            编辑
          </a>,
          <a href="#" key='configUser'>配置</a>,
          <Popconfirm 
            title={"确定删除?"+row.id}
            onConfirm={() => handleDeleteUser(row.id)}
            okText="确定"
            cancelText="取消"
            key="delete"
          >
            <a href="#" key='deleteUser'>删除{row.id}</a>
        </Popconfirm>,         
      ],
    },
  ]

  return (
    <PageContainer>
      <Protable<SingleUserType> 
        headerTitle={'在线'+subTitleForUsers+'列表'}
        columns={columns}
        request={async (params, sorter, filter) => {
         const result = await UserService.queryUsers({ ...params,page: params.current,pageSize: params.pageSize, sorter, filter});
         return {
           data: result.data,
           total: result.meta.total,
           success: true,
           pageSize: result.meta.per_page,
           current: result.meta.page          
         }
        }}
        actionRef={actionRef}
        search={false} // hide search bar
        toolBarRender={ () => [
          <Button type='primary' onClick={() => handleAddUser()} key='addUser'>
            <PlusOutlined />新建{subTitleForUsers}
          </Button>
        ]}
        // pagination={false}
      />
      {/* <Pagination /> */}
      <CreateOrUpdateForm
          visible={modalVisible}          
          onFinish={onFinish}
          onCancle={handleCancle}
          editRecord={editRecord}
      />
    </PageContainer>
  )

}
export default UserList;
