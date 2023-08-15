import { useEffect, useState } from "react"
import PageContainer from "../../component/page/PageContainer"
import {request} from "../../util/api"
import { Col, Empty, List, Row } from "antd"
import "./OrderPage.css"
import CustomerList from "./CustomerList"
import { image_path } from "../../util/service"

const OrderPage = () => {

    const [customer,setCustomer] = useState([])
    const [cart,setCart] = useState([])
    const [indexActive,setIndexActive] = useState(0)

    useEffect(()=>{
        getListCustomer()
    },[])

    const getListCustomer = () => {
        request("get","customer/get-list",{}).then(res=>{
            setCustomer(res.data.list)
        })
    }

    const getListProductByCustomer = (customer_id) => {
        request("get","cart/get-cart-by-customer/"+customer_id,{}).then(res=>{
            setCart(res.data.list)
            console.log(res.data)
        }).catch(er=>{
            console.log(er)
        })
    }

    const onClick = (item,index) => {
        getListProductByCustomer(item.customer_id)
        setIndexActive(index)
    }

    return (
        <PageContainer 
            title={"Order"}
        >
            <Row>
                <Col span={12} className="gridLeft">
                    {customer.map((item,index)=>{
                        return (
                           <CustomerList 
                             key={index}
                             isActive = {indexActive == index}
                             firstname={item.firstname}
                             lastname={item.lastname}
                             email={item.username}
                             gender={item.gender}
                             onClick={()=>onClick(item,index)}
                           />
                        )
                    })}
                </Col>
                <Col span={12}>
                    {cart.length != 0 ? cart.map((item,index)=>{
                        return (
                           <Row key={index} style={{padding:10,borderBottom:"1px solid #eee"}}>
                            <Col style={{paddingRight:10}}>
                                <img 
                                    src={image_path + item.image}
                                    width={60}
                                />
                            </Col>
                            <Col>
                                <div style={{fontSize:18,fontWeight:'bold'}}>{item.name}</div>
                                <div>price {item.price}$</div>
                                <div>quntity : {item.quantity}</div>
                            </Col>
                           </Row>
                        )
                    })
                    :
                    <Empty/>
                    }
                    
                </Col>
            </Row>
        </PageContainer>
    )
}

export default OrderPage