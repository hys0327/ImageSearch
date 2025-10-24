const byteCount = (str: string) => {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    const charCode = str.charCodeAt(i);
    if (charCode <= 0x7f) {
      count += 1;
    } else if (charCode <= 0x7ff) {
      count += 2;
    } else if (charCode <= 0xffff) {
      count += 3;
    } else {
      count += 4;
    }
  }
  return count;
};

export default byteCount;
