const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const Location = require("../models/locations");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedLocations(loc) {
    try {
      const location = await new Location({ 
        location:loc.location,
        name:loc.name,
        latitude:loc.latitude,
        longitude:loc.longitude
      });
      await location.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async function closeDB() {
    console.log("CLOSING CONNECTION");
    await mongoose.disconnect();
  }

  for (let i = 0; i < locations.length; i++) {
    await seedLocations(locations[i]);
  }
  
  await closeDB();
}


let locations = [
  {
    location:'hanoi',
    name:'Hà Nội',
    latitude:21.0245,
    longitude:105.84117
  },
  {
    location:"hochiminh",
    name:"TP Hồ Chí Minh",
    latitude:10.8231,
    longitude:106.6297
  }
];
seedDB();
