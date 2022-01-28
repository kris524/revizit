
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Typography,
} from 'antd';
import { ReactMediaRecorder } from "react-media-recorder";

const { Title } = Typography;
const { Header, Content, Footer } = Layout;

function Login() {

  const onFinish = (values) => {
    console.log('Success:', values);
  };

  return (
    <Layout>
      <Header style={{ padding: 10 }}>
        <Title style={{ color: 'white' }} level={3}>Login</Title>
      </Header>
      <Content style={{
        padding: 25,
        margin: 0,
        minHeight: '100vh',
      }}>
        <Card>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 11, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  )
}

export default Login;