const dotenv = require('dotenv');

const mongoose = require('mongoose');

const app = require('./app');

dotenv.config({path: './config.env'})

// app.all('*', (req, res) =>{
//     res.send('hello frrom server');
// })

const DB = process.env.DATABASE.replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD);

mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true
}).then(con => {
    //console.log(con.connections);
    console.log("db connection successful");
});

const server = app.listen(3000, () =>{
    console.log('Server listening at port 3000');
})