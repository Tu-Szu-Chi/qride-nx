import React from 'react';
import { ProTable } from '@ant-design/pro-components';
import { Button, Modal, Form, Input, DatePicker } from 'antd';
import { Formik } from 'formik';
import * as Yup from 'yup';

const AdvertisementManagement: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const columns = [
    {
      title: 'Ad ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Start Date',
      dataIndex: 'startDate',
      key: 'startDate',
    },
    {
      title: 'End Date',
      dataIndex: 'endDate',
      key: 'endDate',
    },
  ];

  const validationSchema = Yup.object().shape({
    title: Yup.string().required('Please enter ad title'),
    content: Yup.string().required('Please enter ad content'),
    startDate: Yup.date().required('Please select start date'),
    endDate: Yup.date().required('Please select end date'),
  });

  return (
    <div>
      <h1>Advertisement Management</h1>
      <ProTable
        columns={columns}
        request={async () => {
          // Logic to fetch data from API
          return {
            data: [],
            success: true,
          };
        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
          showSizeChanger: true,
          showQuickJumper: true,
        }}
        dateFormatter="string"
        toolBarRender={() => [
          <Button key="button" type="primary" onClick={showModal}>
            Add Advertisement
          </Button>,
        ]}
      />
      <Modal
        title="Add Advertisement"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Formik
          initialValues={{
            title: '',
            content: '',
            startDate: null,
            endDate: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { setSubmitting }) => {
            // Handle form submission logic
            console.log(values);
            setSubmitting(false);
            setIsModalVisible(false);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
            isSubmitting,
            setFieldValue,
          }) => (
            <Form onFinish={handleSubmit}>
              <Form.Item
                name="title"
                validateStatus={errors.title && touched.title ? 'error' : ''}
                help={errors.title && touched.title ? errors.title : ''}
              >
                <Input
                  name="title"
                  placeholder="Ad Title"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.title}
                />
              </Form.Item>
              <Form.Item
                name="content"
                validateStatus={
                  errors.content && touched.content ? 'error' : ''
                }
                help={errors.content && touched.content ? errors.content : ''}
              >
                <Input.TextArea
                  name="content"
                  placeholder="Ad Content"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.content}
                />
              </Form.Item>
              <Form.Item
                name="startDate"
                validateStatus={
                  errors.startDate && touched.startDate ? 'error' : ''
                }
                help={
                  errors.startDate && touched.startDate
                    ? String(errors.startDate)
                    : ''
                }
              >
                <DatePicker
                  name="startDate"
                  placeholder="Start Date"
                  onChange={(date) => setFieldValue('startDate', date)}
                />
              </Form.Item>
              <Form.Item
                name="endDate"
                validateStatus={
                  errors.endDate && touched.endDate ? 'error' : ''
                }
                help={
                  errors.endDate && touched.endDate
                    ? String(errors.endDate)
                    : ''
                }
              >
                <DatePicker
                  name="endDate"
                  placeholder="End Date"
                  onChange={(date) => setFieldValue('endDate', date)}
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={isSubmitting}
                >
                  Submit
                </Button>
              </Form.Item>
            </Form>
          )}
        </Formik>
      </Modal>
    </div>
  );
};

export default AdvertisementManagement;
