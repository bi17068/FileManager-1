const File = require('../models/file');
const BugContent = require('../models/bugContent');
const Details = require('../models/details');
const Account = require('../models/account');

function Get(req, res) {
  File.findOne({
    where: {
      fileId: req.query.pname
    }
  }).then((file) => {
    Account.findOne({
      where: {
        accountId: file.status
      }
    }).then((account) => {
      BugContent.findAll({
        include: [{
            model: Details,
          }],
        where: {fileId: file.fileId},
        order:[['bugId', 'ASC']]
      }).then((data) => {
        if(data){
          res.render('chart', {
            accountName: account.accountName,
            xlsk: data,
            fileName: file.fileName
          });
        }else{
          res.render('chart', {
            accountName: account.accountName,
            fileName: file.fileName
          });
        }
      });
    });
  });
}

function sortEnterDate(req, res) {
  /* Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['enterDate', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortEnterPerson(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['enterPerson', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortTitle(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['title', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortContent(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['content', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortPGM_ID(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['pgmId', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortTask(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['task', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortTaskPerson(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['taskPerson', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortProgress(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['progress', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortImportance(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['importance', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortTaskDate(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['taskDate', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortCompDate(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['compDate', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortManHour(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['manHour', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}

function sortTaskType(req, res) {
  /*Post.findAll({
    where: {
      project: req.query.pname
    },
    order: [['project', 'ASC'],['taskType', 'ASC']]
  }).then((posts) => {
    res.render('chart', {
      xlsk: posts
    });
  });*/
}


module.exports = {
  Get, 
  sortEnterDate,
  sortEnterPerson,
  sortTitle,
  sortContent,
  sortPGM_ID,
  sortTask, 
  sortTaskPerson, 
  sortProgress, 
  sortImportance, 
  sortTaskDate, 
  sortCompDate, 
  sortManHour, 
  sortTaskType
}
