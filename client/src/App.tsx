import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
// hoc
import AppLoader from "./hoc/app-loader.hoc";
// UI
import Content from "@UI/content/content.ui";
import Sidebar from "@UI/sidebar/sidebar.ui";
import Header from "@UI/header/header.ui";

const Component = styled(Layout)`
  height: 100vh;
`;

const isCollapsed = localStorage.getItem("isCollapsed") === "true";
const App: React.FC = (): JSX.Element => {
  const [collapsed, setCollapsed] = useState(isCollapsed);

  useEffect(() => {
    localStorage.setItem("isCollapsed", String(collapsed));
  }, [collapsed]);

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
