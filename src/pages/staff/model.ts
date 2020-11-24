import { Model } from 'dva';
import * as userService from './service'
import { SingleUserType, UserState} from './data.types'
export default {
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
        save(state, action: any){
            return action.payload;
        }
    }
} as Model;