const getConnection = require('./')


module.exports = {
  users: () => getConnection().collection('users')
}