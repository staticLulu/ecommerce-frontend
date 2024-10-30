import {mongooseConnect} from "@/lib/mongoose";
import {buffer} from 'micro';
import {Order} from "@/models/Order";
import { NextApiRequest, NextApiResponse } from "next";
//@ts-ignore
const stripe = require('stripe')(process.env.STRIPE_SK);

const endpointSecret = "whsec_bc69790235b363cc31a8edb63a8718c7123655cafdd14ccbfed655d97fbeb4cc";

export default async function handler(req: NextApiRequest,res: NextApiResponse) {
  await mongooseConnect();
  const sig = req.headers['stripe-signature'];

  let event;

  try {
    event = stripe.webhooks.constructEvent(await buffer(req), sig, endpointSecret);
  } catch (err:any) {
    res.status(400).send(`Webhook Error: ${err.message}`);
    return;
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      const data = event.data.object;
      const orderId = data.metadata.orderId;
      const paid = data.payment_status === 'paid';
      if (orderId && paid) {
        await Order.findByIdAndUpdate(orderId,{
          paid:true,
        })
      }
      break;
    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.status(200).send('ok');
}

export const config = {
  api: {bodyParser:false,}
};

// works-neat-galore-fiery
// acct_1QEmYaChcizr4OF7