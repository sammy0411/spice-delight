
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();

const mongoURI = `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@ac-pph7ctm-shard-00-00.oou9icp.mongodb.net:27017,ac-pph7ctm-shard-00-01.oou9icp.mongodb.net:27017,ac-pph7ctm-shard-00-02.oou9icp.mongodb.net:27017/mern1?ssl=true&replicaSet=atlas-eb8lwm-shard-0&authSource=admin&retryWrites=true&w=majority`

const mongoDB = async () => {
    try{
        await mongoose.connect(mongoURI, { useNewUrlParser: true });
        console.log("MongoDB connected");
        const fetched_data = await mongoose.connection.db.collection("food_items");
        try {
            const data = await fetched_data.find({}).toArray();
            const foodCategory = await mongoose.connection.db.collection("food_category");
            const catData = await foodCategory.find({}).toArray();
          
            global.food_items = data;
            global.food_category = catData;
          } catch (err) {
            console.log(err);
          }
           
    }
    catch(error){
        console.log('err: ',error);
    }
}

module.exports = mongoDB;
