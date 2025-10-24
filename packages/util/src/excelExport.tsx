import { message } from 'antd';
import { SheetJSONOpts, utils, WorkSheet, writeFile, WritingOptions } from 'xlsx';

type TSheetStyle<K extends keyof WorkSheet> = {
  type: K;
  idx: number;
  style: WorkSheet[K];
};

export type TSheetInfo<T> = {
  name: string; // 시트명
  data: {
    headers: string[]; // column 제목 (엑셀에 보일 순서대로 넣어줄것)
    contents: T[]; // 내용 {칼럼제목: 내용}[]
    opts?: SheetJSONOpts;
    styles?: TSheetStyle<keyof WorkSheet>[];
  };
};

const excelExport = <T,>(
  fileName: string,
  sheetList: TSheetInfo<T>[],
  options?: WritingOptions
) => {
  try {
    const workbook = utils.book_new();

    if (!sheetList) throw new Error('엑셀 데이터가 존재하지 않습니다.');

    for (const sheet of sheetList) {
      const { headers, contents, opts, styles } = sheet.data;

      const worksheet = utils.json_to_sheet(contents, { header: headers });
      utils.sheet_add_aoa(worksheet, [headers], { origin: 'A1', ...opts });

      if (styles) {
        styles.forEach((styleInfo) => {
          const { type, idx, style } = styleInfo;
          if (!worksheet[type]) worksheet[type] = [];
          if (!worksheet[type][idx]) worksheet[type][idx] = {};
          worksheet[type][idx] = { ...worksheet[type][idx], ...style };
        });
      }

      const range = utils.decode_range(worksheet['!ref']!);
      for (let R = range.s.r + 1; R <= range.e.r; ++R) {
        for (let C = range.s.c; C <= range.e.c; ++C) {
          const cellAddress = utils.encode_cell({ r: R, c: C });
          const cell = worksheet[cellAddress];
          if (cell && typeof cell.v === 'number') {
            cell.z = '#,##0'; // 세 자리 콤마 표시
          }
        }
      }

      utils.book_append_sheet(workbook, worksheet, sheet.name);
    }

    writeFile(workbook, `${fileName}.xlsx`, options);
  } catch (err) {
    message.error('엑셀 다운로드 시 문제가 발생했습니다.');
  }
};

export default excelExport;
