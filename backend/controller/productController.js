import Product from "../models/Product.js";
import  redisClient  from "../config/redis.js";
import  productQueue  from "../queue/productQueue.js";

// export const addProduct=async(req,res)=>{

//     const product=await new Product({

//         name:req.body.productName,
//         price:req.body.productPrice

//     });
//     await product.save();
//     await redisClient.del("products");
//     res.json({success:true,product:product});

// }

export const addProduct=async(req,res)=>{

    const product=await new Product({

        name:req.body.productName,
        price:req.body.productPrice

    });
    await product.save();

    await productQueue.add(

        "generateThumbnail",

        {
            id:product._id,

            name:product.name

        },
        {
            attempts:3,

             backoff: {
                 type: "fixed",
                  delay: 5000
                       }
        }

    );

    res.json({success:true,product:product});

}
  
// export const getProducts=async(req,res)=>{

//     const products=await Product.find();

//     console.log("Mongo Hit");

//     res.json(products);

// }
export const getProducts=async(req,res)=>{

    const cache=await redisClient.get("products");

    if(cache){

        console.log("Redis Hit");

        return res.json(JSON.parse(cache));

    }

    console.log("Mongo Hit");
    const products=await Product.find();

    await redisClient.set(

        "products",

        JSON.stringify(products)
    //     ,
    // {

    //     EX:20      // auto delete after 20 seconds

    // }

    );

    res.json(products);

}