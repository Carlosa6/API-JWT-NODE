import mongoose from 'mongoose'

mongoose.connect('mongodb+srv://root:rPCMVTjEpvHEap09@dicweb.ihkbp.mongodb.net/api-jwt-node?retryWrites=true&w=majority', {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: true,
        useCreateIndex: true
    })
    .then(() => console.log('Database is connected'))
    .catch(err => console.log('error', err))