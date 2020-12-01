/*
 * @Author: hiyan 
 * @Date: 2020-11-30 10:49:06 
 * @Last Modified by: hiyan
 * @Last Modified time: 2020-11-30 17:58:54
 */
import React, { useEffect, FC } from 'react'
import { Modal, Form, Input, Switch, DatePicker, message } from 'antd'
import moment from 'moment'
import { FormPropsType } from '../data'

const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };

  const CreateForm: FC<FormPropsType> = (props) => {
    const {visible, editRecord, onCancle, onFinish} = props;
    const [form] =Form.useForm();
    useEffect(() => {
        if(editRecord === undefined){
            form.resetFields();
        }else{
            form.setFieldsValue({
                ...editRecord,
                create_time: moment(editRecord.create_time),
                update_time: moment(editRecord.update_time),
            })  
        }
    },[visible])
    return(
        <Modal
            visible={visible}
            title={editRecord?'编辑用户':'新增用户'}
            okText="确定"
            cancelText="取消"
            onCancel={() => onCancle()}
            onOk={() => {
                form.validateFields() // form instance的API方法之一：触发表单验证	
                    .then((values) => {                            
                        //form.resetFields(); // 之一：重置一组字段到 initialValues
                        onFinish(values);
                        form.resetFields();
                    })
                    .catch((errorInfo) => {
                        message.error(errorInfo);
                        console.log("validateFields failed: ",errorInfo);
                    })
            }}
    >
        <Form
            form={form}
            {...layout}
            name="userInfo"                                       
        >
            <Form.Item
                name="name"
                label="用户名"
                rules={[{required: true,message:'请输入用户名'}]}
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="email"
                label="邮箱"
            >
                <Input />
            </Form.Item>
            <Form.Item
                name="create_time"
                label="创建时间"
            >
                <DatePicker 
                    showToday 
                    showTime={{ format: 'HH:mm' }}
                />
            </Form.Item>
            <Form.Item
                name="status"
                label="用户状态"
                valuePropName="checked"
            >
                <Switch />
            </Form.Item>
        </Form>
    </Modal>
    )
}
export default CreateForm;