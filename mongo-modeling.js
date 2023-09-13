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

db.getCollection('directors').deleteMany({})
db.getCollection('series').deleteMany({})
db.getCollection('tournaments').deleteMany({})
db.getCollection('captains').deleteMany({})
db.getCollection('anglers').deleteMany({})

const res = db.getCollection('directors').insertMany([
    { 'name': 'anthony', 'phone': '618.923.0696', 'date': new Date() },
    { 'name': 'alex', 'phone': '619.222.4433', 'date': new Date() },
    { 'name': 'dena', 'phone': '817.343.1346', 'date': new Date() },
])


const anthony = db.getCollection('directors').findOne({name: 'anthony'})

const series = db.getCollection('series').insertOne({
    name: 'southern illinois cats',
    director: anthony,
    seasons: []
})

const sic = db.getCollection('series').findOne({_id: series.insertedId})


const t = db.getCollection('tournaments').insertOne({
    name: '8th street ramp',
    date: new Date("1/1/2024"),
    weights: []
})
const tournament = db.getCollection('tournaments').findOne({_id: t.insertedId})
const eventsIn2024 = [tournament]

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

const anglerOne = db.getCollection('anglers').insertOne({
    name: 'alex',
    phone: '123.132.1324',
})

const anglerTwo = db.getCollection('anglers').insertOne({
    name: 'liz',
    phone: '123.132.1324',
})

const alex = db.getCollection('anglers').findOne({_id: anglerOne.insertedId})
const liz = db.getCollection('anglers').findOne({_id: anglerTwo.insertedId})

db.getCollection('tournaments').updateOne(
    { _id: tournament._id },
    {
        $set: {
            boats: [{
                captain: alex,
                anglers: [alex, liz],
            }]
        }
    }
)

console.log(JSON.stringify(tournament, null, 2))


// const boat = tournament.boats.find(c => c._id.$oid === anglerOne._id)
// const boatIndex = tournament.boats.findIndex(c => c._id.$oid === anglerOne._id)

// const w = db.getCollection('weights').insertOne({
//     bag: [1,2,3],
//     bigFish: 3,
//     total: 1+2+3,
//     tournament,
//     anglers: [alex, liz]
// })

// const weight = db.getCollection('weights').findOne({
//     _id: w.insertedId
// })

// const nextBoat = {
//     ...boat,
//     results: weight
// }

// const nextBoats = [...tournament.boats.slice(0, boatIndex), nextBoat, ...tournament.boats.slice(boatIndex + 1)]

// db.getCollection('tournaments').updateOne(
//     tournament,
//     {
//         $set: {
//             boats: nextBoats
//         }
//     }
// )

// db.getCollection('tournaments').find()

// db.getCollection('series').find({
//     director: {
//         name: 'anthony'
//     },
//     seasons: {
//         season: 2024
//     }
// })
// db.getCollection('series').insert

// // Run a find command to view items sold on April 4th, 2014.
// const salesOnApril4th = db.getCollection('sales').find({
//   date: { $gte: new Date('2014-04-04'), $lt: new Date('2014-04-05') }
// }).count();

// // Print a message to the output window.
// console.log(`${salesOnApril4th} sales occurred in 2014.`);

// // Here we run an aggregation and open a cursor to the results.
// // Use '.toArray()' to exhaust the cursor to return the whole result set.
// // You can use '.hasNext()/.next()' to iterate through the cursor page by page.
// db.getCollection('sales').aggregate([
//   // Find all of the sales that occurred in 2014.
//   { $match: { date: { $gte: new Date('2014-01-01'), $lt: new Date('2015-01-01') } } },
//   // Group the total sales for each product.
//   { $group: { _id: '$item', totalSaleAmount: { $sum: { $multiply: [ '$price', '$quantity' ] } } } }
// ]);
