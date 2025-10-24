import { read, utils } from 'xlsx';

const excelUpload = (
  file: File,
  isReadEmpty: boolean = false
): Promise<{ result: any; errorMessage: any }> => {
  return new Promise((resolve) => {
    const returnData: { result: any; errorMessage: any } = {
      result: null,
      errorMessage: null,
    };

    const reader = new FileReader();

    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target?.result as ArrayBuffer);
        const workbook = read(data, { type: 'array' });

        const sheetName = workbook.SheetNames[0];
        if (!sheetName) {
          throw new Error('엑셀 파일에 시트가 없습니다.');
        }

        const worksheet = workbook.Sheets[sheetName];
        if (!worksheet) {
          throw new Error(`시트 "${sheetName}"를 읽을 수 없습니다.`);
        }

        // const jsonData =
        //   utils.sheet_to_json(worksheet, isReadEmpty ? { defval: '' } : undefined) || [];

        // 전체 데이터를 먼저 읽기 (raw 배열 형식, 헤더 없음)
        const rows: any[][] = utils.sheet_to_json(worksheet, {
          header: 1,
          defval: '',
        });

        // "실제 헤더"가 될 첫 번째 유효한 행 찾기
        const headerRowIndex = rows.findIndex((row) =>
          row.some((cell: any) => cell !== null && cell !== '')
        );
        if (headerRowIndex === -1) {
          throw new Error('유효한 데이터가 없습니다.');
        }

        const headers = rows[headerRowIndex]; // 헤더 행
        const dataRows = rows.slice(headerRowIndex + 1); // 실제 데이터 행

        // 헤더와 데이터 매핑
        const jsonData = dataRows.map((row) => {
          const obj: Record<string, any> = {};
          headers?.forEach((header: string, i: number) => {
            obj[header] = row[i] ?? '';
          });
          return obj;
        });

        returnData.result = jsonData;
      } catch (error: any) {
        returnData.errorMessage = `파일을 읽는 도중 오류가 발생했습니다 : ${error.message}`;
      }
      resolve(returnData); // 파일 읽기가 끝난 후 데이터 반환
    };

    reader.onerror = () => {
      returnData.errorMessage = '파일을 읽는 중 오류가 발생했습니다.';
      resolve(returnData);
    };

    reader.readAsArrayBuffer(file);
  });
};

export default excelUpload;
