/* global use, db */
// MongoDB Playground
// To disable this template go to Settings | MongoDB | Use Default Template For Playground.
// Make sure you are connected to enable completions and to be able to run a playground.
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.
// The result of the last command run in a playground is shown on the results panel.
// By default the first 20 documents will be returned with a cursor.
// Use 'console.log()' to print to the debug output.
// For more documentation on playgrounds please refer to
// https://www.mongodb.com/docs/mongodb-vscode/playgrounds/

// Select the database to use.
use('mongodbVSCodePlaygroundDB');

db.getCollection('series').deleteMany({})
db.getCollection('tournaments').deleteMany({})
db.getCollection('captains').deleteMany({})
db.getCollection('anglers').deleteMany({})
db.getCollection('users').deleteMany({})
db.getCollection('bags').deleteMany({})
db.getCollection('fish').deleteMany({})

const res = db.getCollection('users').insertMany([
    { sso_id: 1, 'username': 'ak', 'name': 'anthony', 'phone': '618.923.0696', 'date': new Date() },
    { sso_id: 2, username: 'an', 'name': 'alex', 'phone': '619.222.4433', 'date': new Date() },
    { sso_id: 3, username: 'dk', 'name': 'dena', 'phone': '817.343.1346', 'date': new Date() },
    {
        sso_id: 4, 
        username: 'ln',
        name: 'liz',
        phone: '123.132.1324',
        date: new Date()
    }
])


const anthony = db.getCollection('users').findOne({username: 'ak', name: 'anthony'})

const series = db.getCollection('series').insertOne({
    name: 'southern illinois cats',
    director: anthony,
    seasons: []
})

const sic = db.getCollection('series').findOne({_id: series.insertedId})


const t = db.getCollection('tournaments').insertOne({
    name: '8th street ramp',
    date: new Date("1/1/2024"),
    weights: [],
    registrationClosed: false,
    weighInClosed: false
})
let tournament = db.getCollection('tournaments').findOne({_id: t.insertedId})
const eventsIn2024 = [tournament._id]

db.getCollection('series').updateOne({
    _id: sic._id
}, { 
    $set: {
        seasons: {
            ...sic.seasons, 
            2024: eventsIn2024
        }
    }
})


const alex = db.getCollection('users').findOne({name: 'alex'})
const liz = db.getCollection('users').findOne({name: 'liz'})

db.getCollection('tournaments').updateOne(
    tournament,
    {
        $set: {
            boats: [{
                captain: alex,
                anglers: [alex, liz],
            }]
        }
    }
)

tournament = db.getCollection('tournaments').findOne({_id: tournament._id})

const fish = db.getCollection('fish')
const f1 = fish.insertMany([{
    species: 'flathead',
    weight: 12.2,
    date: new Date()
},{
    species: 'bluecat',
    weight: 32.2,
    date: new Date()
},{
    species: 'bluecat',
    weight: 22.5,
    date: new Date()
}])


const b = db.getCollection('bags').insertOne({
    anglers: [alex, liz],
    itemized: [fish.findOne(f1.insertedIds[0]), fish.findOne(f1.insertedIds[1], fish.findOne(f1.insertedIds[2]))],
    total: 12.2 + 32.2 + 22.5,
    bigFish: fish.findOne(f1.insertedIds[1]),
    tournament_id: tournament._id,
    series_id: sic._id,
    date: new Date()
})

const bag = db.getCollection('bags').findOne(b.insertedId)


db.getCollection('users').updateMany({
    $or: [alex, liz]
}, {
    $push: {
        bags: { _id: bag._id, tournament: tournament.name, series: sic.name, series_id: sic._id, tournament_id: tournament._id,  itemized: bag.itemized, date: bag.date }
    }
})

db.getCollection('tournaments').updateOne(
    tournament,
    {
        $push: {
            weights: bag
        }
    }
)


fish.aggregate([{
    $match: { 
        $or: [{ species: 'bluecat'}, {species: 'flathead'}] 
    }
},{
    $group: {
        _id: "$species",
        avgWeight: { $avg: "$weight"}
    }
}])

// db.getCollection('series').find()
// db.getCollection('tournaments').find()
// db.getCollection('users').find()
// db.getCollection('bags').find()
db.getCollection('fish').find()

