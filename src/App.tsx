import { FC } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { Layout, Menu } from "antd";
import { Applications, FormPage, Home } from "./pages";

const { Header, Content } = Layout;

const items = [
  {
    key: "home",
    label: <Link to="/">Apply</Link>,
  },
  {
    key: "applications",
    label: <Link to="/applications">Applications</Link>,
  },
];

const App: FC = () => {
  return (
    <Router>
      <Layout style={{ height: "100%" }}>
        <Header>
          <Menu theme="dark" mode="horizontal" items={items} />
        </Header>
        <Content style={{ padding: "20px", height: "100%", overflow: 'auto' }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/form/:formId" element={<FormPage />} />
            <Route path="/applications" element={<Applications />} />
          </Routes>
        </Content>
      </Layout>
    </Router>
  );
};

export default App;
