const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000 ;
require('dotenv').config();

// call express
const app = express();

// mehedihasan645356
// QwmORKswAFBIWw6h


// middleware
app.use(cors())
// for handle undefiend
app.use(express.json())
// 



const uri = process.env.MONGO_URI;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
// 

// const database = client.db("userDB");
// const userCollection = database.collection("users");
// or
const userCollection =client.db("userDB").collection("users");

//  get from server and database
app.get("/users", async(req, res)=>{
  const cursor = userCollection.find()
  const result = await cursor.toArray();
  res.send(result)
})


// 
app.get("/users/:id" , async(req ,res)=>{
   const id = req.params.id;
   const query = {_id : new ObjectId(id) } 
   const user = await userCollection.findOne(query) 
   res.send(user)
})


// add to server and database
app.post('/users', async(req , res)=>{
   const user = req.body;
   console.log('new users' , user)
   //    
   const result = await userCollection.insertOne(user );
   res.send(result);
})


// for update

app.put('/users/:id', async(req ,res) =>{
  const id = req.params.id;
  const users = req.body;
  console.log(users);
  //set to database

  const filter = { _id : new ObjectId(id)};
  const options = { upsert : true};

  // 
  const updateUser = {
     $set : {
         name : users.name ,
         email : users.email
     }
  }
  //
  const result = await userCollection.updateOne(filter , updateUser , options);
  res.send(result)

})


// delete from server and adatabase

app.delete('/users/:id', async (req , res)=>{
    const id = req.params.id;
    console.log('please delete from data base', id)
    const query = {_id : new ObjectId(id)}
    const result = await userCollection.deleteOne(query)
    res.send(result)
})









    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);




// 
app.get("/",(req , res)=>{
   res.send("simple crud is running")
})

app.listen(port ,()=>{
    console.log(`curn is runing on port ${port}`)
})