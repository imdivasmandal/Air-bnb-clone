import mongoose from "mongoose";
import { data } from "./data.js";
import { Listing } from "../models/listing.model.js";

main().then(() => {
    console.log("connected to DB");
}).catch((err) => {
    console.log(err);
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/airbnb");
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(data);
    console.log("data inatilized successful");
}
initDB();