import dotenv from 'dotenv'
import express from "express";
import mongoose from "mongoose";
import userRoutes from "./routers/userRoutes";
import productRouts from "./routers/productRoutes"
import { seedInitalProducts } from "./services/productService";
import cartRoute from "./routers/cartRoute";
import cors from "cors"

dotenv.config();
const app = express();
const port = 3001;
app.use(express.json());
app.use(cors());
app.use("/user",userRoutes);
app.use("/product",productRouts)
app.use("/cart",cartRoute)
mongoose
  .connect(process.env.DB_CON||'')
  .then(() => {
    console.log("mongooose DB connected");
  })
  .catch((err) => {
    console.log("Can't connect mongooose DB");
  });
 
  seedInitalProducts();
  app.listen(port,()=>{
    console.log(`server is up ! ...http://localhost:${port}`)
  });
