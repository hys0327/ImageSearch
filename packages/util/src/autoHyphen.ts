const autoHyphen = (value: string) => {
  if (!value) return value;

  const phoneReg = new RegExp(/^(\d{0,3})(\d{0,4})(\d{0,4})$/g);
  const telReg = new RegExp(/(^02|^0504|^0505|\d{3})(\d{0,3}|\d{0,4})?(\d{0,4})$/);
  const maxLength = /^0504|^0505/.test(value) ? 14 : /^02/.test(value) ? 12 : 13;

  const hyphenReg = /^010/.test(value) ? phoneReg : telReg;
  const lengthReg = new RegExp(`(.{${maxLength}})(.*)`);

  return value
    .replace(lengthReg, '$1')
    .replace(/[^0-9]/g, '')
    .replace(hyphenReg, '$1-$2-$3')
    .replace(/(\-{1,2})$/g, '');
};

export default autoHyphen;
