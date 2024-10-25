import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(req: NextApiRequest, res:NextApiResponse) {
  if (req.method !== 'POST') {
    res.json('should be a POST request');
    return;
  }
  const {
    name, 
    email,
    city,
    postalCode,
    streetAddress,
    country,
    products,
  } = req.body;

  await mongooseConnect();

  const productIds = products.split(',');
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  let line_items = [];
  for(const productId of uniqueIds) {
    const productInfo = productsInfos.find((p: any) => p._id.toString() === productId);
    const quantity = productIds.filter((id: any) => id === productId).length || 0;

    if (quantity > 0 && productInfo) {
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price,
        }
      });
    }
  }
  res.json({line_items});
}