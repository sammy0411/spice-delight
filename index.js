const express = require('express')
const path = require('path')
const app = express();
const port = process.env.port || 5000;

const mongoDB = require('./db')
mongoDB();

app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "/")
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})

app.use(express.json()); // important

app.use('/api', require("./Routes/CreateUser")); //isse mera address ho jaega localhost:5000/api/createuser
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));



app.use(express.static(path.join(__dirname,"./frontend/build")));

app.get('*',function(_,res){
    res.sendFile(path.join(__dirname,"./frontend/build/index.html"),function(err){
        res.status(500).send(err);
    })
})



app.get("/", (req, res) => {
    res.send("HELLO")
})


app.listen(port, () => {
    console.log(`server started at port ${port}`)
})