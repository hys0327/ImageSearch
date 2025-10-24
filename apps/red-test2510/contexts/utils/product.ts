import _ from 'lodash';
import { getBytes, getStringFromByteLength } from '@repo/util';

const additionalOptionRules: Record<
  string,
  { filters: { name: string; conditions: { name: string; code: string }[] }[] }
> = {
  GSCACDP: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '유광',
            code: 'POG',
          },
          {
            name: '무광',
            code: 'POM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCAEPB: {
    filters: [
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCAGBH: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '일반',
            code: 'GHD',
          },
          {
            name: '맥세이프',
            code: 'GHM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCAGBM: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '유광',
            code: 'MPG',
          },
          {
            name: '무광',
            code: 'MPM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCAGBP: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '유광',
            code: 'GBG',
          },
          {
            name: '무광',
            code: 'GBM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCAGBR: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '유광',
            code: 'GMG',
          },
          {
            name: '무광',
            code: 'GMM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCASOP: {
    filters: [
      {
        name: '색상',
        conditions: [
          {
            name: '블랙',
            code: '#000000',
          },
          {
            name: '스카이블루',
            code: '#A3E6FF',
          },
          {
            name: '퍼플',
            code: '#AC94E0',
          },
          {
            name: '핑크',
            code: '#FFB6D0',
          },
          {
            name: '옐로우',
            code: '#FFF99E',
          },
          {
            name: '화이트',
            code: '#FFFFFF',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCATCP: {
    filters: [
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCATPD: {
    filters: [
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
  GSCATPG: {
    filters: [
      {
        name: '자재종류',
        conditions: [
          {
            name: '일반',
            code: 'TGH',
          },
          {
            name: '맥세이프',
            code: 'TGM',
          },
        ],
      },
      {
        name: '종류',
        conditions: [
          {
            name: '아이폰',
            code: 'MTG_APP',
          },
          {
            name: '갤럭시',
            code: 'MTG_SAM',
          },
        ],
      },
    ],
  },
};

export const getGroupLabel = (option: any) => {
  switch (option.type) {
    case 'size':
      return '사이즈';
    case 'material':
      return '용지';
    case 'side':
      return '인쇄도수';
    case 'templateInfo':
      return '리소스';
    case 'PCS':
      return option.info.pcsName;
    case 'additionalOption':
      return option.info.name;
    default:
      return '';
  }
};

export const getLabel = (option: any, type: 'origin' | 'custom' = 'origin') => {
  const { label, info } = option;

  if (type === 'custom' && label) return label;

  switch (option.type) {
    case 'size':
      return `${info.cutWidth}x${info.cutHeight}(${info.workWidth}x${info.workHeight})`;
    case 'side':
      return info === 'SID_X' ? '인쇄없음' : info === 'SID_S' ? '단면' : '양면';
    case 'templateInfo':
      return info.resourceId;
    case 'PCS':
      return info.pcsDetailName;
    case 'additionalOption':
      return info.detailName;
    default:
      return info;
  }
};

export const getAdditionalOption = (orderCodeInfo: IOrderCode) => {
  const rule = additionalOptionRules[orderCodeInfo.productCode];
  if (!rule) return orderCodeInfo;

  const additionalOption = rule.filters.reduce(
    (result: IOrderCode['additionalOption'] = [], filter) => {
      const targetOption = filter.conditions.find((condition) =>
        orderCodeInfo.material.includes(condition.name)
      );
      if (!targetOption) return result;

      const additionalOption = {
        code: targetOption.code,
        name: filter.name,
        detailName: targetOption.name,
      };

      return [...result, additionalOption];
    },
    []
  );

  return { ...orderCodeInfo, additionalOption };
};

export const getProductInfo = async (
  _orderCodeList: IOrderCode[],
  options: { skipAdditionalOption?: boolean } = {}
) => {
  const { skipAdditionalOption } = options;

  const optionTypes: TOptionType[] = [
    'size',
    'material',
    'side',
    'PCS',
    'templateInfo',
    'additionalOption',
  ];

  const orderCodeList = skipAdditionalOption
    ? _orderCodeList
    : _orderCodeList.map(getAdditionalOption);
  const productOptionInfo = orderCodeList.reduce((result, product) => {
    optionTypes.forEach((type) => {
      if (_.isEmpty(product[type])) return;

      const info = product[type];
      const label = _.isArray(info) ? 'label' : getLabel({ type, info });
      if (!label) return;

      const arrayValue = _.isArray(info) ? info : [{ type, label, info }];
      result[type] = _.unionWith(result[type], arrayValue, _.isEqual);
    });

    return result;
  }, {} as IProductOptionInfo);

  // 후가공 필수선택 옵션인지 확인후 옵셔널일경우 "없음" 옵션추가
  const { PCS = [], additionalOption = [], ...restProductInfo } = productOptionInfo;

  // 리소스 정보 가져오는 로직
  if (restProductInfo.templateInfo) {
    const promiseList = restProductInfo.templateInfo.map(async (template) => {
      const res = await fetch(`/api/template/resource/${template.info.resourceId}`);
      const { result } = await res.json();

      const title = result?.features.title;
      const label = title ? `${title}(${template.label})` : template.label;
      return { ...template, label };
    });

    restProductInfo.templateInfo = await Promise.all(promiseList);
  }

  const nonSelectList = PCS.reduce((result: any, pcs: any) => {
    const isRequiredOption = orderCodeList.every(({ PCS }) =>
      PCS.find(({ pcsCode }) => pcsCode === pcs.pcsCode)
    );
    if (!isRequiredOption)
      return [...result, { ...pcs, pcsDetailCode: null, pcsDetailName: '없음' }];

    return result;
  }, []);

  const pcsList: IProductOptionInfo['PCS'] = _.concat(
    PCS,
    _.unionWith(nonSelectList, _.isEqual)
  ).map((info) => ({
    type: 'PCS',
    label: getLabel({ type: 'PCS', info }),
    info,
  }));

  const additionalList = additionalOption.map((info) => ({
    type: 'additionalOption',
    label: getLabel({ type: 'additionalOption', info }),
    info,
  }));

  // 중복되는 옵션 제거
  const seenValues = new Set();
  const productInfo = {
    ...restProductInfo,
    ..._.groupBy(pcsList, 'info.pcsCode'),
    ..._.groupBy(additionalList, 'info.name'),
  };

  Object.keys(productInfo).forEach((key) => {
    const labelList = productInfo[key]?.map((product) => getLabel(product));
    const valueAsString = JSON.stringify(labelList);

    if (seenValues.has(valueAsString)) {
      delete productInfo[key]; // 중복되는 값이면 키 삭제
    } else {
      seenValues.add(valueAsString); // 새로운 값이면 Set에 추가
    }
  });

  return productInfo;
};

export const getOption = (orderCodeInfo: IOrderCode, optionInfo: IOption): IOptionDetail => {
  const attributes = optionInfo.optionList.map((option) => {
    const defaultSelectedInfo = option.list.find(({ options }) => {
      return options.every((option) => {
        const productInfo = orderCodeInfo[option.type as TOptionType];

        if (_.isArray(productInfo)) {
          return option.info.pcsDetailCode === null
            ? !_.some(productInfo, ['pcsCode', option.info.pcsCode])
            : _.some(productInfo, option.info);
        }

        return _.isEqual(productInfo, option.info);
      });
    });

    const value = defaultSelectedInfo?.customLabel || defaultSelectedInfo?.label || '';

    return { name: option.name, value };
  });

  const skuCode = orderCodeInfo.orderCode;
  return {
    status: 'AVAILABLE',
    attributes,
    skuCode,
    extraCost: 0,
    stockQty: 99_999,
    _id: orderCodeInfo._id,
  };
};

export const formatSkuName = (originalStr: string) => {
  if (!originalStr) return { original: '', sliced: undefined };

  const original = originalStr
    .replace(/\/ 수량 : \d+/, '')
    .replace(/\/ 건수 : \d+/, '')
    .replace(/[/:]/g, '-')
    .replace('- 사이즈', '')
    .replace('- 용지없음', '')
    .replace(/\|/g, '')
    .replace(/\s/g, '')
    .trim();

  const bytes = getBytes(original);
  const sliced = bytes > 100 ? getStringFromByteLength(original, 100) : undefined;

  return { original, sliced };
};
