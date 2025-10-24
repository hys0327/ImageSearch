import _ from 'lodash';

const createQueryParams = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(
      ([_key, value]) =>
        !_.isNil(value) && value !== '' && !(Array.isArray(value) && value.length === 0) // 빈 값과 빈 배열 제외
    )
    .map(([key, value]) =>
      Array.isArray(value)
        ? `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};

export default createQueryParams;
