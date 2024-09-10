import express from "express"
import{getActiveCartForUser} from "../services/cartService"
import {ExtendedReq, validateJWT} from "../middlewares/validateJWT"
const router = express.Router();

router.get("/",validateJWT,async (req:ExtendedReq ,res)=>{
    //TO DO: Get UserId from jwt
    const userId = req.user._id;
    const cart = await getActiveCartForUser({userId});
   
    return res.status(200).send(cart);
});

export default router