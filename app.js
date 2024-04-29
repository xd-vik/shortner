const express = require('express');
const app = express();
const path = require('path')
const Url = require('./models/link')
const shortid = require("shortid");

const mongoose = require('mongoose');

mongoose.connect("mongodb+srv://vikdev:djt3m66Xqc3ElA8m@shortner.tsdvhkk.mongodb.net/?retryWrites=true&w=majority&appName=shortner")
.then(() => console.log("Mongodb Connected"))
.catch((error) => console.log(error));

app.set("view engine" , "ejs");
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname,"public")));


app.get('/' , (req, res)=> {
    res.render("index",{shortUrl:null})
})

app.post('/long',  async (req, res) => {
    const longUrl = req.body.longlink;
    const shortCode = shortid.generate();
    const shortUrl = shortCode;
  
  
    const newUrl = new Url({ shortUrl, longUrl });
    await newUrl.save();
  
    console.log("url short successfully..",newUrl)
  
    res.render("index", { shortUrl });
  });

app.get("/:shortCode", async (req,res)=>{

    const shortCode = req.params.shortCode;
    const urlRecord = await Url.findOne({shortUrl: shortCode });

    if(urlRecord){
        res.redirect(urlRecord.longUrl)
    }else{
        res.status(404).send("URL not found")
    }

});

app.listen(3000);

