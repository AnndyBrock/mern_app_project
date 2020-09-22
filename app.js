const express = require('express');
const config  = require('config');
const mongoose = require('mongoose');

const app =  express();

app.use(express.json({extended:true}));

app.use('/api/auth', require('./routes/auth.routes'));
app.use('/api/link', require('./routes/link.routes'));
app.use('/t', require('./routes/rediret.routes'));

const PORT = config.get('port') || 5000;

async function start(){
    try {
       await mongoose.connect(config.get('mongo_url'),{
            useNewUrlParser:true,
           useUnifiedTopology: true,
           useCreateIndex:true
       });
        app.listen(PORT, ()=>console.log(`App is run...port ${PORT}`));
    }catch (e) {
        console.error(e);
        process.exit(1)
    }
}
start();


