
import './App.css';
import {BrowserRouter,Routes,Route} from "react-router-dom"
import HomePage from "../src/page/home/HomePage"
import CategoryPage from "../src/page/category/CategoryPage"
import CustomerPage from "../src/page/customer/CustomerPage"
import LayoutOne from './component/layout/LayoutOne';
import LayoutMain from './component/layout/LayoutMain';
import LoginPage from './page/user/LoginPage';
import PaymentMethodPage from './page/payment-method/PaymentMethodPage';
import OderStatusPage from './page/order-status/OderStatusPage';
import SettingPage from './page/setting/SettingPage';
import ProductPage from './page/product/ProductPage';
import CartPage from './page/cart/CartPage';
import OrderPage from './page/order/OrderPage';
import WishlistPage from './page/wishlist/WishlistPage';

function App() {
  const isLogin = localStorage.getItem("isLogin") == "1" ? true : false
  return (
    <BrowserRouter>

      {isLogin && <LayoutMain>
        <Routes>
          {/* <Route path='dashboard' >
            <Route path='a' element={<h1>A</h1>}/>
            <Route path='b' element={<h1>A</h1>}/>
            <Route path='c' element={<h1>A</h1>}/>
          </Route> */}
          <Route path='/' element={<HomePage /> }/>
          <Route path='/category' element={<CategoryPage/>}/>
          <Route path='/customer' element={<CustomerPage/>}/>
          <Route path='/payment-method' element={<PaymentMethodPage/>}/>
          <Route path='/order-status' element={<OderStatusPage/>}/>
          <Route path='/setting' element={<SettingPage/>} />
          <Route path='/product' element={<ProductPage/>} />
          <Route path='/order' element={<OrderPage/>} />
          <Route path='/wishlist' element={<WishlistPage/>} />
          <Route path='/cart' element={<CartPage/>} />
          <Route path='*' element={<h1>Route Not Found</h1>}/>   

        </Routes>
      </LayoutMain>}

      {!isLogin && 
        <LayoutOne>
          <Routes>
            <Route path='*' element={<LoginPage/>}/>
            <Route path='/login' element={<LoginPage/>}/>
          </Routes>
        </LayoutOne>
      }

    </BrowserRouter>
  );
}

export default App;
