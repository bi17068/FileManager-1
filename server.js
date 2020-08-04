'use strict'
const createError = require('http-errors');
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const all = require('require-all');
const bodyParser = require('body-parser');
const lib = all(__dirname + '/lib'); // libディレクトリ直下のファイルを一括読み込み
const routes = all(__dirname + '/routes');

// モデルの読み込み
const File = require('./models/file');
const BugContent = require('./models/bugContent');
const Details = require('./models/details');
const Account = require('./models/account');
File.sync().then(() => {
  File.hasMany(BugContent, {
    foreignKey: 'fileId',
    sourceKey: 'fileId'
  });
  File.hasMany(Details, {
    foreignKey: 'fileId',
    sourceKey: 'fileId'
  });
  BugContent.sync().then(() => {
    BugContent.hasMany(Details, {
      foreignKey: 'bugId',
      sourceKey: 'bugId'
    });
    Details.sync();
  });
  Account.belongsTo(File, {foreignKey: 'accountId'});
  Account.sync();
});


const app = express();
app.use(helmet());
app.use(bodyParser.urlencoded({extended: true}));
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//app.useは引数の関数を追加する。
//express.staticは引数のパスのファイルを静的なファイルとして利用できるようにする。フォルダのパスを書いたらその下のファイル全部使える。
app.use(express.static('public'));
const port = process.env.PORT || 8000;


// ルーティングハンドラ
app.get('/', routes.login);
app.use(lib.auth); // BASIC認証
app.get('/index', routes.index);
app.get('/upload', routes.sheetJS.Get);
app.post('/upload', routes.sheetJS.Post);
app.get('/chart', routes.chart.Get);
app.get('/projectList', routes.projectList);
app.get('/edit', routes.edit.Get);
app.post('/edit', routes.edit.Post);
app.get('/delete', routes.delete.Delete);
app.get('/approveList', routes.approveList.Get);
app.get('/approve', routes.approve.Get);
app.post('/approve', routes.approve.Post);
app.get('/logout', routes.logout);
app.get('/favicon.ico', routes.favicon);
// ソート処理のルーティング
app.get('/chart/sortEnterDate', routes.chart.sortEnterDate);
app.get('/chart/sortEnterPerson', routes.chart.sortEnterPerson);
app.get('/chart/sortTitle', routes.chart.sortTitle);
app.get('/chart/sortContent', routes.chart.sortContent);
app.get('/chart/sortPGM_ID', routes.chart.sortPGM_ID);
app.get('/chart/sortTask', routes.chart.sortTask);
app.get('/chart/sortTaskPerson', routes.chart.sortTaskPerson);
app.get('/chart/sortProgress', routes.chart.sortProgress);
app.get('/chart/sortImportance', routes.chart.sortImportance);
app.get('/chart/sortTaskDate', routes.chart.sortTaskDate);
app.get('/chart/sortCompDate', routes.chart.sortCompDate);
app.get('/chart/sortManHour', routes.chart.sortManHour);
app.get('/chart/sortTaskType', routes.chart.sortTaskType);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(port, function(){
  console.log(`listening on port ${port}!`);
  // mklog.log('[' + new Date() + '] ' + `listening on port ${port}!`);
});	