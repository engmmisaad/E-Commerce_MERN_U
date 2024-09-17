import express, { response } from "express"
import{addItemToCart, clearCart, deleteItemFromCart, getActiveCartForUser, updateItemToCart} from "../services/cartService"
import { validateJWT} from "../middlewares/validateJWT"
import { ExtendedReq } from "../types/extendedReq";
const router = express.Router();

router.get("/",validateJWT,async (req:ExtendedReq ,res)=>{
    //TO DO: Get UserId from jwt
    const userId = req.user._id;
    const cart = await getActiveCartForUser({userId});
   
    return res.status(200).send(cart);
});

router.post ("/items",validateJWT, async (req:ExtendedReq , res)=>{
    const userId = req.user._id;
    const {productId, qty} = req.body;
    const response = await addItemToCart({userId,productId,qty});
    res.status(response.statusCode).send(response.data);
});


router.put ("/items",validateJWT, async (req:ExtendedReq , res)=>{
    const userId = req.user._id;
    const {productId, qty} = req.body;
    const response = await updateItemToCart({userId,productId,qty});
    res.status(response.statusCode).send(response.data);
});

router.delete("/",validateJWT, async (req:ExtendedReq , res)=>{
    const userId = req.user._id;
   
    const response = await clearCart({userId});
    res.status(response.statusCode).send(response.data);
});

router.delete("/items/:productId"  , validateJWT, async(req:ExtendedReq, res)=>{
    const userId = req.user._id;
    const {productId} = req.params;
    const response = await deleteItemFromCart({userId,productId});
    res.status(response.statusCode).send(response.data);
});

export default router