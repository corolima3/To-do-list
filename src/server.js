const express = require('express');
const mongoose = require('mongoose');
const cors=require('cors');
const morgan = require('morgan');
const bcrypt = require("bcrypt");
const app = require("./app");
/* require('./schemas/course');
require('./schemas/video'); */
//mongoose.set('strictQuery', true)

/* mongoose.set("useNewUrlParser", true);
mongoose.set("useUnifiedTopology", true);
mongoose.connect("mongodb+srv://josecorolima:tKAJvKFKSRnUHp1n@prueba.snimcaf.mongodb.net/", () => {
  mongoose.set('strictQuery', true)
  console.log("Me conecté a la BD");
}); */

const conectToDB = async () => {
  try {
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useUnifiedTopology", true);

    await mongoose.connect("mongodb+srv://josecorolima:tKAJvKFKSRnUHp1n@prueba.snimcaf.mongodb.net/");

    mongoose.set('strictQuery', true);
    console.log("Me conecté a la BD");
  } catch (error) {
    throw new Error(`Error al conectar a la base de datos: ${error.message}`);
  }
};

/* const app = express();
app.use(express.json());
app.use(cors());
app.use(morgan("dev")); */

//const router= express.Router();

/* const Course = mongoose.model('Course');
const Video = mongoose.model('Video');
const User = mongoose.model('User'); */

//app.use( router);

/* router.get("/", (req, res) => {
  res.send("hola amigo")
})

router.post("/",async (req, res)=>{
const {name, password, email}=req.body;
const saltRounds = 10;
    const hash = await bcrypt.hash(password, saltRounds);
let data = new User({ name, email, hash });

return res.status(201).json(await data.save())
}) */
module.exports = conectToDB
//app.listen(8080, () => console.log("Server started, http://localhost:8080"));