const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/dbConnection");
const routes = require("./routes/routes");

dotenv.config();

async function main() {
  await connectDB();
  console.log("Database connected");

  const app = express();
  app.use(express.json());

  app.use("/", routes);

  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}
main();
