import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  UsergroupAddOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, theme, Dropdown } from 'antd';
import { Children, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import './LayoutMain.css'
import { getText } from '../../util/service';

const { Header, Sider, Content } = Layout;



const App = ({ children }) => {

  var navigate = useNavigate()

  const [collapsed, setCollapsed] = useState(false);
  const { token: { colorBgContainer }, } = theme.useToken();

  const profile = JSON.parse(localStorage.getItem("profile"))

  const handleLogout = () => {
    localStorage.setItem('isLogin', '0')
    localStorage.setItem('profile', "{}")
    window.location.href = "/login"
  }

  const items = [
    {
      key: '1',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
          Profile
        </a>
      ),
    },
    {
      key: '2',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
          Setting
        </a>
      ),
    },
    {
      key: '3',
      label: (
        <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
          Change Password
        </a>
      ),
    },
    {
      key: '4',
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          Logout
        </a>
      ),
    },
  ];



  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: getText("home", "Home"),
              onClick: () => navigate('/')
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: getText("category", "Category"),
              onClick: () => navigate('/category')
            },
            {
              key: '3',
              icon: <VideoCameraOutlined />,
              label: 'Product',
              onClick: () => navigate('/product')
            },
            {
              key: '4',
              icon: <VideoCameraOutlined />,
              label: 'Cart',
              onClick: () => navigate('/cart')
            },
            {
              key: '5',
              icon: <VideoCameraOutlined />,
              label: 'Order',
              onClick: () => navigate('/order')
            },
            {
              key: '6',
              icon: <UsergroupAddOutlined />,
              label: 'Customer',
              onClick: () => navigate('/customer')
            },
            {
              key: '7',
              icon: <VideoCameraOutlined />,
              label: 'Wishlist',
              onClick: () => navigate('/wishlist')
            },
            {
              key: '8',
              icon: <VideoCameraOutlined />,
              label: 'Payment Method',
              onClick: () => navigate('/payment-method')
            },
            {
              key: '9',
              icon: <VideoCameraOutlined />,
              label: 'Order Status',
              onClick: () => navigate('/order-status')
            },
            {
              key: '10',
              icon: <VideoCameraOutlined />,
              label: 'Setting',
              onClick: () => navigate('/setting')
            },
            {
              key: '11',
              icon: <VideoCameraOutlined />,
              label: 'Logout',
              onClick: () => navigate('/logout')
            },

          ]}
        />
      </Sider>
      <Layout>
        <div className='header-container'>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
            }}
          />
          <Dropdown
            placement='bottomRight'
            menu={{ items }}
            arrow
          >
            <a className='profile-header'>
              <UserOutlined
                style={{ fontSize: 18, marginRight: 10, fontWeight: 'bold' }}
              />
              <div style={{ fontSize: 16, fontWeight: 'bold' }}>{profile.username}</div>
            </a>
          </Dropdown>
        </div>
        <Content
          style={{
            minHeight: '100vh',
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};
export default App;