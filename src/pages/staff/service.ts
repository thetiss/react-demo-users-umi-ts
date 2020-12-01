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

export const queryUsers = async(params?: TableListParams) => {
    return extendRequest('/use/users/', {
        params
    })
}

export const addUser = async ({ values } : { values: FormValueType }) => {
    return extendRequest('/use/users',{
        method: 'post',
        data: values,
    })
}
export const editUser = async ({ id, values } : { id: number , values: FormValueType }) => {
    return extendRequest(`/use/users/${id}`,{
        method: 'put',
        data: values,
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error);
        })
}
export const deleteUser = async ({ id } : { id: number }) => {
    return extendRequest(`/use/users/${id}`,{
        method: 'delete',
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error)
        })
}