const Account = require('../models/account');


function Get(req, res) {
  res.render('registAccount');
}

function Post(req, res) {
  var flag = req.body.slackId && req.body.name && req.body.passWord;
  if(flag){
    Account.create({
      slackId: req.body.slackId,
      accountName: req.body.name,
      password: req.body.passWord
    }).then(() => {
      res.render('registAccount', {
        updateMsg: "登録完了"
      });
    });
  }else{
    res.render('registAccount', {
      updateMsg: "すべて記入してください"
    });
  }
}


module.exports = {
  Get, Post
}