import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  Outlet,
} from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import Sidebar from './components/Sidebar';
import PrivateRoute from './components/PrivateRoute';
import Login from './pages/Login';
import Unauthorized from './pages/Unauthorized';
import Dashboard from './pages/Dashboard';
import MemberManagement from './pages/MemberManagement';
import DealerManagement from './pages/DealerManagement';
import AdvertisementManagement from './pages/AdvertisementManagement';
import CouponManagement from './pages/CouponManagement';
import ReportData from './pages/ReportData';
import PostManagement from './pages/PostManagement';
import API from './utils/fetch';

const { Content } = Layout;

const MainLayout = ({ collapsed }: { collapsed: boolean }) => (
  <Layout style={{ minHeight: '100vh' }}>
    <Layout
      style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}
    >
      <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
        <Outlet />
      </Content>
    </Layout>
  </Layout>
);

function App() {
  const [collapsed, setCollapsed] = useState(false);
  useEffect(() => {
    API.get('/test')
    .then(res => {
      console.log(res)
    })
  }, [])

  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/unauthorized" element={<Unauthorized />} />
          <Route
            path="/"
            element={
              <PrivateRoute>
                <>
                  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
                  <MainLayout collapsed={collapsed} />
                </>
              </PrivateRoute>
            }
          >
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route
              path="dashboard"
              element={
                <PrivateRoute allowedRoles={['admin', 'user']}>
                  <Dashboard />
                </PrivateRoute>
              }
            />
            <Route
              path="members"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <MemberManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="dealers"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <DealerManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="advertisements"
              element={
                <PrivateRoute allowedRoles={['admin', 'user']}>
                  <AdvertisementManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="coupons"
              element={
                <PrivateRoute allowedRoles={['admin', 'user']}>
                  <CouponManagement />
                </PrivateRoute>
              }
            />
            <Route
              path="reports"
              element={
                <PrivateRoute allowedRoles={['admin']}>
                  <ReportData />
                </PrivateRoute>
              }
            />
            <Route
              path="post-management"
              element={
                <PrivateRoute allowedRoles={['admin', 'user']}>
                  <PostManagement />
                </PrivateRoute>
              }
            />
          </Route>
        </Routes>
      </Router>
    </ConfigProvider>
  );
}

export default App;
