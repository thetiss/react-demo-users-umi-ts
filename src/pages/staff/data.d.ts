import { Effect, Reducer, } from 'umi'
export interface SingleUserType {
    id: number;
    name: string;
    email: string;
    create_time: string;
    update_time: string;
    status: number;
}
export interface UserState {
    data: SingleUserType[];
    meta: {
        total: number;
        per_page: number;
        page: number;
    }
}

export interface UserModelType {
    namespace: 'users';
    state: UserState;
    reducers: {
        getList: Reducer<UserState>;
    };
    effects: {
        getUserList: Effect;        
    };
}
export interface TableListParams {
    id?: number;    
    page?: number;
    per_page?: number;
    pageSize?: number;
    currentPage?: number;
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