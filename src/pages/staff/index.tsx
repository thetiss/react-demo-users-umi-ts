/*
 * @Author: hiyan 
 * @Date: 2020-11-20 18:09:49 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-12-16 14:31:45
 */
import React, { useEffect, useState, FC, useRef} from 'react'
import { Dispatch, connect, Loading } from 'umi'
import { message, Button, Tag, Divider, Popconfirm, Pagination } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import PageContainer from '@ant-design/pro-layout'
import Protable, { ActionType, ProColumns } from '@ant-design/pro-table'
import * as UserService from './service'
import { SingleUserType, UserState, FormValueType, UserListPage, UserListMapStateToProps } from './data'
import { TablePaginationConfig } from '../../../node_modules/antd/lib/table/interface';
import CreateOrUpdateForm from './components/CreateForm'

const namespace = 'users';
const subTitleForUsers = '用户';
  
const UserList: FC<UserListPage> = ({
  users,
  dispatch,
  userListLoading,
}) => {
  const [modalVisible,setModalVisible] = useState<boolean>(false);
  const [editRecord,setEditRecord] = useState<SingleUserType | undefined>(undefined);
  const actionRef = useRef<ActionType>();
  
  const renderTableList = ()=>{
    dispatch({
      type:`${namespace}/getUserList`,
      payload:{
        page: 1,
        per_page: 10,
      }
    })
  };
 // useEffect(() => renderTableList(),[users.meta?.page,users.meta?.per_page,users.meta?.total]) //页面加载时，加载从服务端获取到的数据

 
  const requestHandler = async (params: any, sorter: any, filter: any) => { 
    console.log("requestHandler here");
    console.log(" |parmas",params);   
    console.log(" |sorter",sorter);   
    console.log(" |filter",filter);   
    const result = await UserService.queryUsers({ page: params.current, per_page: params.pageSize, sorter, filter});
    console.log(" |result",result);
    if (result) {
     return {
       data: result.data,
       total: result.meta.total,
       success: true,        
     }
    } else {
       return {
         data: [],
       }
    }
   };
   const pageChangeHandler = (page: number, pageSize?: number) => {
    console.log("pageChange here page,pagesize",page,pageSize);
    const current = page;
    requestHandler({current,pageSize},null,null);
    // dispatch({
    //   type: `${namespace}/getUserList`,
    //   payload: {
    //     page,
    //     per_page: pageSize,
    //   }
    // })
  };
  const pageSizeChangeHandler = (page: number, current?: number) => {
    console.log("page,current",page,current);
    requestHandler({page,current},null,null);
    // dispatch({
    //   type: `${namespace}/getUserList`,
    //   payload: {
    //     page: current,
    //     per_page: page,
    //   }
    // })
  };   
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
        request={requestHandler}
        actionRef={actionRef}
        loading={userListLoading}
        search={false} // hide search bar
        toolBarRender={ () => [
          <Button key='addUser' type='primary' onClick={() => handleAddUser()} >
            <PlusOutlined />新建{subTitleForUsers}
          </Button>
        ]}
        // pagination = { paginationProps }
        // pagination= {false}
      />
     {/* { users.meta && <Pagination        
                        total={users.meta.total}         
                        current={users.meta.page}
                        pageSize={users.meta.per_page}
                        onChange={pageChangeHandler}
                        onShowSizeChange={pageSizeChangeHandler}                         
                        showSizeChanger 
                        showTotal={total => `Total ${total} items`}
                      /> } */}
      <CreateOrUpdateForm
          visible={modalVisible}          
          onFinish={onFinish}
          onCancle={handleCancle}
          editRecord={editRecord}
      />
    </PageContainer>
  )
}

const mapStateToProps = ({
  users,
  loading,
}: {
  users: UserState;
  loading: Loading;
}) => {
  return {
    users,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(UserList);
