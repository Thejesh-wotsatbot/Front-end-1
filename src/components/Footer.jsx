// FooterComponent.js
import { Layout } from 'antd';

const { Footer } = Layout;

const FooterComponent = () => {
  return (
    <Footer style={{ textAlign: 'center', padding: '20px 50px', backgroundColor: '#001529', color: '#ffffff' }}>
      ©2024 Agile Management. All Rights Reserved.
    </Footer>
  );
};

export default FooterComponent;
