import { Key } from 'react';
import { instance } from '@contexts/utils';
import _ from 'lodash';

// bizhows 비즈 하우스

interface IFactorySearchParams {
  startDate?: string;
  endDate?: string;
  orderNumber?: string;
  receiver?: string;
  status?: number[];
}

export async function getBizHowsOrderList(searchInfo: IFactorySearchParams) {
  return await instance.post('/bizhows/order/list', {
    body: JSON.stringify(searchInfo),
  });
}