const mongoose = require("mongoose");
const assert = require('assert');

const db = async () => {
  try {
    const uri = process.env.MONGO_URI || "mongodb://localhost:27017/covid_map";
    await mongoose
      .connect(uri, {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
      })
      .catch((error) => console.log(error));
    const connection = mongoose.connection;
    console.log("MONGODB CONNECTED SUCCESSFULLY!");
  } catch (error) {
    console.log(error);
    return error;
  }
};


db();
test();

async function test(){
  const session = await mongoose.startSession();
  const User = mongoose.model('User', new mongoose.Schema({ name: String }));

  await session.withTransaction(async () => {
    await User.create({ name: 'foo' });

    const user = await User.findOne({ name: 'foo' }).session(session);
    // Getter/setter for the session associated with this document.
    // console.log(user.$session());
    console.log('-------');
    console.log(assert.ok(user.$session()));
    user.name = 'bar';
    // By default, `save()` uses the associated session
    await user.save();

    // Won't find the doc because `save()` is part of an uncommitted transaction
    const doc = await User.findOne({ name: 'bar' });
    assert.ok(!doc);
  });

  session.endSession();

  const doc = await User.findOne({ name: 'bar' });
  assert.ok(doc);
}
