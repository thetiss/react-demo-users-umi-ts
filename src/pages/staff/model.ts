import * as userService from './service'
import { SingleUserType, UserModelType } from './data.types'

const UserModel: UserModelType = {
    namespace: 'users',
    state: {
        data: [],
        meta: {
            total: 0,
            per_page: 5,
            page: 1
        }
    },
    effects: {
        *getUserList(action, { call, put }){
            const data = yield call(userService.getUserList);            
            console.log(data)
            data 
            ? yield put({
                type: 'save',
                payload: data
            })
            : yield put({
                type: 'save',
                payload: []
            })
        },
    },
    reducers: {
        getList(state, action){
            return action.payload;
        }
    }
} 
export default UserModel;