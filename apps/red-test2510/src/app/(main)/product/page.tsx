'use client';

import { useState } from "react";
import { useQuery } from "react-query";
import dayjs from 'dayjs';
import { factory } from "@contexts/api";
import { Button, Modal, Spin, Upload, Typography, message } from "antd";
import _, { debounce } from "lodash";
import { UploadChangeParam } from "antd/es/upload";
import { factoryPresignedHandler } from "./_util";

const Product = () => {
    const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    interface IFactorySearchParams {
        startDate?: string;
        endDate?: string;
        orderNumber?: string;
        receiver?: string;
        status?: number[];
    }

    const [searchInfo, setSearchInfo] = useState<IFactorySearchParams>({
        startDate: dayjs().subtract(7, 'day').format('YYYYMMDD'),
        endDate: dayjs().format('YYYYMMDD'),
        status: [1, 3, 5, 7],
        orderNumber: '',
        receiver: '',
    });

    const { data } = useQuery({
        queryKey: ['getBizHowsOrderList', searchInfo],
        queryFn: () => factory.getBizHowsOrderList(searchInfo),
    });

    // console.log("data", data);

    const bizhowsOrderList = data?.list;
    // console.log("bizhowsOrderList", bizhowsOrderList);
    // _.map 사용 이유: null/undeinfed, 객체까지 안전하게 처리 가능
    const orderNumList = _.map(bizhowsOrderList, (order) => `${order.orderNumber}-${order.productNumber}`) || [];

    // console.log("orderNumList", orderNumList);

    async function delayAlert() {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        alert("안녕?");
    }

    async function uploadImageHandler({ fileList }: UploadChangeParam) {

        const newFileList = fileList.map(file => ({
            ...file,
            tempName: `8405184-29669177`, // db에 있는 값 임시로 만들기
        }));
        console.log("newFileList", newFileList);

        setIsLoading(true);
        const presignedImageList = fileList.map(async (file) => {
            console.log("file", file);
            const fileName = file.name;
            // const fileName = file.tempName;

            const cuttingData = fileName.split('-');
            // console.log("cuttingData", cuttingData);
            const checkOrderNum = cuttingData[0] + '-' + cuttingData[1];
            // console.log("checkOrderNum", checkOrderNum);

            // 
            if (cuttingData[0] && cuttingData[1]) {
                if (orderNumList.includes(checkOrderNum)) {
                    message.error(`${fileName}파일과 해당하는 주문이 없습니다.`);
                } else {
                    console.log("업로드가 가능함");
                    const result = await factoryPresignedHandler(file, 'bizHows');
                    console.log("result", result);
                }
            }

        });

        // await Promise.all([delayAlert()]);
        await Promise.all(presignedImageList);
        // useState는 한번에 '배치' 되지만, await 구문을 통해 '배치' 타이밍을 나눌 수 있어서 두번의 상태 값 변화를 의도할 수 있다.
        setIsLoading(false);
        setIsOpenModal(false);
    };

    return (
        <Spin spinning={isLoading}>
            <div className="button-wrap">
                <Button type="primary" onClick={() => setIsOpenModal(true)}>파일 업로드</Button>
            </div>
            <Modal
                open={isOpenModal}
                onCancel={() => setIsOpenModal(false)}
                footer={null}
                title="파일 업로드"
            >
                <Upload.Dragger
                    className="block h-[40vh]"
                    multiple
                    accept=".pdf"
                    showUploadList={false}
                    beforeUpload={() => false}
                    onChange={debounce((file) => uploadImageHandler(file))}
                >
                    <Typography.Text type="secondary">
                        이 영역을 클릭하거나 파일을 끌어와 업로드하세요
                    </Typography.Text>
                </Upload.Dragger>
            </Modal>
        </Spin>
    )
}

export default Product;