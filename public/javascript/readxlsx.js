var X = XLSX;

// ファイル選択時のメイン処理
function handleFile(e) {

  var files = e.target.files;
  var f = files[0];

  var reader = new FileReader();
  reader.onload = function (e) {
    var data = e.target.result;
    var wb;
    var arr = fixdata(data);
    wb = X.read(btoa(arr), {
      type: 'base64',
      cellDates: true,
    });

    var output = "";
    output = to_json(wb);// JSONが返ってくる
    console.log(output);

    $("pre#result").html(JSON.stringify(output, null, 2));
    // $("#xlsx").val(output);
    
  };

  reader.readAsArrayBuffer(f);
}

// ファイルの読み込み
function fixdata(data) {
  var o = "",
    l = 0,
    w = 10240;
  for (; l < data.byteLength / w; ++l) o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w,
    l * w + w)));
  o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
  return o;
}

// ワークブックのデータをjsonに変換
function to_json(workbook) {
  // var result = {};
  let sheetNameList = workbook.SheetNames;                      // シート名一覧オブジェクト
  let workSheet = workbook.Sheets[sheetNameList[0]];
  let colNames = [workSheet['H4'].w,
  workSheet['I4'].w,
  workSheet['J4'].w,
  workSheet['K4'].w,
  workSheet['L4'].v,
  workSheet['M4'].v,
  workSheet['N4'].w,
  workSheet['O4'].w,
  workSheet['P4'].w];

  let endCol = workSheet['!ref'].match(/\:[A-Z+]([0-9]+)/)[1];  // エクセルデータの末端の行数を取得する
  workSheet['!ref'] = `H4:P${endCol}`;                          // 取得したいセルの範囲を指定し直す。H4からP列の末端行まで

  let workSheet_json = X.utils.sheet_to_json(workSheet);     // JSONオブジェクトとして取得
  
  /* workSheet_json = [{'対応': 'テスト1対応',
                        '対応者': '市原',
                        '進捗': '未着手',

  }]
  */

  // var roa = X.utils.sheet_to_json(
  //   workSheet,
  //   {
  //     raw: true,
  //   });
  // if (roa.length > 0) {
  //   result[sheetNameList[0]] = roa;
  // }



  // DBへの登録
  // for (var i = 0; i < workSheet_json.length; i++) {
  //   Post.create({
  //     project: originalName[0],
  //     task: workSheet_json[i][colNames[0]],
  //     person: workSheet_json[i][colNames[1]],
  //     progress: workSheet_json[i][colNames[2]],
  //     importance: workSheet_json[i][colNames[3]],
  //     taskDate: workSheet_json[i][colNames[4]],
  //     compDate: workSheet_json[i][colNames[5]],
  //     manHour: workSheet_json[i][colNames[6]],
  //     taskType: workSheet_json[i][colNames[7]],
  //     note: workSheet_json[i][colNames[8]],
  //     flag: 0
  //   });
  // }

  return workSheet_json;
}

// 画面初期化
$(document).ready(function () {
  console.log('done3');
  // ファイル選択欄 選択イベント
  // http://cccabinet.jpn.org/bootstrap4/javascript/forms/file-browser
  $('.custom-file-input').on('change', function (e) {
    console.log('done2');
    handleFile(e);
    $(this).next('.custom-file-label').html($(this)[0].files[0].name);
  })
});