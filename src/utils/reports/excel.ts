import { Share } from 'react-native';
import * as FileSystem from 'expo-file-system';
import XLSX from 'xlsx';
import * as Sharing from 'expo-sharing';

export type ExcelExportOptions = {
  sheetName?: string;
  fileName?: string;
  columnsOrder?: string[];
  dateSuffix?: boolean;
  forceCSV?: boolean;
};

export type ExportResult = {
  fileUri: string;
  fileName: string;
  sheetName: string;
  rows: number;
  columns: number;
  bytesWritten?: number;
  format: 'xlsx' | 'csv';
};

function buildFileName(base: string, ext: string, dateSuffix: boolean): string {
  const safeBase = base.replace(/[^a-zA-Z0-9-_]/g, '_');
  if (!dateSuffix) return `${safeBase}.${ext}`;
  const now = new Date();
  const stamp = `${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(
    now.getDate(),
  ).padStart(2, '0')}_${String(now.getHours()).padStart(2, '0')}${String(
    now.getMinutes(),
  ).padStart(2, '0')}${String(now.getSeconds()).padStart(2, '0')}`;
  return `${safeBase}_${stamp}.${ext}`;
}

function normalizeCellValue(value: unknown): string | number | boolean | null {
  if (value === undefined) return '';
  if (value === null) return '';
  if (value instanceof Date) return value.toISOString();
  if (Array.isArray(value)) return value.join(', ');
  if (typeof value === 'object') {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  if (typeof value === 'boolean') return value ? 'TRUE' : 'FALSE';
  return value as string | number;
}

function computeColumns(
  data: Record<string, any>[],
  explicit?: string[],
): string[] {
  if (explicit && explicit.length) return explicit;
  const set = new Set<string>();
  data.forEach((row) => Object.keys(row).forEach((k) => set.add(k)));
  return Array.from(set);
}

function buildCSV(data: Record<string, any>[], columns: string[]): string {
  const escape = (v: unknown): string => {
    const val = normalizeCellValue(v);
    const s = String(val ?? '');
    // Escape doble comilla y si contiene comas / saltos de línea envolver en comillas
    const needsQuotes = /[",\n]/.test(s);
    const esc = s.replace(/"/g, '""');
    return needsQuotes ? `"${esc}"` : esc;
  };
  const header = columns.map(escape).join(',');
  const rows = data.map((row) => columns.map((c) => escape(row[c])).join(','));
  return [header, ...rows].join('\n');
}

export async function generateExcelFromObjects(
  data: Record<string, any>[],
  options: ExcelExportOptions = {},
): Promise<ExportResult> {
  if (!Array.isArray(data) || data.length === 0) {
    throw new Error('No hay datos para exportar (array vacío).');
  }

  const {
    sheetName = 'Reporte',
    fileName = 'reporte',
    columnsOrder,
    dateSuffix = true,
    forceCSV = false,
  } = options;

  const columns = computeColumns(data, columnsOrder);
  const xlsxLib = forceCSV ? null : XLSX;
  const useXLSX = !!xlsxLib;

  if (!useXLSX) {
    const csv = buildCSV(data, columns);
    const finalName = buildFileName(fileName, 'csv', dateSuffix);
    const fileUri = `${FileSystem.documentDirectory}${finalName}`;
    await FileSystem.writeAsStringAsync(fileUri, csv, {
      encoding: FileSystem.EncodingType.UTF8,
    });
    const info = await FileSystem.getInfoAsync(fileUri);
    return {
      fileUri,
      fileName: finalName,
      sheetName,
      rows: data.length,
      columns: columns.length,
      bytesWritten:
        info.exists && 'size' in info ? (info as any).size : undefined,
      format: 'csv',
    };
  }

  const wsData: any[][] = [];
  wsData.push(columns); // header
  data.forEach((row) => {
    wsData.push(columns.map((c) => normalizeCellValue(row[c])));
  });

  const ws = xlsxLib.utils.aoa_to_sheet(wsData);
  const wb = xlsxLib.utils.book_new();
  xlsxLib.utils.book_append_sheet(wb, ws, sheetName);

  const wbout = xlsxLib.write(wb, {
    type: 'base64',
    bookType: 'xlsx',
  });

  const finalName = buildFileName(fileName, 'xlsx', dateSuffix);
  const fileUri = `${FileSystem.documentDirectory}${finalName}`;

  await FileSystem.writeAsStringAsync(fileUri, wbout, {
    encoding: FileSystem.EncodingType.Base64,
  });

  const info = await FileSystem.getInfoAsync(fileUri);

  return {
    fileUri,
    fileName: finalName,
    sheetName,
    rows: data.length,
    columns: columns.length,
    bytesWritten:
      info.exists && 'size' in info ? (info as any).size : undefined,
    format: 'xlsx',
  };
}
export async function generateExcelFromColumnsObject(
  columnsObject: Record<string, any[]>,
  options: ExcelExportOptions = {},
): Promise<ExportResult> {
  if (!columnsObject || typeof columnsObject !== 'object') {
    throw new Error('columnsObject inválido.');
  }
  const keys = Object.keys(columnsObject);
  if (!keys.length) {
    throw new Error('columnsObject sin columnas.');
  }
  const maxLen = keys.reduce(
    (m, k) =>
      Math.max(
        m,
        Array.isArray(columnsObject[k]) ? columnsObject[k].length : 0,
      ),
    0,
  );
  const rows: Record<string, any>[] = [];
  for (let i = 0; i < maxLen; i++) {
    const row: Record<string, any> = {};
    keys.forEach((k) => {
      const colArr = columnsObject[k];
      row[k] =
        Array.isArray(colArr) && i < (colArr as any[]).length
          ? (colArr as any[])[i]
          : '';
    });
    rows.push(row);
  }
  return generateExcelFromObjects(rows, {
    ...options,
    columnsOrder: options.columnsOrder ?? keys,
  });
}

export type ShareResult = {
  shared: boolean;
  activityType?: string;
  fileUri: string;
  fileName: string;
  format: 'xlsx' | 'csv';
};

export async function shareFile(result: ExportResult): Promise<ShareResult> {
  if (await Sharing.isAvailableAsync()) {
    await Sharing.shareAsync(result.fileUri, {
      UTI: 'org.openxmlformats.spreadsheetml.sheet',
      mimeType:
        result.format === 'xlsx'
          ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
          : 'text/csv',
      dialogTitle: `Compartir ${result.fileName}`,
    });
    return {
      shared: true,
      fileUri: result.fileUri,
      fileName: result.fileName,
      format: result.format,
    };
  }

  const res = await Share.share({
    url: result.fileUri,
    message: `Archivo: ${result.fileName}`,
    title: 'Compartir reporte',
  });

  return {
    shared: res.action === Share.sharedAction,
    activityType: (res as any).activityType ?? undefined,
    fileUri: result.fileUri,
    fileName: result.fileName,
    format: result.format,
  };
}

export async function exportAndShareExcel(
  data: Record<string, any>[],
  options?: ExcelExportOptions,
): Promise<{ export: ExportResult; share: ShareResult }> {
  const exportResult = await generateExcelFromObjects(data, options);
  const shareResult = await shareFile(exportResult);
  return { export: exportResult, share: shareResult };
}

export async function exportAndShareExcelFromColumns(
  columnsObject: Record<string, any[]>,
  options?: ExcelExportOptions,
): Promise<{ export: ExportResult; share: ShareResult }> {
  const exportResult = await generateExcelFromColumnsObject(
    columnsObject,
    options,
  );
  const shareResult = await shareFile(exportResult);
  return { export: exportResult, share: shareResult };
}
