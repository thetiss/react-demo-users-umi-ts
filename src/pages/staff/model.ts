import * as userService from './service'
import { SingleUserType, UserModelType } from './data'

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
            console.log('effect here');            
            const { page, pageSize } = action.payload;
            const response = yield call(userService.queryUsers,page,pageSize);            
            console.log("yeild call result： ",response);
            response 
            ? yield put({
                type: 'saveCurrentUsers',
                payload: response
            })
            : yield put({
                type: 'saveCurrentUsers',
                payload: []
            })
        },
    },
    reducers: {
        saveCurrentUsers(state, action) {    
            console.log('reducer here');
                   
            return {
                ...state,
                data: action.payload || [],
            };
        }
    }
} 
export default UserModel;