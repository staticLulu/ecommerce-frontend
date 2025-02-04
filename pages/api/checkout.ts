// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("❌ Stripe secret key is missing! Check your .env.local file.");
// }

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-09-30.acacia",
// });

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     console.log("✅ Received request:", req.body); // Debug log

//     const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

//     if (!cartProducts || cartProducts.length === 0) {
//       return res.status(400).json({ error: "Cart is empty" });
//     }

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: cartProducts.map((item: any) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name,
//           },
//           unit_amount: item.price * 100, // Convert price to cents
//         },
//         quantity: item.quantity,
//       })),
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
//     });

//     console.log("✅ Stripe session created:", session);
//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("❌ Stripe Checkout Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

// import { NextApiRequest, NextApiResponse } from "next";
// import Stripe from "stripe";

// // Ensure secret key is provided
// if (!process.env.STRIPE_SECRET_KEY) {
//   throw new Error("❌ Stripe secret key is missing! Check your .env.local file.");
// }

// // Initialize Stripe
// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
//   apiVersion: "2024-09-30.acacia", // Use the latest stable API version
// });

// export default async function handle(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     return res.status(405).json({ error: "Method Not Allowed" });
//   }

//   try {
//     console.log("✅ Received request:", req.body); // Debug log

//     const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

//     if (!cartProducts || cartProducts.length === 0) {
//       console.error("❌ Error: Cart is empty");
//       return res.status(400).json({ error: "Cart is empty" });
//     }

//     console.log("✅ Processing Cart Items:", cartProducts);

//     const session = await stripe.checkout.sessions.create({
//       payment_method_types: ["card"],
//       line_items: cartProducts.map((item: any) => ({
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: item.name || "Unknown Product", // Ensure name is defined
//           },
//           unit_amount: item.price ? item.price * 100 : 1000, // Ensure price is defined, default to 10.00 USD
//         },
//         quantity: item.quantity || 1, // Ensure quantity is defined
//       })),
//       mode: "payment",
//       success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
//       cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
//     });

//     console.log("✅ Stripe session created:", session);
//     res.json({ url: session.url });
//   } catch (error) {
//     console.error("❌ Stripe Checkout Error:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// }

import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";

// Ensure secret key is provided
if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("❌ Stripe secret key is missing! Check your .env.local file.");
}

// Initialize Stripe
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string, {
  apiVersion: "2024-09-30.acacia", // Use the latest stable API version
});

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  try {
    console.log("✅ Received request:", req.body); // Debug log

    const { name, email, city, postalCode, streetAddress, country, cartProducts } = req.body;

    if (!cartProducts || cartProducts.length === 0) {
      console.error("❌ Error: Cart is empty");
      return res.status(400).json({ error: "Cart is empty" });
    }

    console.log("✅ Processing Cart Items:", cartProducts);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: cartProducts.map((item: any) => {
        const unitAmount = item?.price_data?.unit_amount ?? 1000; // Get correct price or default to $10
        return {
          price_data: {
            currency: item?.price_data?.currency ?? "usd",
            product_data: {
              name: item?.price_data?.product_data?.name || "Unknown Product", // Ensure name is defined
            },
            unit_amount: unitAmount, // Price should be in cents
          },
          quantity: item.quantity || 1, // Ensure quantity is defined
        };
      }),
      mode: "payment",
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/cancel`,
    });

    console.log("✅ Stripe session created:", session);
    res.json({ url: session.url });
  } catch (error) {
    console.error("❌ Stripe Checkout Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
