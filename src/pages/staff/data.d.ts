import { Effect, Reducer, Dispatch, Loading, } from 'umi'
// User所有属性
export interface SingleUserType {
    id: number;
    name: string;
    email: string;
    create_time: string;
    update_time: string;
    status: number;
}
// 后端接口返回查询列表
export interface UserState {
    data: SingleUserType[];
    meta?: {
        total: number;
        per_page: number;
        page: number;
    }
}
// 定义类来约束Model写法
export interface UserModelType {
    namespace: 'users';
    state: UserState;
    reducers: {
        saveCurrentUsers: Reducer<UserState>;
    };
    effects: {
        getUserList: Effect;        
    };
}
export interface QueryUsersApiWithParams { // 与后端接口要交互，
    id?: number;    
    page?: number;
    per_page?: number;
    filter?: { [key: string]: any[] };
    sorter?: { [key: string]: any };
}
// Modal组件类Form类型
export interface FormValueType {
    [name: string]: any
}
// Modal组件类的props
export interface FormPropsType {
    visible: boolean;
    editRecord?: SingleUserType;
    onFinish: (value: FormValueType) => void;
    onCancle: () => void;    
}

// UserListPage所有包含的属性
export interface UserListPage {
    users: UserState;
    dispatch: Dispatch;
    userListLoading: boolean;
}

export interface UserListMapStateToProps {
    users: UserState;
    //loading: Loading;
}
