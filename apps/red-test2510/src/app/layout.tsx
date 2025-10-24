import { Body } from '@components';
import './globals.css';

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <html lang="ko">
            <Body>
                {children}
            </Body>
        </html>
    )
}

export default RootLayout;