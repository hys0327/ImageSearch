import dayjs from 'dayjs';
import _ from 'lodash';

//  비즈하우스 엑셀파일 정리
function bizSettlementDataSetting(data: Record<string, any>[]) {
  let lastOrderIdx: number | undefined = undefined;

  const normalizedData = data.map((item) => {
    let newItem = { ...item };

    if (newItem['주문 IDX'] !== undefined) {
      lastOrderIdx = newItem['주문 IDX'];
    } else if (lastOrderIdx !== undefined) {
      newItem['주문 IDX'] = lastOrderIdx;
    }

    return newItem;
  });

  const grouped = _.groupBy(normalizedData, '주문 IDX');

  return Object.values(grouped).map((orders) => {
    const firstOrder = orders.find((o) => o['주문일'] !== undefined) ?? orders[0] ?? {};

    return {
      orderNumber: String(firstOrder['주문 IDX']!),
      orderDate: dateChange(firstOrder['주문일']),
      shippingFee: String(firstOrder['배송비']),
      products: orders.map((order) => ({
        productName: order['상품명'],
        productionStage: order['생산단계'],
        productionDate: dateChange(firstOrder['생산단계 일자']),
        productNumber: String(order['상품 IDX']).split(' ')[0],
        printAmount: String(order['출력 가격']),
        postPCSAmount: String(order['후가공 가격']),
        totalAmount: String(order['(상품 출력/제조)총 공급가격']),
        quantity: String(order['수량']),
      })),
    };
  });
}

function dateChange(date: number) {
  return dayjs((date - 25569) * 86400 * 1000).toISOString();
}

export default bizSettlementDataSetting;
