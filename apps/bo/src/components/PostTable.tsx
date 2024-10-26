import React from 'react';
import { Table, Button } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import moment from 'moment';
import { Post } from '../types/post';
import { TableRowSelection } from 'antd/es/table/interface';

interface PostTableProps {
  posts: Post[];
  loading: boolean;
  totalPosts: number;
  currentPage: number;
  pageSize: number;
  onPageChange: (page: number, pageSize: number) => void;
  onEdit: (post: Post) => void;
  rowSelection: TableRowSelection<Post>;
}

const PostTable: React.FC<PostTableProps> = ({
  posts,
  loading,
  totalPosts,
  currentPage,
  pageSize,
  onPageChange,
  onEdit,
  rowSelection,
}) => {
  const columns = [
    { title: 'Title', dataIndex: 'title', key: 'title' },
    { title: 'Category', dataIndex: 'category', key: 'category' },
    {
      title: 'Status',
      dataIndex: 'isActive',
      key: 'isActive',
      render: (isActive: boolean) => (isActive ? 'Active' : 'Inactive'),
    },
    {
      title: 'Publish Date Range',
      key: 'publishDateRange',
      render: (_: unknown, record: Post) =>
        `${moment(record.publishStartDate).format('YYYY-MM-DD')} - ${moment(
          record.publishEndDate
        ).format('YYYY-MM-DD')}`,
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_: unknown, record: Post) => (
        <Button icon={<EditOutlined />} onClick={() => onEdit(record)}>
          Edit
        </Button>
      ),
    },
  ];

  return (
    <Table
      rowSelection={rowSelection}
      columns={columns}
      dataSource={posts}
      loading={loading}
      pagination={{
        current: currentPage,
        pageSize: pageSize,
        total: totalPosts,
        onChange: onPageChange,
      }}
      rowKey={(record) => record.id.toString()}
    />
  );
};

export default PostTable;
