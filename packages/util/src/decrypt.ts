import CryptoJS from 'crypto-js';

const decrypt = (text: string, salt: string) => {
  if (!text) return '';

  try {
    const bytes = CryptoJS.AES.decrypt(text, salt);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    console.error('Decryption error:', error);
    return '';
  }
};

export default decrypt;
