const path = require("path");
require("dotenv").config({ path: path.join(__dirname, "../.env") });
const item_list_model = require("../models/item_list");
const mongoose = require("mongoose");
const connectDB = require("./../config/db");
connectDB();

async function seedDB() {
  async function seedItemList(item) {
    try {
      const items = await new item_list_model({ 
        name: item.name,
        unit: item.unit,
        type: item.type
      });
      await items.save();
    } catch (error) {
      console.log(error);
      return error;
    }
  }


  for (let i = 0; i < item_list.length; i++) {
    await seedItemList(item_list[i]);
  }
  
  console.log("CLOSING CONNECTION");
  await mongoose.disconnect();
}


let item_list = [
  {
    name: 'Phần cơm',
    unit: 'Phần',
    type: 'daily'
  },
  {
    name: 'Trứng gà',
    unit: 'Quả',
    type: 'daily'
  },
  {
    name: 'Rau củ',
    unit: 'KG',
    type: 'daily'
  },
  {
    name: 'Thịt',
    unit: 'KG',
    type: 'daily'
  },
  {
    name: 'Gạo',
    unit: 'KG',
    type: 'daily'
  },
  {
    name: 'Mỳ tôm',
    unit: 'Gói',
    type: 'daily'
  },
  {
    name: 'Nước uống',
    unit: 'Lít',
    type: 'daily'
  },
  {
    name: 'Găng tay',
    unit: 'Cái',
    type: 'medical'
  },
  {
    name: 'Khẩu trang',
    unit: 'Cái',
    type: 'medical'
  },
  {
    name: 'Quần áo bảo hộ',
    unit: 'Cái',
    type: 'medical'
  },
  {
    name: 'Nước sát khuẩn',
    unit: 'Chai',
    type: 'medical'
  },
  
];
seedDB();
