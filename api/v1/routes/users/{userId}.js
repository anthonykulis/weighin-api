module.exports = function(
  getUserById, 
  updateUser
) {
  async function get(req, res, next){
    const data = await getUserById(req.params.userId)
    res.send(data)
  }

  async function put(req, res, next){
    const data = await updateUser(req.params.userId, req.body)
    res.send(data)
  }

 

  return { get, put }
}