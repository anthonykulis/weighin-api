module.exports = function(
    getUsers, 
    insertUsers
) {
    async function get(req, res, next){
        const data = await getUsers()
        res.send(data)
    }

    async function post(req, res, next){
        try {
            const data = await insertUsers(req.body)
            res.send(data)
        } catch (e) {
            res.status(400).send(e)
        }
    }

    return { get, post }
}