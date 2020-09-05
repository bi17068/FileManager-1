'use strict';
const loader = require('./sequelize-loader');
const Sequelize = loader.Sequelize;

const BugContent = loader.database.define('BugContent', {
  fileId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  bugId: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  title: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  bugContent: {
    type: Sequelize.TEXT,
    allowNull: false
  },
  writer: {
    type: Sequelize.STRING,
    allowNull: false
  },
  writeDate: {
    type: Sequelize.DATEONLY,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps: false
  });

module.exports = BugContent;