//  사업자 번호
function isValidBizNum(bizNum: string) {
  const num = bizNum.replace(/-/g, '');
  if (!/^[0-9]{10}$/.test(num)) return false;

  const weights = [1, 3, 7, 1, 3, 7, 1, 3, 5];
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += parseInt(num.charAt(i), 10) * (weights[i] as number);
  }
  sum += Math.floor((parseInt(num.charAt(8), 10) * 5) / 10);
  const checkDigit = (10 - (sum % 10)) % 10;
  return checkDigit === parseInt(num.charAt(9), 10);
}

//  핸드폰
const isValidPhoneNumber = (phoneNumber: string) => {
  const phoneReg =
    /^(010-\d{4}-\d{4}|02-\d{3,4}-\d{4}|05[0-9]{1,2}-\d{3,4}-\d{4}|0[3-9]\d-\d{3,4}-\d{4})$/;
  return phoneReg.test(phoneNumber);
};

// 이메일
const isValidEmail = (email: string) => {
  return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
};

export { isValidBizNum, isValidPhoneNumber, isValidEmail };
