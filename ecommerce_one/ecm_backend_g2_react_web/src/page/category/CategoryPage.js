import React , {useEffect,useState} from "react"
import { request } from "../../util/api"
import PageContainer from "../../component/page/PageContainer"
import { Button, Image, Modal, Space, Table, message, notification } from "antd"
import {EditFilled,DeleteFilled, ExclamationCircleFilled} from "@ant-design/icons"
import { dateForClient, getText } from "../../util/service"
import { image_path } from "../../util/service"
import FormModal from "./FormModal"

const CategoryPage = () => {

    const [list,setList] = useState([])
    const [loading,setLoading] = useState(false)
    const [visible,setVisible] = useState(false)
    const [api, contextHolder] = notification.useNotification();
    const [itemUpdate,setItemUpdate] = useState(null)
    const [imageObject,setImageObject] = useState(null)
    const [imagePreView,setImagePreView] = useState(null)
    

    const {confirm} = Modal

    useEffect(()=>{
        getListCategory()
    },[])

    const getListCategory = (text_search) => {
        setLoading(true)
        var param = ""
        if(text_search != null){
            param = "?text_search="+text_search
        }
        request("get","category/get-all"+param,{}).then(res=>{
            console.log(res.data.list)
            setList(res.data.list)
            setLoading(false)
           
        })
    }

    const handleOpenModal = () => {
        setVisible(true)
    }

    const handleCloseModal = () => {
        setVisible(false)
        setItemUpdate(null)
    }

    const onClickBtnEdit = (items) => {
        setItemUpdate(items)
        setVisible(true)
    }

    const onFinish = (items) => {
        handleCloseModal()
        setLoading(true)
        var myform = new FormData()
        myform.append("name",items.name)
        myform.append("description",items.description)
        if(imageObject){
            myform.append("image_upload",imageObject,imageObject.filename)
        }
        var method = "post", url = "category/create"
        if(itemUpdate != null){
            method = "put"
            url = "category/update"
            myform.append("category_id",itemUpdate.category_id)
        }
        request(method,url,myform).then(res=>{
            if(res.data){
                getListCategory()
                setLoading(false)
                api["success"]({
                    message:itemUpdate == null ? "Create" : "Update",
                    description : res.data.message
                })
            }
        })
    }

    const onClickBtnDelete = (id) => {
        confirm({
            title:"Do you Want to delete these items?",
            icon: <ExclamationCircleFilled />,
            content: 'Are sure to remove it',
            onOk(){
                setLoading(true)
                request("delete","category/remove/"+id).then(res=>{
                    if(res.data){
                        api["success"]({
                            message:"Delete",
                            description : res.data.message
                        })
                        getListCategory()
                    }
                })
            }
        })
    }

    const onChangeImage = (even) => {
        var fileObject = even.target.files[0]
        setImageObject(fileObject)
        setImagePreView(URL.createObjectURL(fileObject))
    }

    const onClickRemoveImage = () => {
        setImagePreView(null)
    }

    return (
        <PageContainer
            title={getText("title_category")} 
            btnRight={"New Category"}
            onBtnRight={handleOpenModal}
            loading={loading}
            onSearch={getListCategory}
        >
            {contextHolder}
            <Table 
                columns={[
                    {
                        key:0,
                        title:"No",
                        dataIndex:"",
                        render : (item,items,index) => (index+1)
                    },
                    {
                        key:1,
                        title:"Category Name",
                        dataIndex:"name"
                    },
                    {
                        key:2,
                        title:"image",
                        dataIndex:"image",
                        render : (item,items,index) =>{
                            return (
                                <Image
                                    src={image_path+item} 
                                    width={80}
                                />
                            )
                        }
                    },
                    {
                        key:3,
                        title:"Description",
                        dataIndex:"description"
                    },
                    {
                        key:4,
                        title:"Created",
                        dataIndex:"create_at",
                        render : (item) => {
                            return  dateForClient(item)
                        }
                    },
                    {
                        key:5,
                        title:"Action",
                        render : (items) => {
                            return (
                                <Space>
                                    <Button onClick={()=>onClickBtnDelete(items.category_id)}  danger={true} size="small"><DeleteFilled/></Button>
                                    <Button onClick={()=>onClickBtnEdit(items)} type="primary" size="small"><EditFilled/></Button>
                                </Space>
                            )
                        }
                    }
                    
                ]}
                dataSource={list}
            />
            <FormModal
                itemUpdate={itemUpdate}
                open={visible}
                onCancel={handleCloseModal}
                onFinish={onFinish}
                imagePreView={imagePreView}
                onChangeImage={onChangeImage}
                onClickRemoveImage={onClickRemoveImage}
            />
            
        </PageContainer>
    )
}

export default CategoryPage