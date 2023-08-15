import React,{useEffect,useState} from "react"
import {request}  from "../../util/api"
import './CustomerPage.css'
import PageContainer from "../../component/page/PageContainer"
import { Button, Space, Table } from "antd"
import dayjs from 'dayjs'
import { dateForClient } from "../../util/service"
import {DeleteFilled,EditFilled} from "@ant-design/icons"

const CustomerPage = () => {

    const [list,setList] = useState([])

    useEffect(()=>{
        getListCustomer()
    },[])

    const getListCustomer = () => {
        request("get","customer/get-list",{}).then(res=>{
            setList(res.data.list)
        }).catch(error=>{
            console.log(error)
        })
    }

    const onClickEdit = (item) => {
        console.log(item)

    }

    const onRemoveCustomer = (customer_id) => {
        // var url = "customer/remove/"+customer_id
        var url = `customer/remove/${customer_id}`
        request("delete",url,{}).then(res=>{
            if(res){
                alert(res.data.message)
                getListCustomer()
            }
        })
    }

    return (
        <PageContainer
            title="Customer"
        >
            <Table 
    	        columns={[
                    {
                        key:"No",
                        title : "No",
                        // dataIndex : ""
                        render : (item,items,index) => (index+1)
                    },
                    {
                        key:"Firstname",
                        title : "Firstname",
                        dataIndex : "firstname"
                    },
                    {
                        key:"Lastname",
                        title : "Lastname",
                        dataIndex : "lastname"
                    },
                    {
                        key:"Gender",
                        title : "Gender",
                        dataIndex : "gender",
                        render : (item) => {
                            return item == 1 ? "Male" : "Female"
                        }
                    },
                    {
                        key:"Username",
                        title : "Username",
                        dataIndex : "username"
                    },
                    {
                        key:"Create",
                        title : "Create",
                        dataIndex : "create_at",
                        render : (item) => {
                            return  dateForClient(item)
                        }
                    },
                    {
                        key:"Action",
                        title : "Action",
                        // dataIndex : "firstname"
                        render : (item,items) => {
                            return (
                                <Space>
                                    <Button onClick={()=>onRemoveCustomer(items.customer_id)} danger size="small"><DeleteFilled/></Button>
                                    <Button type="primary" size="small"><EditFilled/></Button>
                                </Space>
                            )
                        },
                        
                    },
                ]} 
                dataSource={list}           
            />
        </PageContainer>
    )
}

export default CustomerPage




















