const express = require("express");
const app = express();
const cors = require("cors");
const ObjectId = require("mongodb").ObjectId;
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require("mongodb");

//middleware
app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

//Todu
//iFGEuiEbmPL3rV00

const uri =
  "mongodb+srv://Todu:iFGEuiEbmPL3rV00@cluster0.nhvqs.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});
async function run() {
  try {
    await client.connect();
    const userCollection = client.db("Todo").collection("upload");

    //get user
    app.get("/user", async (req, res) => {
      const query = {};
      const cursor = userCollection.find(query);
      const users = await cursor.toArray();
      res.send(users);
    });

    app.post("/user", async (req, res) => {
      const newuser = req.body;
      const result = await userCollection.insertOne(newuser);
      res.send(result);
    });
    //update user

    app.put("/user/:id", async (req, res) => {
      const id = req.params.id;
      const updateUser = req.body;
      const filter = { _id: ObjectId(id) };
      const option = { upsert: true };
      const updateDoc = {
        $set: {
          name: updateUser.name,
        },
      };
      const result = await userCollection.updateOne(filter, updateDoc, option);
      res.send(result);
    });
    app.delete("/user/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await userCollection.deleteOne(query);
      res.send(result);
    });
  } finally {
  }
}
run().catch(console.dir);
app.get("/", (req, res) => {
  res.send(" Server is running car auto parts");
});

app.listen(port, () => {
  console.log("CRUD Server is running");
});
