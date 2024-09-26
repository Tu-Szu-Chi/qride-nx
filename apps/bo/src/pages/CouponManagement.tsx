import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button } from 'antd';

const CouponManagement: React.FC = () => {
  const columns = [
    {
      title: 'Coupon Code',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Discount Amount',
      dataIndex: 'discount',
      key: 'discount',
    },
    {
      title: 'Expiry Date',
      dataIndex: 'expiryDate',
      key: 'expiryDate',
    },
    {
      title: 'Usage Count',
      dataIndex: 'usageCount',
      key: 'usageCount',
    },
  ];

  return (
    <div>
      <h1>Coupon Management</h1>
      <ProTable
        columns={columns}
        request={async (params, sorter, filter) => {
          // Logic to fetch data from API
          return {
            data: [
              {
                code: 'SUMMER2023',
                discount: 100,
                expiryDate: '2023-08-31',
                usageCount: 50,
              },
              // ... more data
            ],
            success: true,
          };
        }}
        rowKey="code"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" type="primary">
            Add Coupon
          </Button>,
        ]}
      />
    </div>
  );
};

export default CouponManagement;
