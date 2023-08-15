import React , {useEffect,useState} from "react"
import { request } from "../../util/api"
import PageContainer from "../../component/page/PageContainer"
import { Button, Space, Table } from "antd"
import {EditFilled,DeleteFilled} from "@ant-design/icons"
import { dateForClient, getText } from "../../util/service"

const OderStatusPage = () => {

    const [list,setList] = useState([])

    useEffect(()=>{
        getLit()
    },[])

    const getLit = () => {
        request("get","order_status/get-all",{}).then(res=>{
            setList(res.data.list)
        })
    }

    return (
        <PageContainer
            title={"OrderStatus"} 
        >
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
                        title:"Name",
                        dataIndex:"name"
                    },
                    {
                        key:2,
                        title:"Status",
                        dataIndex:"status",
                        render : (item) => {
                            return  item == 1 ? "Actived" : "Disabled"
                        }
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
                        render : () => {
                            return (
                                <Space>
                                    <Button danger={true} size="small"><DeleteFilled/></Button>
                                    <Button type="primary" size="small"><EditFilled/></Button>
                                </Space>
                            )
                        }
                    }
                    
                ]}
                dataSource={list}
            />
        </PageContainer>
    )
}

export default OderStatusPage