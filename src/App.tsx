import { Layout } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
// components
import Sidebar from "./components/UI/sidebar/sidebar.ui";
import Header from "./components/UI/header/header.ui";
import Content from "./components/UI/content/content.ui";

const Component = styled(Layout)`
  height: 100vh;
`;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Component>
      <Sidebar collapsed={collapsed} />
      <Layout>
        <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        <Content>
          <h1>test</h1>
        </Content>
      </Layout>
    </Component>
  );
};

export default App;
