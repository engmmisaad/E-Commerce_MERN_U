
import  Grid  from "@mui/material/Grid"
import ProductCard from "../components/ProductCard"
import { useEffect, useState } from "react"
import { Product } from "../types/product"




const HomePage = ()=>{

    const [product,setProduct] = useState<Product[]>([])
    useEffect(()=>{
        fetch("http://localhost:3001/product").then(async (res)=>{
            const data = await res.json();
           setProduct(data);
        })
    })
    return <Grid container marginTop={0} spacing={2}>
        {product.map((p)=>(
             <Grid item md={4}> <ProductCard {...p}/> </Grid>
        ))}
    
   </Grid>
    }
export default HomePage
