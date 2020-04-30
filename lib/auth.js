const auth = require('basic-auth');
const bcrypt = require('bcrypt');

// bcryptライブラリを用いてパスワードをハッシュ化
const admins = {
  // 'lexsol': { password: bcrypt.hashSync('L123', 10) },
  // 'lexsol2': { password: bcrypt.hashSync('L987', 10) }
  'lexsol': {password: 'L123'},
  'lexsol2': {password: 'L987'},
  'admin': {password: 'lexadmin'} //管理者権限つきアカウント
};

module.exports = function (request, response, next) {
  const user = auth(request);
  if (!user || !admins[user.name] ||  admins[user.name].password !== user.pass) {
    response.set('WWW-Authenticate', 'Basic realm="example"');
    return response.status(401).send();
  }
  return next();
};