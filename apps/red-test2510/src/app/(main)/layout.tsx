import { Layout } from "antd";
import { Content, Nav } from "@components/layout";

const MainLayout = ({ children } : { children: React.ReactNode }) => {
    return (
        <Layout hasSider>
            <Nav />
            <Content>{children}</Content>
        </Layout>
    )
}

export default MainLayout;