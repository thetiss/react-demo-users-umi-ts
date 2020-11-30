import { extend } from 'umi-request'
import { message } from 'antd'
import { TableListParams, SingleUserType, FormValueType } from './data'
const errorHandler = function (error: any) {
    if(error.response){
        console.log(error.response);
        if(error.response.status > 400){
            console.log(error.data)
            message.error(error.data.message?error.data.message:error.data)
        }else{
            message.error('Network Error')
        }
    }
    throw error;
}
const extendRequest = extend({errorHandler});

// 获取用户列表
export const queryUsers = async(params?: TableListParams) => {
    return extendRequest('/use/users/', {
        params
    })
}

// 新增用户
export const addUser = async ({ values } : { values: FormValueType }) => {
    console.log("to service",values);
    return extendRequest('/use/users',{
        method: 'post',
        data: values,
    })
}

export const editUser = async ({ id, values } : { id: number , values: FormValueType }) => {
    console.log("to edit service",id,values);
    return extendRequest(`/use/users/${id}`,{
        method: 'put',
        data: values,
    })
        .then(response => {
            return true;
        })
        .catch(error=>{
            console.log(error);
        })
}