/* const connectToDB = require('./server');
require('dotenv').config()

const app = require('./app');

const PORT=process.env.PORT || 8080

//connectToDB();
app.listen(PORT, async () => {
    console.log(`Server Started at ${PORT}`)
}) */
const app = require("./app");
require('dotenv').config();
const {PORT} = process.env;
const conectToDB = require("./server")

async function main() {
    try {
      await conectToDB()
      app.listen(PORT||8080, () => console.log(`Server started, http://localhost:${PORT}`));
    } catch (error) {
      console.error(error);
    }
  }
  
  main();
