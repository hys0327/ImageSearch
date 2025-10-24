const onlyNumber = (text: string | number) => {
  return Number(String(text).replace(/[^0-9]/g, ''));
};

export default onlyNumber;
