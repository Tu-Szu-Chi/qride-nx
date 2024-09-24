import React from 'react';
import { Layout, Menu, Button } from 'antd';
import { Link } from 'react-router-dom';
import {
  DashboardOutlined,
  UserOutlined,
  ShopOutlined,
  NotificationOutlined,
  GiftOutlined,
  BarChartOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
} from '@ant-design/icons';

const { Sider } = Layout;

interface SidebarProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
  return (
    <Sider
      breakpoint="lg"
      collapsedWidth="80"
      collapsed={collapsed}
      onCollapse={(collapsed) => setCollapsed(collapsed)}
      style={{
        overflow: 'auto',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        bottom: 0,
      }}
    >
      <div className="logo" />
      <Button
        type="default"
        onClick={() => setCollapsed(!collapsed)}
        style={{
          margin: '16px 0',
          width: '100%',
          borderRadius: 0,
          borderLeft: 'none',
          borderRight: 'none',
          backgroundColor: 'transparent',
          color: 'rgba(255, 255, 255, 0.65)',
        }}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
        <Menu.Item key="1" icon={<DashboardOutlined />}>
          <Link to="/">Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<UserOutlined />}>
          <Link to="/members">Member Management</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<ShopOutlined />}>
          <Link to="/dealers">Dealer Management</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<NotificationOutlined />}>
          <Link to="/advertisements">Advertisement Management</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<GiftOutlined />}>
          <Link to="/coupons">Coupon Management</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<BarChartOutlined />}>
          <Link to="/reports">Report Data</Link>
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default Sidebar;
