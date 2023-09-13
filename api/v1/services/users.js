const { users } = require('../../../db/collections')
const getConnection = require('../../../db')
const { ObjectId } = require('bson')

const getUsers = async () => {
  const users = getConnection().collection('users')
  return users.find().toArray()
}

const insertUsers = async (payload) => {
  const collection = users()
  const insert = await collection.insertOne(payload)
  return await collection.findOne({_id: insert.insertedId})
}

const getUserById = async (_id) => {
  return await users().findOne({_id: new ObjectId(_id)})
}

const updateUser = async (id, update) => {
  await users().updateOne({
    _id: new ObjectId(id)
  }, { $set: update })
  return getUserById(id)
}

module.exports = {
  getUsers,
  getUserById,
  insertUsers,
  updateUser
}