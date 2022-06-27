const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// ./stripe listen --forward-to localhost:3000/api/webhook

// whsec_801a3e4c505bdccb420df4298648f9b77e9e52921c15f4a1a9a5b87c504f0106

export default async (req, res) => {
  if (req.method === "POST") {
    const { items, email } = req.body;
    const transformedItems = items.map((item) => ({
      description: item.description,
      quantity: 1,
      price_data: {
        currency: "usd",
        unit_amount: item.price * 100,
        product_data: {
          name: item.title,
          images: [item.image],
        },
      },
    }));

    try { 
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        shipping_rates: ["shr_1KwgrVKLJc8TEAv20Co4Kpg7"],
        shipping_address_collection: {
          allowed_countries: ["GB", "US", "CA", "KR"],
        },
        line_items: transformedItems,
        mode: "payment",
        success_url: `${process.env.HOST}/success`,
        cancel_url: `${process.env.HOST}/checkout`,
        metadata: {
          email,
          images: JSON.stringify(items.map((item) => item.image)),
        },
      });
      console.log("first")

      res.status(200).json({ id: session.id });
    } catch (err) {
      res.status(500).json(err.message);
    }
  }
};
