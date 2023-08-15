import { Button, Col, Form, Image, Input, InputNumber, Modal, Row, Select, Space } from "antd"
import { image_path } from "../../util/service"
import { useEffect } from "react"


const ModalForm = ({
    itemProduct,
    category,
    open,
    onFinish,
    onCancel,
    onChageImage
}) =>  {

    useEffect(()=>{
        // 
        if(itemProduct != null){
            form.setFieldsValue({
                name :itemProduct.name,
                price :itemProduct.price,
                quantity :itemProduct.quantity,
                description :itemProduct.description,
                category_id :itemProduct.category_id,
            })
        }
    },[itemProduct])

    const [form] = Form.useForm()
    const {Option} = Select

    const onFinishForm = (item) => {
        onFinish(item)
        onCancel()
        form.resetFields()
    }


    const handleCancel = () => {
        onCancel()
        form.resetFields()
    }

    return (
        <Modal
            open={open}
            title={itemProduct == null ? "New Product" : "Update Product"}
            footer={null}
            onCancel={handleCancel}
            width={"60%"}
            maskClosable={false}
        >
            <Form
                form={form}
                name="product"
                layout="vertical"
                onFinish={onFinishForm}
                size="large"
            >
                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            label="Product name"
                            name={"name"}
                            rules={[
                                {
                                  required: true,
                                  message : "Please fill in product name!"
                                }
                            ]}
                        >
                            <Input placeholder="Product name" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Price"
                            name={"price"}
                        >
                            <InputNumber  style={{width:"100%"}} placeholder="Price" />
                        </Form.Item>
                    </Col>
                </Row>

                <Row gutter={10}>
                    <Col span={12}>
                        <Form.Item
                            label="Quantity"
                            name={"quantity"}
                        >
                            <InputNumber style={{width:"100%"}} placeholder="Quantity" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Category"
                            name={"category_id"}
                            rules={[
                                {
                                  required: true,
                                  message : "Please fill in select category!"
                                }
                            ]}
                        >
                            <Select placeholder="Select category">
                                {category.map((item,index)=>{
                                    return (
                                        <Option key={index} value={item.category_id}>
                                            <Space>
                                                <Image src={image_path+item.image}  alt={item.imate} width={50}/>
                                                <span>{item.name}</span>
                                            </Space>
                                           
                                        </Option>
                                    )
                                })}
                            </Select>
                        </Form.Item>
                    </Col>
                </Row>


                <Form.Item
                    label="Description"
                    name={"description"}
                >
                    <Input.TextArea placeholder="Description" />
                </Form.Item>

                <Form.Item
                    label="Image"
                    name={"image"}
                >
                    <input type="file" onChange={onChageImage} />
                </Form.Item>

                <Form.Item style={{textAlign:'right'}}>
                    <Space >
                        <Button onClick={handleCancel}>Cancel</Button>
                        <Button htmlType="submit" type="primary">{itemProduct == null ?  "Save" : "Update"}</Button>
                    </Space>
                </Form.Item>

            </Form>
        </Modal>
    )
}

export default ModalForm