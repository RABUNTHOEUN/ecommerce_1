import { Col, Row } from "antd"
import PageContainer from "../../component/page/PageContainer"
import { SaleSummaryChart } from "../../component/chart/SaleSummaryChart"
import { SalePerformanceChart } from "../../component/chart/SalePerformanceChart"


const HomePage = () => {

    const saleSummary = [
        {
            title : "Today",
            total_amount : 1000,
            total_qty : 300,
            total_order : 150
        },
        {
            title : "Yesterday",
            total_amount : 2000,
            total_qty : 400,
            total_order : 200
        },
        {
            title : "Last Week",
            total_amount : 20000,
            total_qty : 4009,
            total_order : 2000
        },
        {
            title : "Last Month",
            total_amount : 50000,
            total_qty : 6009,
            total_order : 3000
        }
    ]

    const moreInfor = [
        {
            title : "Customer",
            total_amount : 1000,
            total_qty : 300,
            total_order : 150
        },
        {
            title : "Product",
            total_amount : 2000,
            total_qty : 400,
            total_order : 200
        },
        {
            title : "Category",
            total_amount : 20000,
            total_qty : 4009,
            total_order : 2000
        },
        {
            title : "User",
            total_amount : 50000,
            total_qty : 6009,
            total_order : 3000
        }
    ]
    return (
        <PageContainer title={null}>
           <div className="txtBig" style={{marginBottom:20}}>Sale Performance</div>
           <SalePerformanceChart />
            <Row gutter={[10,10]}> 
                {saleSummary.map((item,index)=>{
                    return (
                        <Col span={12}>
                            <div style={{
                                height:150,
                                backgroundColor:"#eee",
                                borderRadius:5,
                                padding:20
                            }}>
                                <Row>
                                    <Col span={12}>
                                        <div className="txtMain">{item.title}</div>
                                        <div>{item.total_order} invoice</div>
                                    </Col>
                                    <Col span={12} style={{textAlign:'right'}}>
                                        <div className="txtMain">{item.total_amount}$</div>
                                        <div>{item.total_qty} PCS</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                })}
            </Row>

            <div className="txtBig" style={{marginBottom:20}}>Sale Summary</div>

            <SaleSummaryChart />

            <div className="txtBig" style={{marginBottom:20,marginTop:40}}>More Information</div>
            <Row gutter={[10,10]}> 
                {moreInfor.map((item,index)=>{
                    return (
                        <Col span={6}>
                            <div style={{
                                height:150,
                                backgroundColor:"#eee",
                                borderRadius:5,
                                padding:20
                            }}>
                                <Row>
                                    <Col span={12}>
                                        <div className="txtMain">{item.title}</div>
                                        <div>{item.total_order} invoice</div>
                                    </Col>
                                    <Col span={12} style={{textAlign:'right'}}>
                                        <div className="txtMain">{item.total_amount}$</div>
                                        <div>{item.total_qty} PCS</div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                    )
                })}
            </Row>
        </PageContainer>
    )
}

export default HomePage;