import { extend } from 'umi-request'
import { message } from 'antd'
import { QueryUsersApiWithParams, SingleUserType, FormValueType } from './data'
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

export const queryUsers = async (params?: QueryUsersApiWithParams) => { // params参数可选,若不带，则默认后端向前端返回users?page=1&per_page=10
    console.log('params is； ',params);
    return extendRequest('/use/users', {
        params,
    })
}

export const addUser = async ({ values } : { values: FormValueType }) => {
    return extendRequest('/use/users',{
        method: 'post',
        data: values,
    })
        .then(response => {
            return true;
        })
        .catch(error => {
            console.log(error);
            return false;            
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
            return false;
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
            console.log(error);
            return false;
        })
}