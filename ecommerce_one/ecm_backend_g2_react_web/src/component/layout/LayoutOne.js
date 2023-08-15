
import './LayoutOne.css'
import { useNavigate } from "react-router-dom"

const LayoutOne = ({ children }) => {
    var navigate = useNavigate()

    return (
        <div>
            <div className='header'>
                <div className='rowHeader'>
                    <div className='txtHeader'>Brand Name</div>
                    {/* <div className='rowItemMenu'>
                        <div className='itemMenu' onClick={()=>navigate("/")}>Home</div>
                        <div className='itemMenu'  onClick={()=>navigate("/category")}>Catgory</div>
                        <div className='itemMenu'  onClick={()=>navigate("/customer")}>Customer</div>
                    </div> */}
                </div>
            </div>
            <div className='body'>
                <div>{children}</div>
            </div>
        </div>
    )
}

export default LayoutOne;