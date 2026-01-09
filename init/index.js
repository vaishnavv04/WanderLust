const mongoose = require("mongoose");
const initdata = require("./data.js");
const Listing = require("../models/listing");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";

main().then(()=>{
    console.log("Connected to DB");
})
.catch((err)=>{
    console.log(err);
})

async function main() {
    await mongoose.connect(Mongo_URL);
}

const initDB = async () => {
    await Listing.deleteMany({});

    initdata.data = initdata.data.map((obj) => ({...obj, owner:"669a91c9ea5a97a670c30da3"}));

    await Listing.insertMany(initdata.data);

    console.log("data was initialized");
}

initDB();