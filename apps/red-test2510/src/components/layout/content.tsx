import { Card, Flex } from "antd";

const Content = ({ children }: { children: React.ReactNode }) => {
    return (
        <Flex
            className="grow p-10 pt-4 min-h-screen overflow-hidden ml-[240px] peer-[.ant-layout-sider-collapsed]:ml-20"
            vertical
        >
            <h3 className="title text-2xl mb-4">이미지 써치 업로드</h3>
            <main className="grow w-full">
                <Card className="h-full [&_.ant-card-body]:h-full">{children}</Card>
            </main>
        </Flex>
    );
}

export default Content;