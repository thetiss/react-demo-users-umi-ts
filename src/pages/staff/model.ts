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
            console.log(' |action.payload',action.payload);                        
            const { page, per_page } = action.payload;
            console.log(' |action.payload.per_page',per_page);            
            const response = yield call(userService.queryUsers,{page,per_page});            
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
            console.log(" |state",state);
            console.log(" |action",action);          
            return {
                ...state,
                data: action.payload.data || [],
                meta: action.payload.meta || {},
            };
        }
    }
} 
export default UserModel;