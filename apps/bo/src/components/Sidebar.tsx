import React from 'react';
import { Layout, Menu } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  NotificationOutlined,
  GiftOutlined,
  BarChartOutlined,
  LogoutOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
      }}
    >
      <div className="logo" />
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/dashboard">Dashboard</Link>
        </Menu.Item>
        {user && user.role === 'admin' && (
          <>
            <Menu.Item key="2" icon={<UserOutlined />}>
              <Link to="/members">Member Management</Link>
            </Menu.Item>
            <Menu.Item key="3" icon={<ShopOutlined />}>
              <Link to="/dealers">Dealer Management</Link>
            </Menu.Item>
          </>
        )}
        <Menu.Item key="4" icon={<NotificationOutlined />}>
          <Link to="/advertisements">Advertisement Management</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<GiftOutlined />}>
          <Link to="/coupons">Coupon Management</Link>
        </Menu.Item>
        {user && user.role === 'admin' && (
          <Menu.Item key="6" icon={<BarChartOutlined />}>
            <Link to="/reports">Report Data</Link>
          </Menu.Item>
        )}
        <Menu.Item key="7" icon={<LogoutOutlined />} onClick={handleLogout}>
          Logout
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
