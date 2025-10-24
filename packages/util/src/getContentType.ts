const getContentType = (extension: string) => {
  switch (extension) {
    case 'jpg':
    case 'JPG':
    case 'jpeg':
      return 'image/jpeg';
    case 'png':
      return 'image/png';
    case 'gif':
      return 'image/gif';
    case 'bmp':
      return 'image/bmp';
    case 'pdf':
      return 'application/pdf';
    case 'html':
      return 'text/html; charset=utf-8';
    default:
      return 'application/octet-stream';
  }
};

export default getContentType;
