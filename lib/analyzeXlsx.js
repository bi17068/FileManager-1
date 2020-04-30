'use strict';

function analyzeXlsx() { 
  let xlsk = require('xlsx');
  let workbook = xlsk.readFile('./uploads/案件一覧.xlsx');

  let sheetNameList = workbook.SheetNames;                      // シート名一覧オブジェクト
  let workSheet = workbook.Sheets[sheetNameList[0]];            // 1番目のシートのデータを取得
  let colNames = [workSheet['H4'].w,
                  workSheet['I4'].w,
                  workSheet['J4'].w,
                  workSheet['K4'].w,
                  workSheet['L4'].v,
                  workSheet['M4'].v,
                  workSheet['N4'].w,
                  workSheet['O4'].w,
                  workSheet['P4'].w];
  // カラムの名称配列(対応、対応者、進捗など)
  let endCol = workSheet['!ref'].match(/\:[A-Z+]([0-9]+)/)[1];  // エクセルデータの末端の行数を取得する
  workSheet['!ref'] = `H4:P${endCol}`;                          // 取得したいセルの範囲を指定し直す。下記の例ではH4からK列の末端行まで
  let workSheet_json = xlsk.utils.sheet_to_json(workSheet);     // JSONオブジェクトとして取得
  /* workSheet_json = [{'対応': 'テスト1対応',
                        '対応者': '市原',
                        '進捗': '未着手',

  }]
  */

  return {sheet: workSheet_json, names: colNames, end: endCol};
}



 module.exports = {
   analyzeXlsx
 };