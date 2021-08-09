const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const item_model = require("../models/items");
const item_list_model = require("../models/item_list");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
    async function insertItem(){
      try {
        var item_mytom = await item_list_model.findOne({name:"Mỳ tôm"});


        
        var item_gao = await item_list_model.findOne({name:"Gạo"});

        const test_item = {
            pices: [
                {
                    item: item_mytom.id,
                    quantity: 1
                },
                {
                    item: item_gao.id,
                    quantity: 3
                }
            ]
        }

        var x = await new item_model(test_item);
        await x.save();
        
      } catch (error) {
        console.log(error)
      }
    }


    await insertItem();
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
}

seedDB();