import { Layout } from "antd";
import React, { useState } from "react";
import styled from "styled-components";
// UI
import Content from "@UI/content/content.ui";
import Sidebar from "@UI/sidebar/sidebar.ui";
import Header from "@UI/header/header.ui";
import AppLoader from "./hoc/app-loader";

const Component = styled(Layout)`
  height: 100vh;
`;

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Component>
      <AppLoader>
        <>
          <Sidebar collapsed={collapsed} />
          <Layout>
            <Header collapsed={collapsed} setCollapsed={setCollapsed} />
            <Content>
              <h1>Здесь будет контент</h1>
            </Content>
          </Layout>
        </>
      </AppLoader>
    </Component>
  );
};

export default App;
