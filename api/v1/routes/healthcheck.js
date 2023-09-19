module.exports = function() {
    function get(req, res, next){
        res.send(200)
    }

    return { get }
}