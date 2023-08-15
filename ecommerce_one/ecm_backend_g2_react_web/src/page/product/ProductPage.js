import { useEffect, useState } from "react"
import PageContainer from "../../component/page/PageContainer"
import {request} from "../../util/api"
import { Button, Image, Space, Table, notification } from "antd"
import {EditFilled,DeleteFilled} from "@ant-design/icons"
import { dateForClient, image_path } from "../../util/service"
import ModalForm from "./ModalForm"
const ProductPage = () => {

    const [list,setList] = useState([])
    const [category,setCategory] = useState([])
    const [loading,setLoading] = useState(false)
    const [open,setOpen] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [image,setImage] = useState(null)
    const [itemProduct,setItemProduct] = useState(null)

    useEffect(()=>{
        getList()
    },[])

    const getList = () => {
        setLoading(true)
        request("get","product/get-all",{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                var data = res.data
                setList(data.list)
                setCategory(data.category)
            }
        })
    }

    const onBtnRight = () => {
        setOpen(true)
    }


    const onSearch = () =>{

    }

    const handleCloseModal = () =>{
        setOpen(false)
        setItemProduct(null)
    }

    const handleSave = (item) => {
        setLoading(true)
        var form = new FormData() // create on object from fomeData
        form.append("name",item.name)
        form.append("price",item.price)
        form.append("quantity",item.quantity)
        form.append("description",(item.description == null ? "" : item.description) )
        form.append("category_id",item.category_id)
        if(image != null){
            form.append("image",image,image.filename)
        }else{
            form.append("image",null)
        }

        var method =  "post", url = "product/create"
        if(itemProduct != null){ // case update
            form.append("product_id",itemProduct.product_id)
            method =  "put"
            url = "product/update"
        }
        
        request(method,url,form).then(res=>{
            setLoading(false)
            if(res.status == 200){
                api["success"]({
                    message:(itemProduct == null ? "Create" : "Update"),
                    description : res.data.message
                })
                getList()
            }
        })
    }

    const onChageImage = (e) => {
        setImage(e.target.files[0])
    }   

    const onDelete = (id) => {
        setLoading(true)
        request("delete","product/remove/"+id,{}).then(res=>{
            setLoading(false)
            if(res.status == 200){
                api["success"]({
                    message:"Delete product",
                    description : res.data.message
                })
                getList()
            }
        })
    }

    const onClickEdit = (items) => {
        setItemProduct(items)
        setOpen(true)
    }

    return (
        <PageContainer 
            title={"Product"}
            btnRight={"New Product"}
            onBtnRight={onBtnRight}
            onSearch={onSearch}
        >
            {contextHolder}
            <Table
                size="small"
                dataSource={list}
                columns={[
                    {
                        title : "NO",
                        render : (item,items,index) => index + 1,
                        key : 1
                    },
                    {
                        title : "Product Name",
                        dataIndex  : "name",
                        key : 2
                    },
                    {
                        title : "Price",
                        dataIndex  : "price",
                        key : 3
                    },
                    {
                        title : "Quantity",
                        dataIndex  : "quantity",
                        key : 4
                    },
                    {
                        title : "Category",
                        dataIndex  : "category_name",
                        key : 5
                    },
                    {
                        title : "Description",
                        dataIndex  : "description",
                        key : 6
                    },
                    {
                        title : "Image",
                        dataIndex  : "image",
                        key : 7,
                        render : (item) => (
                            <Image 
                                src={image_path + item}
                                width={80}
                            />
                        )
                    },
                    {
                        title : "Status",
                        dataIndex  : "status",
                        render : (item) => item == 1 ? <Button type="text">Active</Button>  : <Button type="text">Disable</Button>,
                        key : 8
                    },
                    {
                        title : "Create",
                        dataIndex  : "create_at",
                        render : (date) => dateForClient(date),
                        key : 9
                    },
                    {
                        title : "Action",
                        render : (item,items,index) => {
                            return (
                                <Space key={index}>
                                    <Button size="small" onClick={()=>onClickEdit(items)}  type="primary"><EditFilled/></Button>
                                    <Button size="small" danger onClick={()=>onDelete(items.product_id)}><DeleteFilled/></Button>
                                </Space>
                            )
                        }
                    }
                ]}
            />
            <ModalForm
                category={category}
                itemProduct={itemProduct}
                open={open}
                onCancel={handleCloseModal}
                onFinish={handleSave}
                onChageImage={onChageImage}
            />
        </PageContainer>
    )
}

export default ProductPage