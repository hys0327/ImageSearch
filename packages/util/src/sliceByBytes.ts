const sliceByBytes = (str: string, byteLimit: number) => {
  let count = 0;
  let slicedStr = '';

  for (let i = 0; i < str.length; i++) {
    const char = str[i];
    const charCode = str.charCodeAt(i);

    let charByteSize;

    if (charCode < 0x7f) {
      charByteSize = 1;
    } else if (charCode <= 0x7ff) {
      charByteSize = 2;
    } else if (charCode <= 0xffff) {
      charByteSize = 3;
    } else {
      charByteSize = 4;
    }

    if (count + charByteSize > byteLimit) break;

    count += charByteSize;
    slicedStr += char;
  }

  return slicedStr;
};

export default sliceByBytes;
