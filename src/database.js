import mongoose from 'mongoose'
import config from './config'

mongoose.connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('error', err))