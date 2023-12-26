const express = require('express')
const app = express()
const port = 5000
const mongoDB = require("./db")
const mongoose = require('mongoose');
mongoDB();

app.use((req,res,next)=>{
    res.setHeader("Access-Control-Allow-Origin","http://localhost:3000");
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    next();
})

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use(express.json())
app.use('/api', require("./Routes/CreateUser"));
app.use('/api', require("./Routes/DisplayData"));
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// const mongoURI = "mongodb+srv://aryan:erectus123@cluster0.vsotkpy.mongodb.net/?retryWrites=true&w=majority"


// async function check() {
//   try {
//       const client = await mongoose.connect(mongoURI,console.log("Connected to mongo Successful"), { useNewUrlParser: true })

//       // const fetch_data=await mongoose.connection.db.collection("users");
//       // console.log(fetch_data)
//       // fetch_data.find({}).toArray(function(err,data){ 
//       //    if (err) {
//       //   console.log("err");
//       // } else {
//       //   console.log(data);
//       //   console.log(fetch_data);
//       // }});
//       const fetch_data = mongoose.connection.db.collection("food_items");
//         fetch_data.find().forEach(function(err, result) {
//             if(err) console.log(err);
//             else console.log(data);
//         })
      
//   } catch(err) {
//       if(err == "MongoNetworkError") {
//           console.log("no connection")
//       }

//       console.log(err)
//       // Send email
//   }
// }

// check();
