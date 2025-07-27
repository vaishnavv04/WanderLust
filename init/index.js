const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing.js")

const MONGO_URI = "mongodb://localhost:27017/wanderlust";

main()
    .then(()=>{
        console.log("Connected to DB");
    })
    .catch((err)=>{
        console.log(err);
    });

async function main(){
    await mongoose.connect(MONGO_URI)
}

const initDB = async()=>{
    await Listing.deleteMany({});
    await Listing.insertMany(initdata.data);
    console.log("data is initialized");
}

initDB();