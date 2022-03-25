const express = require("express");
const app = express();
const {crawl} = require("./crawl")



async function AllProducts(req,res){
    return  res.status(200).json(await crawl())
}

-
app.get("/", AllProducts)




module.exports = app