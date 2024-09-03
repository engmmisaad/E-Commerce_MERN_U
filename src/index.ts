import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routers/userRoutes";

const app = express();
const port = 3001;
app.use(express.json());
app.use("/user",userRoutes);
mongoose
  .connect("mongodb://localhost:27017/ecommerce")
  .then(() => {
    console.log("mongooose DB connected");
  })
  .catch((err) => {
    console.log("Can't connect mongooose DB");
  });
 

  app.listen(port,()=>{
    console.log(`server is up ! ...http://localhost:${port}`)
  });
