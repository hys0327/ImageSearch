'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Collapse, Layout, Menu } from "antd";

interface IMenuItem {
    children?: IMenuItem[];
    label: string;
    path: string;
}

const Nav = () => {

    const [collapsed, setCollapsed] = useState(false);

    const pathname = usePathname();

    // 더미
    const showMenuList = [
        {
            key: "1",
            label: <Link href="/">홈</Link>,
        },
        {
            key: "2",
            label: <Link href="/product">제품</Link>,
        }
    ];

    const handleMenuClick = (e: any) => {
        console.log('aa');
    }
    return (
        <Layout.Sider
            width={240}
            className="peer !fixed h-screen max-h-screen inset-y-0"
            collapsed={collapsed}
        >
            <div className="flex flex-col gap-3 h-full">
                <Menu
                    items={showMenuList}
                    selectedKeys={[pathname]}
                />
            </div>
        </Layout.Sider>
    )
}

export default Nav;