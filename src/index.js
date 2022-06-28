const express = require("express")
const bodyParser = require("body-parser")
const route =require("./routes/route")
const mongoose =require("mongoose")
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

mongoose.connect("mongodb+srv://santosh:Santosh24@cluster0.xy0vu.mongodb.net/group24Database?retryWrites=true&w=majority",{
    useNewUrlParser:true
})

.then( () => console.timeLog("MongoDb is Connected"))
.catch(err=>console.log(err))



app.use('/', route);
app.listen(process.env.PORT ||4000,function(){
    console.log('Server running on port'+(process.env.PORT ||4000))
});