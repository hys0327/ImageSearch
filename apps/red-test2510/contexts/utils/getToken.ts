'use server';

import { cookies } from 'next/headers';

const getToken = async () => {
  return cookies().get('reqToken')?.value;
};

export default getToken;
