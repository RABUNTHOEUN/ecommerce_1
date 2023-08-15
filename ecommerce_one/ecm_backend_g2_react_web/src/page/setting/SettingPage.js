import "./SettingPage.css"
import PageContainer from "../../component/page/PageContainer";
import { Button, Divider, Space } from "antd";

const SettingPage = () => {
    const langId = localStorage.getItem("langId")

    const onChangeKH = () => {
        localStorage.setItem("langId",'2')
        window.location.reload()
    }

    const onChangeEn = () => {
        localStorage.setItem("langId",'1')
        window.location.reload()
    }
    return (
        <PageContainer
            title={null}
        >
            <div className="txtMain">Setting</div><br/>
            <Divider/>

            <div style={{marginBottom:20}} className="txtMain">Language</div>
           
            <Space>
                <Button type={langId == "1" ? "primary" : "default"} onClick={onChangeEn}>English</Button>
                <Button type={langId == "2" ? "primary" : "default"} onClick={onChangeKH}>Khmer</Button>
            </Space>


            <div style={{marginBottom:20}} className="txtMain">Profile</div>
            <Space>
                <Button type={langId == "1" ? "primary" : "default"} onClick={onChangeEn}>English</Button>
                <Button type={langId == "2" ? "primary" : "default"} onClick={onChangeKH}>Khmer</Button>
            </Space>


            <div style={{marginBottom:20}} className="txtMain">....</div>
            <Space>
                <Button type={langId == "1" ? "primary" : "default"} onClick={onChangeEn}>English</Button>
                <Button type={langId == "2" ? "primary" : "default"} onClick={onChangeKH}>Khmer</Button>
            </Space>

        </PageContainer>
    )
}

export default SettingPage;

