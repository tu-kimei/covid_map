const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const item_model = require("../models/items");
const helper_model = require("../models/helper");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedHelper() {
    try {
      var today = new Date();
      var itemsData = await item_model.findOne();
      const helper = await new helper_model({
        typeOf: 'helper',
        name: 'Nguyen Ngoc Tu',
        phone: '0372454262',
        address: 'Celadon City',
        latitude: 10.8033,
        longitude: 106.6159,
        items: itemsData.id,
        availableTo: today.setDate(today.getDate() + 5)
      });
      await helper.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }
  await seedHelper();
  
  await closeDB();
}


seedDB();
