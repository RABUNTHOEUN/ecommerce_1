import {useState} from "react"
import "./PageContainer.css"
import {Button, Input, Spin} from 'antd'
const PageContainer = ({
    title=null,
    loading=false,
    children,
    onSearch,
    btnRight,
    onBtnRight
}) => {

    return (
        <div className="page-main-container">
            {title && <div className="page-container">
                <div className="row-pagename">
                    <div className="txt-main">{title}</div>
                    <Input.Search
                        placeholder="Search"
                        allowClear
                        onSearch={onSearch}
                    />
                </div>
                <div>
                    {btnRight && <Button onClick={onBtnRight} type='primary'>{btnRight}</Button>}
                </div>
            </div>}
            <div>
                <Spin spinning={loading}>
                    {children}
                </Spin>
            </div>
        </div>
    )
}

export default PageContainer;