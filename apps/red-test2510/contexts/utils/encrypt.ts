'use server';

import { encrypt as commonEncrypt } from '@repo/util';

const encrypt = async (CUST_COD: string) => {
  const customerCode = encodeURIComponent(CUST_COD);
  const SALT_KEY = process.env.SALT_KEY;

  return commonEncrypt(customerCode, SALT_KEY);
};

export default encrypt;
