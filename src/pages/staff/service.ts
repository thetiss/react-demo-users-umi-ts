import { extend } from 'umi-request'
import { message } from 'antd'
import { TableListParams } from './data'
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