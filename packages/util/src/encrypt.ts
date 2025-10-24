import CryptoJS from 'crypto-js';

const encrypt = (text: string, salt: string) => {
  if (!text) return '';

  return CryptoJS.AES.encrypt(text, salt).toString();
};

export default encrypt;
