import { mongooseConnect } from "@/lib/mongoose";
import { Order } from "@/models/Order";
import { Product } from "@/models/Product";
import { NextApiRequest, NextApiResponse } from "next";
const stripe = require('stripe')(process.env.STRIPE_SK);

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
    cartProducts,
  } = req.body;

  await mongooseConnect();

  const productIds = cartProducts;
  const uniqueIds = [...new Set(productIds)];
  const productsInfos = await Product.find({_id:uniqueIds});

  let line_items = [];
  for(const productId of uniqueIds) {
    const productInfo = productsInfos.find((p: any) => p._id.toString() === productId);
    const quantity = productIds.filter((id: any) => id === productId).length || 0;

    if (quantity > 0 && productInfo) {
      console.log(line_items, "line items?")
      line_items.push({
        quantity,
        price_data: {
          currency: 'USD',
          product_data: {name:productInfo.title},
          unit_amount: quantity * productInfo.price * 100,
        }
      });
    }
  }
  
  const orderDoc = await Order.create({
    line_items, 
    name, 
    email, 
    city, 
    postalCode, 
    streetAddress, 
    country, 
    paid: false,
  });
  const successUrl = `${process.env.PUBLIC_URL}/cart?success=1`;
  const cancelUrl = `${process.env.PUBLIC_URL}/cart?canceled=1`;

  const session = await stripe.checkout.sessions.create({
    line_items,
    mode: 'payment',
    customer_email: email,
    success_url:successUrl,
    cancel_url:cancelUrl,
    metadata: { orderId: orderDoc._id.toString()},
  });

  res.json({
    url: session.url
  })
}