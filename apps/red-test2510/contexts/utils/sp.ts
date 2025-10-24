'use server';

import { pollPromise, sql } from './mssql';

const sp = async (
  name: string,
  inputsOptions: { name: string; type: sql.ISqlTypeFactoryWithLength; value: any }[]
) => {
  const poll = await pollPromise;

  if (!poll) throw { message: 'SP 연결 실패' };

  const request = poll.request();

  inputsOptions.forEach((option) => request.input(option.name, option.type, option.value));

  return await request.execute(name);
};

export default sp;
