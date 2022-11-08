const express = require('express');
const { default: mongoose } = require('mongoose');
const mongose = require('mongoose')
const app = express();
const ShortUrl = require('./models/shortUrl')

mongoose.connect('mongodb+srv://nipunjain:nipun123@cluster0.51qfxei.mongodb.net/urlShortener');

app.set('view engine', 'ejs')
app.use(express.urlencoded({extended : false}))

app.get("/", async (req,res)=>{
    const shortUrls = await ShortUrl.find();
    res.render('index', {shortUrl : shortUrls});
})
app.post("/shortUrls", (req, res)=>{
    ShortUrl.create({full : req.body.fullUrl})
    res.redirect("/")
})
app.get("/:shortUrl", async (req, res)=>{
    const shortUrl = await ShortUrl.findOne({short : req.params.shortUrl})
    if(shortUrl==null) return res.sendStatus(404)

    shortUrl.clicks++;
    shortUrl.save()

    res.redirect(shortUrl.full);
})
app.listen(process.env.PORT || 3000, (req, res)=>{
    console.log('server started at port 3000');
})