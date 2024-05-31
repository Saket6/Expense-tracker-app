import mongoose from "mongoose";

export default async function connect()
{
    try{
        await mongoose.connect(process.env.mongo_url);
        console.log("Connected to MongoDB");
    }
    catch(er){console.log(er);}
  
}