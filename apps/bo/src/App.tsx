import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Layout, ConfigProvider } from 'antd';
import enUS from 'antd/lib/locale/en_US';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import MemberManagement from './pages/MemberManagement';
import DealerManagement from './pages/DealerManagement';
import AdvertisementManagement from './pages/AdvertisementManagement';
import CouponManagement from './pages/CouponManagement';
import ReportData from './pages/ReportData';

const { Content } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <ConfigProvider locale={enUS}>
      <Router>
        <Layout style={{ minHeight: '100vh' }}>
          <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
          <Layout
            style={{ marginLeft: collapsed ? 80 : 200, transition: 'all 0.2s' }}
          >
            <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
              <div style={{ padding: 24, minHeight: 360 }}>
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/members" element={<MemberManagement />} />
                  <Route path="/dealers" element={<DealerManagement />} />
                  <Route
                    path="/advertisements"
                    element={<AdvertisementManagement />}
                  />
                  <Route path="/coupons" element={<CouponManagement />} />
                  <Route path="/reports" element={<ReportData />} />
                </Routes>
              </div>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </ConfigProvider>
  );
}

export default App;
