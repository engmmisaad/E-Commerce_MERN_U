import { IProduct, productModel } from "../models/ProductModels";

export const getAllProducts = async ()=>{
    const products = await productModel.find();
    return products;
};

export const seedInitalProducts =async ()=>{
const products  =[
 {title:"HP laptop" , image:"https://www.techtarget.com/rms/onlineimages/hp_elitebook.jpg" , price:5800, stock:11},
 {title:"ASUS laptop" , image:"https://dlcdnwebimgs.asus.com/gain/d895a2b9-233a-4f11-91fd-b22788ac973f/" , price:4600, stock:8},
 {title:"APPLE laptop" , image:"https://cdn.ihouse.ps/images/NFI0DXMqOKZPdeTgQxzuJQaLKeLhKYDlasvgmC1O.jpg" , price:8400, stock:3}
];
const exsisingProducts =await  getAllProducts();
if(exsisingProducts.length === 0)
{
    productModel.insertMany(products);
}
};