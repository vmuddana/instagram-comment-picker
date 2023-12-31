import express from "express";
import { config as dotenvConfig } from "dotenv";
import stripeModule from "stripe";
import { createClient } from "@supabase/supabase-js";

dotenvConfig({ path: "./.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON;
const supabase = createClient(supabaseUrl, supabaseKey);

const router = express.Router();
const stripe = stripeModule(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-08-01",
});

router.post("/create-payment-intent", async (req, res) => {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: 5 * 100,
    });
    const {data, error} = await supabase.from('users').select("*").eq("id", req.body.userID);

    console.log(req.body, data)

    const { data2, error2 } = await supabase  
      .from("users")
      .update({ credits: await data[0].credits + 50 }) // Update credits to be current credits + 50
      .eq("id", req.body.userID)
      .select();

    console.log(
      "Payment successful with an amount of 5 USD. User credits updated:",
      await data2
    );

    // Send publishable key and PaymentIntent details to client
    res.send({
      clientSecret: paymentIntent.client_secret,
    });

    return;
  } catch (e) {
    console.log(e);
    return res.sendStatus(400);
  }
});

router.get("/config", (req, res) => {
  res.send({
    publishableKey: process.env.STRIPE_PUBLISHABLE_KEY,
  });
});

export default router;
