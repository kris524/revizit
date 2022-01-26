
import {
  Button,
  Card,
  Form,
  Input,
  Layout,
  Menu,
  Typography,
  Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { useReactMediaRecorder } from "react-media-recorder";

const { Title } = Typography;
const { Header, Content, Sider } = Layout;

function Home() {

  const {
    status,
    startRecording,
    stopRecording,
    mediaBlobUrl,
  } = useReactMediaRecorder({ audio: true });

  console.log(status);

  return (
    <Layout>
      <Header style={{ height: "7vh", padding: '10px' }}>
        <Title style={{ color: "white" }} level={2}>Home</Title>
      </Header>
      <Layout style={{ height: '93vh' }}>
        <Sider width={200} style={{ display: 'flex', flexFlow: 'column', height: "100%" }}>
          <Menu
            mode="inline"
            style={{ height: '100%' }}
          >
            <Menu.Item key="1">New Session</Menu.Item>
            <Menu.Item key="2">View Sessions</Menu.Item>
          </Menu>
        </Sider>
        <Content style={{ padding: 25 }}>

          <Card title="New Session">
            {
              status === "stopped"
              ?
                <>
                  <audio controls src={mediaBlobUrl}></audio>
                  <br/>
                </>
              : null
            }
            {
              status === "recording"
              ? (
                <>
                  <Title level={4}>Recording...</Title>
                  <Button type="danger" style={{ marginRight: "10px" }} onClick={stopRecording}>Stop Recording</Button>
                </>
              )
              : (
                <>
                  <Button type="primary" style={{ marginRight: "10px" }} onClick={startRecording}>Record</Button>
                  or...
                  <Upload>
                    <Button style={{ marginLeft: "10px" }} icon={<UploadOutlined />}>Click to Upload</Button>
                  </Upload>
                </>
              )
            }
          </Card>
      </Content>
      </Layout>
    </Layout>
  )
}

export default Home;