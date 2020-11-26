import { extend } from 'umi-request'
import { message } from 'antd'

const errorHandler = function (error: any) {
    if(error.response){
        if(error.response.status > 400){
            message.error(error.data.message)
        }else{
            message.error('Network Error')
        }
    }
    throw error;
}
const extendRequest = extend({errorHandler});

// 获取用户列表
export const getUserList = () => {
    return extendRequest('/use/users')
        .then(response => response.json())
        .catch(error => {
            console.log(error);
            message.error(error);
        })
}