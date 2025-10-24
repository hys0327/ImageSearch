const uploadToS3 = async (uploadData: { url: string; formData: FormData }) => {
  const { url, formData } = uploadData;

  try {
    const res = await fetch(url, {
      method: 'POST',
      body: formData,
    });

    if (!res.ok) throw new Error('[ERROR] S3 업로드 중 에러 발생');

    return Promise.resolve({ success: true });
  } catch (error) {
    return Promise.reject(error);
  }
};

export default uploadToS3;
