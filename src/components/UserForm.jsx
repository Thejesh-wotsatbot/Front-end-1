import { useState, useEffect } from 'react';
import { Form, Input, Select, Button, Card, notification } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const { Option } = Select;

const UserFormComponent = () => {
  const [userGroups, setUserGroups] = useState([]);
  const [notificationApi, contextHolder] = notification.useNotification();

  useEffect(() => {
    // Fetch user groups from the backend to populate the dropdown
    axios.get('https://agilebackendtest-ig6zd90q.b4a.run//api/userGroups')
      .then(response => setUserGroups(response.data))
      .catch(error => console.error('Error fetching user groups:', error));
  }, []);

  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      whatsappNumber: '',
      userGroup: ''
    },
    validationSchema: Yup.object({
      userName: Yup.string().required('User name is required'),
      email: Yup.string().email('Invalid email format').required('Email is required'),
      whatsappNumber: Yup.string()
        .matches(/^\+?[1-9]\d{1,14}$/, 'Invalid WhatsApp number format')
        .required('WhatsApp number is required'),
      userGroup: Yup.string().required('User group is required'),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        await axios.post('https://agilebackendtest-ig6zd90q.b4a.run//api/users', values);
        notificationApi.success({
          message: 'User Saved',
          description: 'User has been created successfully!',
        });
        resetForm();
      } catch (error) {
        console.error('There was an error saving the user!', error);
        notificationApi.error({
          message: 'Error',
          description: 'There was an error saving the user.',
        });
      }
    },
  });

  return (
    <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
      {contextHolder}
      <h2 style={{ textAlign: 'center', fontSize: '24px', marginBottom: '20px' }}>Create User</h2>
      <Card hoverable style={{ transition: 'transform 0.1s ease-in-out', border: '1px solid #ddd' }}>
        <div style={{ padding: '20px' }}>
          <Form layout="vertical" onFinish={formik.handleSubmit}>
            <Form.Item label="User Name" required>
              <Input
                placeholder="Enter User Name"
                {...formik.getFieldProps('userName')}
              />
              {formik.touched.userName && formik.errors.userName && (
                <div className="text-red-500 text-xs">{formik.errors.userName}</div>
              )}
            </Form.Item>

            <Form.Item label="Email" required>
              <Input
                placeholder="Enter Email"
                {...formik.getFieldProps('email')}
              />
              {formik.touched.email && formik.errors.email && (
                <div className="text-red-500 text-xs">{formik.errors.email}</div>
              )}
            </Form.Item>



            <Form.Item label="WhatsApp Number" required>
              <Input
                placeholder="Enter WhatsApp Number"
                {...formik.getFieldProps('whatsappNumber')}
              />
              {formik.touched.whatsappNumber && formik.errors.whatsappNumber && (
                <div className="text-red-500 text-xs">{formik.errors.whatsappNumber}</div>
              )}
            </Form.Item>



            <Form.Item label="User Group" required>
              <Select
                placeholder="Select User Group"
                value={formik.values.userGroup || undefined}
                onChange={(value) => formik.setFieldValue('userGroup', value)}
              >
                {userGroups.length === 0 ? (
                  <Option value="" disabled>
                    No User Groups Available
                  </Option>
                ) : (
                  userGroups.map((group) => (
                    <Option key={group._id} value={group._id}>
                      {group.name}
                    </Option>
                  ))
                )}
              </Select>
              {formik.touched.userGroup && formik.errors.userGroup && (
                <div className="text-red-500 text-xs">{formik.errors.userGroup}</div>
              )}
            </Form.Item>
            
            <Form.Item>
              <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                Create User
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Card>
    </div>
  );
};

export default UserFormComponent;
