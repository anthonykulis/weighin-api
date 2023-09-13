const { MongoClient, ServerApiVersion } = require('mongodb')

const connectionString = process.env.MONGO_URL
const client = new MongoClient(connectionString, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
      }
})

let conn, db;

(async function(){
    try {
        conn = await client.connect();
        db = client.db()
        
    } catch(e) {
        console.error(e);
    }
}())


const getConnection = () => client.db()


module.exports = getConnection
