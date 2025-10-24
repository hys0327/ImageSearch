const copy = async (text: string) => {
  try {
    if (typeof navigator.clipboard === 'undefined') throw new Error('클립보드 기능 지원 불가');
    await navigator.clipboard.writeText(text);
    return true;
  } catch (err) {
    return false;
  }
};

export default copy;
