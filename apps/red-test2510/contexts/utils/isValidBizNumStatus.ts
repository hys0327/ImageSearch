'use server';

//  사업자 번호 유효 확인 api
export async function isValidBizNumStatus(bizNum: string) {
  const serviceKey = process.env.BUSINESSMAN_OPEN_API;

  const num = bizNum.replace(/-/g, '');
  const url = 'https://api.odcloud.kr/api/nts-businessman/v1';

  const res = await fetch(`${url}/status?serviceKey=${serviceKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      b_no: [num],
    }),
    cache: 'no-store',
  });

  return await res.json();
}
