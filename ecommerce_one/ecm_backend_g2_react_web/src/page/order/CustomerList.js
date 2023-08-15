import { Col, Row } from "antd"
import "./CustomerList.css"

const CustomerList = ({
    firstname = "Sok",
    lastname = "Dara",
    tel = "09999999",
    email = "Email ",
    gender = "Male",
    onClick,
    isActive
}) => {

    return (
        <Row onClick={onClick} className={isActive ? "rowItemActived" : "rowItem"}>
            <Col span={12}>
                <div>{firstname} - {lastname}</div>
                <div>{email}</div>
            </Col>
            <Col span={12} style={{textAlign:'right'}}>
                <div>{tel}</div>
                <div>{gender == 1 ? "male" : "female"}</div>
            </Col>
            
           
        </Row>
    )
}

export default  CustomerList