import { DeleteFilled } from '@ant-design/icons'
import {
    Button,
    Divider,
    Dropdown,
    Form,
    Input,
    Modal,
    Space
} from 'antd'
import { useEffect } from 'react'

const FormModal = ({
    open,
    onCancel,
    onFinish,
    itemUpdate,
    imagePreView,
    onChangeImage,
    onClickRemoveImage
}) => {

    useEffect(()=>{
        if(itemUpdate != null){
            form.setFieldsValue({
                name:itemUpdate.name,
                description:itemUpdate.description,
            })
        }
    },[itemUpdate])

    const [form] = Form.useForm()

    const onFinishForm = (items) => {
        onFinish(items)
        form.resetFields() // clear all data in form.item
    }

    const items = [
        {
          key: '1',
          label: (
            <Button onClick={onClickRemoveImage} danger size='small'><DeleteFilled/></Button>
          ),
        },
    ]

    return (
        <div>
            <Modal 
                title={itemUpdate == null ? "New Category" : "Update Category"}
                open={open}
                onCancel={()=>{
                    onCancel()
                    form.resetFields()
                }}
                maskClosable={false}
                footer={null} // hide default button cancel and ok
                
            >
                <Form
                    name='from-modal'
                    layout="vertical"
                    form={form}
                    onFinish={onFinishForm}
                    // labelCol={{span:12}}
                    // wrapperCol={{span:12}}
                >
                    <Divider/>
                    <Form.Item
                        label={"Category Name"}
                        name={"name"}
                        rules={[
                            {
                              required: true,
                              message : "Please fill in category name!"
                            }
                        ]}
                    >
                        <Input placeholder='Category name'/>
                    </Form.Item>

                    <Form.Item
                        label={"Description"}
                        name={"description"}
                    >
                        <Input.TextArea placeholder='Description'/>
                    </Form.Item>

                    <Form.Item
                        label={"Select Image Category"}
                    >


                       <label
                            style={{
                                display:'inline-block',
                                backgroundColor:'#eee',
                                cursor:'pointer',
                                height:80,
                                width:80,
                                position:'relative',
                                borderRadius:10
                            }}
                            for="upload"
                        >
                            <div style={{
                                position:'absolute',
                                left:'50%',
                                top:'50%',
                                transform:"translate(-50%,-50%)"
                            }}>
                                <Dropdown
                                    menu={{
                                        items,
                                    }}
                                    placement="topCenter"
                                    arrow
                                >
                                    {imagePreView ? 
                                        <div>
                                            <img 
                                                src={imagePreView}
                                                alt={imagePreView}
                                                width={80}

                                            />
                                        </div>
                                        : 
                                        <div>
                                            Image
                                        </div>
                                    }
                                </Dropdown>
                                
                            </div>
                            <input 
                                onChange={onChangeImage} 
                                style={{display:'none'}} 
                                type="file" 
                                id="upload" 
                            />

                        </label> 

                       

                    </Form.Item>
                    
                    <Form.Item style={{textAlign:'right'}}>
                        <Space >
                            <Button onClick={onCancel}>Cancel</Button>
                            <Button htmlType='submit' type="primary">{itemUpdate == null ? "Save" : "Update"}</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    )
}

export default FormModal