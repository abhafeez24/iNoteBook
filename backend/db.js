const mongoose = require('mongoose')
const mongoURI = 'mongodb+srv://taskapp:TaskAppApi@cluster0.pj4eq8e.mongodb.net/'

const connectMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to Mongo Successfully!!')

    })
}

module.exports = connectMongo