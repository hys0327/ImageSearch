import _ from 'lodash';

const differenceObject = (
  a: Record<string, any> = {},
  b: Record<string, any> = {}
): [Record<string, any>, Record<string, any>] => {
  return [
    _.fromPairs(_.differenceWith(Object.entries(a), Object.entries(b), _.isEqual)),
    _.fromPairs(_.differenceWith(Object.entries(b), Object.entries(a), _.isEqual)),
  ];
};

export default differenceObject;
