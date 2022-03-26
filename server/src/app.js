const express = require("express");
const cors = require("cors");

const app = express();

const {crawl} = require("./crawl")


app.use(cors({
    origin:'*'
})); // to allow all cross origin request from any site 




async function AllProducts(req,res){
    return  res.status(200).json(await crawl())
}

app.get("/", AllProducts)




module.exports = app