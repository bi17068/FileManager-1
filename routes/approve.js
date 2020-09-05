const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');
const mklog = require('../lib/mklog');

// GETリクエスト
function Get(req, res) {
  File.findOne({
    where: {
      fileId: req.query.id
    }
  }).then((file) => {
    BugContent.findAll({
      include: [{
          model: Details,
        }],
      where: {fileId: file.fileId},
      order:[['bugId', 'ASC']]

    }).then((data) => {
      Account.findAll({
        order: [['accountId', 'ASC']]
      }).then((accounts) =>{
        res.render('approve', {
          xlsk: data,
          accounts: accounts,
          fileName: file.fileName
        });
      });
    });

  });
}

// POSTリクエスト
function Post(req, res) {
  if(typeof req.body.notApprove === 'undefined'){
    File.findOne({
      where: { fileId: req.body.fileId }

    }).then((file) => {
      BugContent.findAll({
        include: [{
            model: Details,
          }],
        where: {fileId: file.fileId},
        order:[['bugId', 'ASC']]

      }).then((data) => {
        Account.findAll({
          order: [['accountId', 'ASC']]

        }).then((accounts) =>{
          var flag = false;
          var num = Number(req.body.accountId);
          for(row in accounts){
            if(accounts[row].accountId === num){
              flag = true;
            }
          }

          if(flag){
            file.update({
              status: req.body.accountId
            });    
            res.render('approve', {
              xlsk: data,
              accounts: accounts,
              fileName: file.fileName,
              updateMsg: "承認完了"
            });
          }else{
            res.render('approve', {
              xlsk: data,
              accounts: accounts,
              fileName: file.fileName,
              updateMsg: "依頼先が存在しません"
            });
          }

        });
      });
    });

  }else{
    File.findOne({
      where: { fileId: req.body.fileId }

    }).then((file) => {
      BugContent.findAll({
        include: [{
            model: Details,
          }],
        where: {fileId: file.fileId},
        order:[['bugId', 'ASC']]

      }).then((data) => {
        Account.findAll({
          order: [['accountId', 'ASC']]

        }).then((accounts) =>{
          file.update({
            status: file.firstStatus,
            comment: req.body.comment
          });    
          res.render('approve', {
            xlsk: data,
            accounts: accounts,
            fileName: file.fileName,
            notApproveMsg: "非承認完了"
          });

        });
      });
    });
  }
}

module.exports = {
  Get, Post
}
