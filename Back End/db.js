// const mongoose = require('mongoose');
// const mongoURI = "mongodb+srv://aryan:erectus123@cluster0.vsotkpy.mongodb.net/GoFoods?retryWrites=true&w=majority";

// const mongoDB = async () => {
//   try {

//     await mongoose.connect(mongoURI,console.log("Connected to mongo Successful"),{
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,});


//     const fetched_data =await mongoose.connection.db.collection("food_items");
    
//     fetched_data.find({}).toArray(async function (data, err) {
//       const foodCategory =await mongoose.connection.db.collection("food_catagory");
//       foodCategory.find({}).toArray(function (foodData, err)
//       {

//           if (err) {
//             console.log(err)
//         } 
//         else {
//                 global.food_items = data;
//                 global.food_catagory = foodData;
//                 console.log(global.food_catagory);
//                 // console.log(global.food_items);
//           }
//         })
//     })
//   } catch (error) {
//         console.log("error");
//       }
//     };

      


// module.exports = mongoDB;








const mongoose = require('mongoose');
const mongoURI = "mongodb+srv://aryan:erectus123@cluster0.vsotkpy.mongodb.net/GoFoods?retryWrites=true&w=majority";

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log("Connected to MongoDB Successful");

    const foodItemsCollection = mongoose.connection.db.collection("food_items");
    const foodCatagoryCollection = mongoose.connection.db.collection("food_catagory");

    const itemsData = await foodItemsCollection.find({}).toArray();
    const catagoryData = await foodCatagoryCollection.find({}).toArray();

    global.food_items = itemsData;
    global.food_catagory = catagoryData;

    // console.log(global.food_items);
    // console.log(global.food_catagory);
  } catch (error) {
    console.log(error);
  }
};

module.exports = mongoDB;
